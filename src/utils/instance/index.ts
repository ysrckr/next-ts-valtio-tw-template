type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface Headers {
  [key: string]: string;
}

interface Options {
  headers?: Headers;
  body?: any;
  cache?: 'no-store' | 'force-cache';
  next?: {
    revalidate: number;
  };
}

export class Instance {
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
    return new Instance(baseURL, headers);
  }

  private fetchify(method: Method) {
    return async <T>(url: string, options?: Options): Promise<T> => {
      if (options?.headers) {
        options.headers = {
          ...this.headers,
          ...options.headers,
        };
      }

      if (options?.body) {
        options.body = JSON.stringify(options.body);
      }

      try {
        const response = await fetch(this.baseURL + url, {
          method,
          ...options,
        });
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
  post<T>(url: string, options: Options): Promise<T> {
    return this.fetchify('POST')(url, options);
  }
  put<T>(url: string, options: Options): Promise<T> {
    return this.fetchify('PUT')(url, options);
  }
  patch<T>(url: string, options: Options): Promise<T> {
    return this.fetchify('PATCH')(url, options);
  }
  delete<T>(url: string, options: Options): Promise<T> {
    return this.fetchify('DELETE')(url, options);
  }
}
