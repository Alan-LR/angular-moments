import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../interfaces/moment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {

  btnText = 'Compartilhar!'

  constructor(private momentService: MomentService){}

  async elementoPaiRecebeEventoFilho(moment: Moment){ //convertendo as informações que chegaram do elemento filho
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if(moment.image){
      formData.append("image", moment.image)
    }

    //todo
    await this.momentService.createMoment(formData).subscribe();
    //enviar para o service

    //exibir msg de sucesso

    //redirecionar o usuário após concluir o formulário para outra página

  }

}
