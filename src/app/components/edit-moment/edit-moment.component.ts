import { MessageService } from './../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute, //para pegar o ID que vem da URL
    private messageService: MessageService,
    private router: Router // para redirecionar a página
  ) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMomentId(id).subscribe(item => {
      this.moment = item.data
    })
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append("image", momentData.image);
    }

    //separar as funcionalidades do método em outros métodos e chama-los
    //esse
    this.messageService.add('Momento atualizado com sucesso!');
    //esse
    this.momentService.updateMoment(id!, formData).subscribe();
    //esse
    await this.router.navigate(['/']);

  }

}
