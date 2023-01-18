import { Moment } from './../../interfaces/moment';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss']
})
export class MomentFormComponent {

  @Output() onSubmit = new EventEmitter<Moment>
  @Input() btnText!: string
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup
  
  constructor(private fb: FormBuilder){
    
  }
  
  ngOnInit(): void{
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', Validators.required),
      description: new FormControl(this.momentData ? this.momentData.description : '', Validators.required),
      image: new FormControl(''),
    });
  }

  getTitle(){
    return this.momentForm.get('title')
  }

  getDescription(){
    return this.momentForm.get('description')
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0]

    this.momentForm.patchValue({image: file})
  }


  submit(){
    console.log(this.momentForm.value)
    this.onSubmit.emit(this.momentForm.value) // passando os dados do formulário filho para o elemento pai
  }  

}
