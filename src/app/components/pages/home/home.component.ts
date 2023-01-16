import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../interfaces/moment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  imagePath: string = "http://localhost:3333/";  //para carregarmos a imagem devemos passar uma url para o src, no caso o endereço do banco de dados e o nome da imagem(que foi passado no html)
  allMoments: Moment[] = []
  moments: Moment[] = []
  searchTerm: string = '';

  constructor(private momentService: MomentService) {

  }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })
      this.allMoments = data
      this.moments = data
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement
    const value = target.value.toLowerCase()

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value)
    });
  }

}
