import { useEffect, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { message } from 'antd';
import Router from 'next/router';

interface FetchDataOptions {
  method?: 'get' | 'post' | 'put' | 'delete';
  body?: {};
  maxRetries?: number;
  timeout?: number; // 0 means no timeout
}

interface FetchDataResult<T> {
  result: T | null;
  error?: string | null;
}

// 用于存储每个 URL 和方法的取消令牌
const cancelTokenSources: Record<string, CancelTokenSource> = {};

function useFetchData<T>(url: string, payload: FetchDataOptions = {}) {
  const [data, setData] = useState<FetchDataResult<T> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { method = 'post', body = {}, maxRetries = 3, timeout = 0 } = payload;
      let retries = 0;
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

      while (retries < maxRetries) {
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
          data = response.data;

          break; // 请求成功，跳出循环
        } catch (thrown: any) {
          error = thrown;
          retries += 1;
          if (axios.isCancel(thrown)) {
            console.log('-----3', thrown, axios.isCancel(thrown));
            retries = 100;
            //console.log('Request canceled', thrown?.message);
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

    fetchData();

    // 组件卸载时取消请求
    return () => {
      if (cancelTokenSources[url]) {
        cancelTokenSources[url].cancel('Component unmounted');
      }
    };
  }, [url, payload]);

  return { data, loading };
}

export default useFetchData;
