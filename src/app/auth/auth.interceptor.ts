import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    totalRequests = 0;
    requestsCompleted = 0;
    constructor(private router: Router, private loader: LoadingService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('userToken') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            this.loader.show();
            this.totalRequests++;
            return next.handle(clonedReq).pipe(
                finalize(() => {

                    this.requestsCompleted++;



                    if (this.requestsCompleted === this.totalRequests) {
                        this.loader.hide();
                        this.totalRequests = 0;
                        this.requestsCompleted = 0;
                    }
                })

            );
        }
        else
            return next.handle(req.clone());
    }
}