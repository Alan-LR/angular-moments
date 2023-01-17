import { ActivatedRoute, Router } from '@angular/router';
import { MomentService } from './../../services/moment.service';
import { Moment } from './../../interfaces/moment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent {
  imagePath: string = "http://localhost:3333/"; 
  moment?: Moment;
  
  constructor(private momentService: MomentService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    //id que está na url
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.momentService.getMomentId(id).subscribe((item) => {
      (this.moment = item.data);
      this.moment.created_at = new Date(this.moment.created_at!).toLocaleDateString('pt-BR') //linha convertendo a data para pt-br
    })
  }

}
