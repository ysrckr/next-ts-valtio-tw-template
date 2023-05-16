interface Headers {
  [key: string]: string;
}

interface Options {
  headers: Headers;
  cache?: 'no-store' | 'force-cache';
  next?: {
    revalidate: number;
  };
}

export class Instance {
  private baseURL: string;
  private timeout: number;
  private headers: Headers;
  constructor(baseURL: string, timeout: number, headers: Headers) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.headers = headers;
  }
  public static create({
    baseURL = '',
    timeout = 30000,
    headers = {
      'Content-Type': 'application/json',
    },
  }) {
    return new Instance(baseURL, timeout, headers);
  }
  get<T>(url: string, options: Options): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + url, {
        method: 'GET',
        ...options,
      })
        .then(response => {
          if (!response.ok) {
            return reject(response);
          }
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  post<T>(url: string, body: string, options: Options): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + url, {
        method: 'POST',
        body,
        ...options,
      })
        .then(response => {
          if (!response.ok) {
            return reject(response);
          }
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  put<T>(url: string, body: string, options: Options): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + url, {
        method: 'PUT',
        body,
        ...options,
      })
        .then(response => {
          if (!response.ok) {
            return reject(response);
          }
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  patch<T>(url: string, body: string, options: Options): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + url, {
        method: 'PATCH',
        body,
        ...options,
      })
        .then(response => {
          if (!response.ok) {
            return reject(response);
          }
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  delete<T>(url: string, options: Options): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(this.baseURL + url, {
        method: 'DELETE',
        ...options,
      })
        .then(response => {
          if (!response.ok) {
            return reject(response);
          }
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
