import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const handledRequest = token
      ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
      : request;
    return next.handle(handledRequest);
  }
  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Request Headers:', cloned.headers.keys().map(key => `${key}: ${cloned.headers.get(key)}`));
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }*/
}
