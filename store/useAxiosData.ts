import { useEffect, useState, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { message, notification } from 'antd';
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

function useAxiosData<T>(initialUrl?: string, initialPayload?:any, initialOptions: OPTIONS = {}  ) {
  const [data, setData] = useState<FetchDataResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const retriesRef = useRef(0); // 使用 useRef 存储重试次数

  const axiosData = async (url:string, payload = initialPayload, options = initialOptions) => {
    retriesRef.current = 0;
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
    console.log('==url=34',url)
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
          if (retriesRef.current >= maxRetries) { 
            // 返回错误并退出自动重试 
            return notification.error({
                className: 'custom-notification',
                message: 'Error',
                duration: 100,
                description: error?.message||'Network Error'
            })
          }
          await new Promise(resolve => setTimeout(resolve)); // 如果请求失败，继续重试
        }          
      }
    }

    if (data) {
      setData(data?.result || data || {});
    } else if( retriesRef.current === maxRetries){
      setData({
        result: null,
        error: error ? error.message : '请求失败',
      });
    }

    setLoading(false);
    return data?.result || data || {};
  };

  useDeepCompareEffect(() => {
    
    if (initialUrl) { 
         axiosData(initialUrl);
    }

    // 组件卸载时取消所有请求
    return () => {
      Object.values(cancelTokenSources).forEach(source => source.cancel('Component unmounted'));
    };
  }, [initialUrl, initialPayload, initialOptions]);

  return { data, loading, axiosData };
}

export default useAxiosData;
