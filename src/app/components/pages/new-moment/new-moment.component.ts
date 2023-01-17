import { MessageService } from './../../../services/message.service';
import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../interfaces/moment';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {

  btnText = 'Compartilhar!'

  constructor(private momentService: MomentService,
    private messageService: MessageService,
    private router: Router){}

  async elementoPaiRecebeEventoFilho(moment: Moment){ //convertendo as informações que chegaram do elemento filho
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if(moment.image){
      formData.append("image", moment.image)
    }

    //todo
    //enviar para o service
    this.momentService.createMoment(formData).subscribe();

    //exibir msg de sucesso
    this.messageService.add('Momento adicionado com sucesso!')

    //redirecionar o usuário após concluir o formulário para outra página
    this.router.navigate(['/']);

  }

}
