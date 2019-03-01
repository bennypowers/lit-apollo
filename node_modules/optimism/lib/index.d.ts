export type OptimisticWrapperFunction<
  T = (...args: any[]) => any,
> = T & {
  // The .dirty(...) method of an optimistic function takes exactly the
  // same parameter types as the original function.
  dirty: T;
};

export type OptimisticWrapOptions = {
  max?: number;
  disposable?: boolean;
  makeCacheKey?(...args: any[]): any;
};

export declare function defaultMakeCacheKey(...args: any[]): object;

export declare function wrap<T>(
  originalFunction: T,
  options?: OptimisticWrapOptions,
): OptimisticWrapperFunction<T>;
