import { useState, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { notification } from 'antd';
import Router from 'next/router';

interface OPTIONS {
  method?: 'get' | 'post' | 'put' | 'delete';
  maxRetries?: number;
  timeout?: number; // 0 means no timeout
}

interface FetchDataResult<T> {
  result: T | null;
  error?: string | null;
  [key: string]: any
}

const DefaultOptions = {
  method: 'post',
  maxRetries: 3,
  timeout: 0
}

// 用于存储每个 URL 和方法的取消令牌
const cancelTokenSources: Record<string, CancelTokenSource> = {};

function useAxiosData<T>(initialUrl?: string, initialPayload: any = {}, initialOptions?: any) {
  const [data, setData] = useState<FetchDataResult<T> | null>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const retriesRef = useRef(0); // 使用 useRef 存储重试次数
  retriesRef.current = 0;

  const axiosData = async (url: string, payload?: any, options = DefaultOptions): Promise<any> => {
    setLoading(true);
    const { method, maxRetries, timeout } = options;
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
          Router.push('/account/login');
          retriesRef.current = 100;
          setData({
            result: null,
            error: 'Invalid credentials',
          });
          return response.data;;
        }
        data = response.data || {};
        setData(data?.result || data || {});
        setLoading(false);
        return data?.result || data // 请求成功，跳出循环
      } catch (thrown: any) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
          break;  //取消请求，跳出循环
        } else {
          retriesRef.current += 1;
          if (retriesRef.current < maxRetries) {
            return axiosData(url, payload, options);
          } else {
            setError(thrown);
            setLoading(false);
            if (retriesRef.current === maxRetries) {
              if (thrown?.response?.status === 401) {
                return null
              }
              return notification.error({
                className: 'custom-notification',
                message: 'Error',
                duration: 100,
                description: thrown?.message || 'Network Error'
              })
            }

          }
        }
      }
    }
  };

  useDeepCompareEffect(() => {
    if (initialUrl) {
      axiosData(initialUrl, initialPayload, initialOptions);
    }

    // 组件卸载时取消所有请求
    return () => {
      Object.values(cancelTokenSources).forEach(source => source.cancel('Component unmounted'));
    };
  }, [initialUrl, initialPayload, initialOptions]);

  return { data, loading, error, axiosData };
}

export default useAxiosData;
