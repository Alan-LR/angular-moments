import { Response } from './../interfaces/response';
import { Observable } from 'rxjs';
import { Comment } from './../interfaces/comment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiUrl: string = "http://localhost:3333/api/moments"

  constructor(private http: HttpClient) { }

  createComment(data: Comment): Observable<Response<Comment>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.http.post<Response<Comment>>(url, data);
  }


}
