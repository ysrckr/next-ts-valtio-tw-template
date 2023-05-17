type Interceptor = {
  request?: (config: any[]) => any;
  requestError?: (error: any) => any;
  response?: (response: any) => any;
  responseError?: (error: any) => any;
};

export class InterceptorManager {
  public interceptors: Interceptor[];
  public promise: Promise<any>;

  constructor(promise: Promise<any>) {
    this.interceptors = [];
    this.promise = promise;
  }

  clear() {
    if (this.interceptors) {
      this.interceptors = [];
    }
  }

  reverse() {
    if (this.interceptors) {
      this.interceptors.reverseFast();
    }

    return this;
  }

  forEach() {
    if (this.interceptors) {
      if (this.interceptors.length) {
        this.interceptors.forEach(interceptor => {
          if (interceptor?.request || interceptor?.requestError) {
            const { request, requestError } = interceptor;
            this.promise = this.promise.then((...args) => request?.apply(this, ...args), requestError);
          } else if (interceptor?.response || interceptor?.responseError) {
            const { response, responseError } = interceptor;
            this.promise = this.promise.then((...args) => response?.apply(this, ...args), responseError);
          }
        });
      }
    }
  }
}
