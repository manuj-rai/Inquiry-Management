import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUrl = 'https://localhost:7158';

  constructor(private http: HttpClient) {}

  // Fetch paginated inquiries with optional filters
  getPaginatedUsers(pageNumber: number,
    pageSize: number,
    gender?: string,
    country?: string,
    status?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    // Add filters to the params if they are provided
    if (gender) params = params.set('gender', gender);
    if (country) params = params.set('country', country);
    if (status) params = params.set('status', status);

    return this.http.get(`${this.baseUrl}/GetPaginatedInquiries`, { params });
  }

  updateInquiryStatus(inquiryId: number, action: string): Observable<any> {
    const body = {
      InquiryID: inquiryId,
      Action: action
    };

    return this.http.post(`${this.baseUrl}/UpdateInquiryStatus`, body);
  }
   

  // Method to submit an inquiry
  submitInquiry(inquiry: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/InsertInquiry`, inquiry); 
  }



  // Method to get top 5 recent users
  getRecentUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recent-users`);
  }


}
