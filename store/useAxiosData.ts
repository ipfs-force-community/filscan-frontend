import { useEffect, useState, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { message } from 'antd';
import Router from 'next/router';



interface OPTIONS { 
  method?: 'get' | 'post' | 'put' | 'delete';
  maxRetries?: number;
  timeout?: number; // 0 means no timeout
}

interface FetchDataResult<T> {
  result: T | null;
  error?: string | null;
  [key:string]:any
}

// 用于存储每个 URL 和方法的取消令牌
const cancelTokenSources: Record<string, CancelTokenSource> = {};

function useAxiosData<T>(url: string, payload?:any, options: OPTIONS = {}  ) {
  const [data, setData] = useState<FetchDataResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const retriesRef = useRef(0); // 使用 useRef 存储重试次数

  useDeepCompareEffect(() => {
    const axiosData = async () => {
      setLoading(true);
      const { method = 'post', maxRetries = 3, timeout = 0 } = options;
      const body = payload || {};
      let error: any = null;
      let data: T | null | any = null;
      const token = localStorage.getItem('token'); // 从 localStorage 获取 token

      // 创建一个键，包含 URL 和方法
      const key = `${method}:${url}`;

      // 如果这个 URL 和方法已经有一个正在进行的请求，取消它
      if (cancelTokenSources[key]) {
        cancelTokenSources[key].cancel('Cancelled because of new request');
      }

      // 创建一个新的取消令牌
      const cancelTokenSource = axios.CancelToken.source();
      cancelTokenSources[key] = cancelTokenSource;

      while (retriesRef.current < maxRetries) {
        try {
          const response = await axios.request({
            url,
            method,
            data: body,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            timeout: timeout,
            cancelToken: cancelTokenSource.token,
          });

          if (response.status === 401) {
            message.warning('please login ');
            Router.push('/account/login');
            setData({
              result: null,
              error: 'Invalid credentials',
            });
            return;
          }
          data = response.data || {};
          break; // 请求成功，跳出循环
        } catch (thrown: any) {
              if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
                 break;  //取消请求，跳出循环
              } else { 
              error = thrown;
              retriesRef.current += 1;     
              await new Promise(resolve => setTimeout(resolve, 1000)); // 如果请求失败，等待1秒再重试
              }          
        }
      }

      if (data) {
        setData(data?.result || data || {});
      } else {
        setData({
          result: null,
          error: error ? error.message : '请求失败',
        });
      }

      setLoading(false);
    };

    axiosData();

    // 组件卸载时取消所有请求
    return () => {
      Object.values(cancelTokenSources).forEach(source => source.cancel('Component unmounted'));
    };
  }, [url, payload,options]);

  return { data, loading };
}

export default useAxiosData;
