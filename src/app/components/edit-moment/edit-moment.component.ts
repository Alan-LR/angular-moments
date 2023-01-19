import { Observable } from 'rxjs';
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

  message: any = '';

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
    
    (await this.momentService.updateMoment(id!, formData)).subscribe();
    this.message = this.messageService.add('Momento atualizado com sucesso!');

    if(this.moment != momentData){
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    }
  }

  async mensagem(){
    this.message = this.messageService.add('Momento atualizado com sucesso!');
    await this.message;
  }

  async trocarPagina(){
    this.router.navigate(['/']);
  }


}
