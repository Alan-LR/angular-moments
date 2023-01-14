import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string ='';

  constructor(private router: Router) { }

  add(message: string){
    this.message = message

    setTimeout(() => {
      this.clear()
    }, 4000);
  }

  clear(){
    this.message = '';
    this.router.navigate(['/']);
  }
}
