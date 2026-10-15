import { HttpInterceptorFn } from '@angular/common/http';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem("token")){
    const ReqClone = req.clone({
      setHeaders :{
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return next(ReqClone);
  }
  else{
    return next(req);

  }
};
