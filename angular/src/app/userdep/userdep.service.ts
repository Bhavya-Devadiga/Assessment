import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdepService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data`);
  }
  getCountryData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/getcountry`);
  }
  getAllStateData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/getallstate`);
  }
  getstate(id :any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/getstate/${id}`);
  }
  addData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data/createdata`, data);
  }
  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  }
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/data/deletedata/${id}`);
  }
  patchData(id :any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/patchdata/${id}`);
  }
}
