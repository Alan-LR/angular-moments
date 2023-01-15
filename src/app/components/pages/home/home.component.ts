import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../interfaces/moment';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allMoments: Moment[] = []
  moments: Moment[] = []
  

  constructor(private momentService: MomentService){

  }

  ngOnInit(): void{
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data
      data.map((item)=>{
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })
      this.allMoments = data
      this.moments = data
    });
  }

}
