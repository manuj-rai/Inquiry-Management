import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUrl = 'https://localhost:7158';

  constructor(private http: HttpClient) {}

  getPaginatedUsers(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetPaginatedInquiries?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }
}
