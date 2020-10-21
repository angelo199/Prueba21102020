import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from './../http-error-handler.service';
import { Login } from './../../login/login';
import { environment } from './../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json'
	})
};

@Injectable({
  	providedIn: 'root'
})
export class LoginService {
	heroesUrl = environment.url; // url
	private handleError: HandleError;
	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandlerService) {
		this.handleError = httpErrorHandler.createHandleError('LoginService');
	}
	login(login: Login): Observable<Login> {
		return this.http.post<Login>(this.heroesUrl, login, httpOptions)
		.pipe(
			catchError(this.handleError('login', login))
		);
	}
}
