import { ActivatedRoute } from '@angular/router';
import { Moment } from './../../interfaces/moment';
import { MomentService } from './../../services/moment.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss']
})
export class EditMomentComponent {

  btnText = 'Salvar';

  moment!: Moment

  constructor(private momentService: MomentService,
    private route: ActivatedRoute //para pegar o ID que vem da URL
    ){

  }

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMomentId(id).subscribe(item => {
      this.moment = item.data
    })
  }

}
