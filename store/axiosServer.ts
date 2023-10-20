
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestConfig= {
  retryCount?: number;
  timeout?: number;
};

export interface RequestResult {
  data: any;
  error: string | null;
};

export const axiosServer = async <T>(
  url: string,
  payload={},
  requestConfig: RequestConfig = {}
): Promise<RequestResult> => {
  const { retryCount = 3, timeout } = requestConfig;
  const token = localStorage.getItem('token'); // 从 localStorage 获取 token
  let cancelTokenSource = axios.CancelToken.source();

  const cancelPreviousRequests = () => {
    cancelTokenSource.cancel('Request cancelled due to route change');
    cancelTokenSource = axios.CancelToken.source();
  };

  const request = async (retry: number): Promise<RequestResult> => {
    try {
      const response: AxiosResponse<any> = await axios.request({
        url,
        method:'POST',
        data:payload,
        cancelToken: cancelTokenSource.token,
        timeout,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      return {
        data: response?.data?.result || response.data || {},
        error: null,
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return {
          data: null,
          error: 'Request cancelled',
        };
      }

      if (retry > 0) {
        return request(retry - 1);
      }

      return {
        data: null,
        error: 'Request failed',
      };
    }
  };

  // Cancel previous requests when route changes
  const handleRouteChange = () => {
    cancelPreviousRequests();
  };

  // Listen for route change events
  window.addEventListener('popstate', handleRouteChange);
  try {
    const result = await request(retryCount);
    return result;
  } finally {
    // Remove the route change event listener
    window.removeEventListener('popstate', handleRouteChange);
  }
};