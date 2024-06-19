import { HttpInterceptorFn } from '@angular/common/http';

export const commonInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
