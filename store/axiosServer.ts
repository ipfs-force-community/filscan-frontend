import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from 'next/router'
type RequestConfig = {
  retryCount?: number
  timeout?: number
}

export interface RequestResult {
  data: any
  error: string | null
}
export const axiosServer = async <T>(
  url: string,
  payload = {},
  requestConfig: RequestConfig = {},
): Promise<RequestResult> => {
  const { retryCount = 3, timeout } = requestConfig
  let cancelTokenSource = axios.CancelToken.source()
  const asPath = router.router?.asPath

  const cancelPreviousRequests = () => {
    cancelTokenSource.cancel('Request cancelled due to route change')
    cancelTokenSource = axios.CancelToken.source()
  }

  const request = async (retry: number): Promise<RequestResult> => {
    try {
      const mail =
        typeof window !== 'undefined' ? localStorage.getItem(`mail`) : null
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem(`token-${mail}`)
          : null // 在客户端使用 localStorage
      const response: AxiosResponse<any> = await axios.request({
        url,
        method: 'POST',
        data: payload,
        cancelToken: cancelTokenSource.token,
        timeout,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `${token}` : null,
        },
      })
      return {
        data: response?.data?.result || response.data || {},
        error: null,
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return {
          data: null,
          error: 'Request cancelled',
        }
      }

      if (retry > 0) {
        return request(retry - 1)
      }

      return {
        data: null,
        error: 'Request failed',
      }
    }
  }

  // Cancel previous requests when route changes
  const handleRouteChange = (e: any) => {
    if (e !== asPath) {
      cancelPreviousRequests()
      router.router?.events.off('hashChangeStart', handleRouteChange)
      router.router?.events.off('beforeHistoryChange', handleRouteChange)
    }
  }

  // Listen for route change events
  if (typeof window !== 'undefined') {
    // Listen for route change events
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
    // window.addEventListener('popstate', handleRouteChange)
    // https://nextjs.org/docs/pages/api-reference/functions/use-router
    router.router?.events.on('hashChangeStart', handleRouteChange)
    router.router?.events.on('beforeHistoryChange', handleRouteChange)
  } else {
  }

  try {
    const result = await request(retryCount)
    return result
  } finally {
    // Remove the route change event listener
    if (typeof window !== 'undefined') {
      router.router?.events.off('hashChangeStart', handleRouteChange)
      router.router?.events.off('beforeHistoryChange', handleRouteChange)
    }
  }
}
