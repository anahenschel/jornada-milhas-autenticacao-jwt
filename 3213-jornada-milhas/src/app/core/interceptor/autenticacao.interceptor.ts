import { TokenService } from 'src/app/core/services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private TokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   if(this.TokenService.possuiToken()) {
    const token = this.TokenService.retornarToken()
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
   }
    return next.handle(request);
  }
}
