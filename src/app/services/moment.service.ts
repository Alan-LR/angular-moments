import { Response } from './../interfaces/response';
import { Moment } from './../interfaces/moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  apiUrl: string = "http://localhost:3333/api/moments"

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMomentId(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url)
  }

  deleteMoment(id: Number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }


  async updateMoment(id: Number, formData: FormData): Promise<Observable<FormData>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }

}
