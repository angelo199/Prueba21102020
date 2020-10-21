import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message/message.service';
export type HandleError =  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  	providedIn: 'root'
})

export class HttpErrorHandlerService {

  	constructor(private messageService: MessageService) { }
	createHandleError = (serviceName = '') => {
		return <T>(operation = 'operation', result = {} as T) =>
		this.handleError(serviceName, operation, result);
	}
  	handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
		return (error: HttpErrorResponse): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			//console.error(error.error.message); // log to console instead
			const message = (error.error instanceof ErrorEvent) ?
			error.error.message :error.error;
			// TODO: better job of transforming error for user consumption
			this.messageService.add(`${message.message}`);
			// Let the app keep running by returning a safe result.
			return of( result );
		};
	}
}
