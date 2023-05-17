type Resolve = () => void;
type Reject = () => void;
type InterceptorId = number;
type Handler = {
  fulfilled: Resolve;
  rejected: Reject;
};
type HandlerCallback = (handler: Handler) => void;
export class InterceptorManager {
  public handlers: Handler[];

  constructor() {
    this.handlers = [];
  }
  use(fulfilled: Resolve, rejected: Reject): InterceptorId {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    return this.handlers.length - 1;
  }
  eject(id: InterceptorId) {
    if (this.handlers[id]) {
      this.handlers = this.handlers.filter((_, index) => index !== id);
    }
  }

  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  forEach(fn: HandlerCallback) {
    this.handlers.forEach(handler => {
      if (handler !== null) {
        fn(handler);
      }
    });
  }
}
