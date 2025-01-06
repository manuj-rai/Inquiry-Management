// error-handler.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 500) {
      // Redirect to the 500 error page
      this.router.navigate(['/error']);
    }
    return throwError(() => new Error(error.message || 'Server error'));
  }
}

