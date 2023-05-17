import { InterceptorManager } from './InterceptorManager';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface Headers {
  [key: string]: string;
}

interface Options {
  headers?: Headers;
  cache?: 'no-store' | 'force-cache';
  next?: {
    revalidate: number;
  };
}

interface FetchOptions extends Options {
  method: Method;
  body?: string;
}

export class Nexios {
  private baseURL: string = '';
  private headers: Headers = {
    'Content-Type': 'application/json',
  };
  private withCredentials: boolean = false;

  constructor(baseURL: string, headers: Headers, withCredentials: boolean) {
    this.baseURL = baseURL;
    this.headers = headers;
    this.withCredentials = withCredentials;
  }
  public static create({ baseURL, headers, withCredentials }: Nexios) {
    return new Nexios(baseURL, headers, withCredentials);
  }

  private fetchify(method: Method) {
    return async <T, K>(url: string, body?: K, options?: Options): Promise<T> => {
      if (options?.headers) {
        options.headers = {
          ...this.headers,
          ...options.headers,
        };
      }

      const fetchOptions: FetchOptions = {
        method,
        body: JSON.stringify(body),
        ...options,
      };

      if (method === 'GET' || method === 'DELETE') {
        delete fetchOptions.body;
      }

      try {
        const response = await fetch(this.baseURL + url, fetchOptions);
        if (!response.ok) {
          return Promise.reject(response);
        }
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }

  get<T>(url: string, options?: Options): Promise<T> {
    return this.fetchify('GET')(url, options);
  }
  post<T, K>(url: string, body: K, options?: Options): Promise<T> {
    return this.fetchify('POST')(url, body, options);
  }
  put<T, K>(url: string, body: K, options: Options): Promise<T> {
    return this.fetchify('PUT')(url, body, options);
  }
  patch<T, K>(url: string, body: K, options: Options): Promise<T> {
    return this.fetchify('PATCH')(url, body, options);
  }
  delete<T>(url: string, options: Options): Promise<T> {
    return this.fetchify('DELETE')(url, options);
  }

  interceptor(fetch: any, ...args: any[]) {
    const interceptors = new InterceptorManager(Promise.resolve(args));
    const reversedInterceptors = interceptors.reverse();

    // Register request interceptors
    reversedInterceptors.forEach();

    // Register fetch
    interceptors.promise = interceptors.promise.then(fetch);

    // Register response interceptors
    reversedInterceptors.forEach();

    return interceptors.promise;
  }
}
