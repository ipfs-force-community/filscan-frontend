import { useState, useRef, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { notification } from 'antd';
import Router from 'next/router';
import messageManager from '@/packages/message';

interface OPTIONS {
  method?: 'get' | 'post' | 'put' | 'delete';
  maxRetries?: number;
  timeout?: number; // 0 means no timeout
  flag?: string | boolean
  isCancel?: boolean;
  loading?:boolean
}

interface FetchDataResult<T> {
  result: T | null;
  error?: string | null;
  [key: string]: any,
}

const DefaultOptions:OPTIONS = {
  method: 'post',
  maxRetries: 3,
  timeout: 0,
  isCancel:true
}

// 用于存储每个 URL 和方法的取消令牌
const cancelTokenSources: Record<string, CancelTokenSource> = {};
let current: any = {};

function useAxiosData<T>(initialUrl?: string, initialPayload: any = {}, initialOptions?: any) {
  const [data, setData] = useState<FetchDataResult<T> | null>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosData = async (url: string, payload?: any, options = DefaultOptions): Promise<any> => {
    const { method='post', maxRetries=3, timeout=0,flag,isCancel=true,loading=true } = {...DefaultOptions,...options};
    const body = payload || {};
    let error: any = null;
    let data: T | null | any = null;
    const token = localStorage.getItem('token'); // 从 localStorage 获取 token

    if (loading) {
      setLoading(true)
    }

    // 创建一个键，包含 URL 和方法
    let key = '';

    if (isCancel) {
      key= flag ? `${method}:${url}_${flag}`: `${method}:${url}`
    }

    // 如果这个 URL 和方法已经有一个正在进行的请求，取消它
    if (cancelTokenSources[key]) {
      cancelTokenSources[key].cancel('Cancelled because of new request');
    }

    // 创建一个新的取消令牌
    const cancelTokenSource = axios.CancelToken.source();
    if (key) {
      cancelTokenSources[key] = cancelTokenSource;
    }

    let currentKey:any = `${method}:${url}`;
    if (currentKey) {
      current[currentKey] = current[currentKey] || 1;
    }

    if (currentKey) {
      while (Number(current[currentKey]) < maxRetries) {
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
            current[currentKey] = 100;
            setData({
              result: null,
              error: 'Invalid credentials',
            });
            setLoading(false)
            current[currentKey] = 0;
            return response.data;
          }
          if (response.data && response.data.code) {
            current[currentKey] = 0;
            return messageManager.showMessage({
              type: 'error',
              content: response.data.message,
            });
          }
          data = response.data || response || {};
          console.log('00003345----------32356',data)
          setData(data?.result || data || {});
          setLoading(false);
          current[currentKey] = 0;
          return data?.result || data // 请求成功，跳出循环
        } catch (thrown: any) {
          current[currentKey] = current[currentKey] +1;
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
            break;  //取消请求，跳出循环
          } else {
            if ( current[currentKey] < maxRetries) {
              return axiosData(url, payload, options);
            } else {
              setError(thrown);
              setLoading(false);
              setData({
                result: null,
                error: 'Error',
              });
              if (current[currentKey] === maxRetries) {
                current[currentKey] = 0;
                if (thrown?.response?.status === 401) {
                  setData({
                    result: null,
                    error: 'Invalid credentials',
                  });
                  return null
                }
                setData({
                  result: null,
                  error: 'Invalid credentials',
                });
                return null
              }
              // return notification.error({
              //   className: 'custom-notification',
              //   message: 'Error',
              //   duration: 100,
              //   description: thrown?.message || 'Network Error'
              // })

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

  }, [initialUrl, initialPayload, initialOptions]);

  useEffect(() => {
    // 组件卸载时取消所有请求
    return () => {
      current = {};
      Object.values(cancelTokenSources).forEach(source => source.cancel('Component unmounted'));
    };
  },[])

  return { data, loading, error, axiosData };
}

export default useAxiosData;
