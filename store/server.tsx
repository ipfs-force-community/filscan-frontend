interface FetchDataOptions {
  maxRetries: number;
  timeout: number;  // 0 means no timeout
}

interface FetchDataResult<T> {
  result: T | null;
  error?: string | null;
}

async function fetchData<T>(url: string, body = {}, options: FetchDataOptions = {
  maxRetries: 3,
  timeout: 0  // Default is no timeout
}): Promise<FetchDataResult<T>> {
  const { maxRetries, timeout } = options;
  let retries = 0;
  let error:any = null;
  let data: T | null|any = null;

  while (retries < maxRetries) {
    try {
      const controller = new AbortController();
      let timeoutId;
      if (timeout > 0) {
        timeoutId = setTimeout(() => controller.abort(), timeout);
      }

      const response = await fetch(url, { 
        method: 'POST',  // Change the request method to POST
        headers: { 'Content-Type': 'application/json' },  // Set the content type to JSON
        body: JSON.stringify(body),  // Convert the body data to JSON format
        signal: controller.signal
      });
      data = await response.json();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      break; // 请求成功，跳出循环
    } catch (err) {
      error = err;
      retries += 1;
    }
  }
  if (data) {
    return data?.result || data || {}
  } else {
    return {
      result: null,
      error: error ? error.message : '请求失败',
    };
  }
}

export default fetchData;
