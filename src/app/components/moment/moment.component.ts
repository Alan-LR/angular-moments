import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MessageService } from './../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentService } from './../../services/moment.service';
import { Moment } from './../../interfaces/moment';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


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
    private router: Router,
    private messagesService: MessageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    //id que está na url
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.momentService.getMomentId(id).subscribe((item) => {
      (this.moment = item.data);
      this.moment.created_at = new Date(this.moment.created_at!).toLocaleDateString('pt-BR') //linha convertendo a data para pt-br
    })
  }

  async removeHandler(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Tem certeza que deseja remover esse momento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) { //se for verdadeiro
        //deletando
        this.momentService.deleteMoment(id).subscribe(
          () => {
            this.messagesService.add('Excluído com sucesso!')
            this.router.navigate(['/']);

          })
      }
    });
  }




}
