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
  private baseURL: string;
  private headers: Headers;
  constructor(baseURL: string, headers: Headers) {
    this.baseURL = baseURL;
    this.headers = headers;
  }
  public static create({
    baseURL = '',
    headers = {
      'Content-Type': 'application/json',
    },
  }) {
    return new Nexios(baseURL, headers);
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
  post<T, K>(url: string, body: K, options: Options): Promise<T> {
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
}
