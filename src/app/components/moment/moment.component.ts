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
  moment?: Moment;
  
  constructor(private momentService: MomentService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    //id que está na url
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.momentService.getMomentId(id)
    .subscribe((item) => (this.moment = item.data));
  }

}
