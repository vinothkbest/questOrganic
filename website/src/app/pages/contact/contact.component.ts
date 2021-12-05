import { Component} from '@angular/core';
import { validationAnimate,loaderAnimate} from 'src/app/app-animation';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations:[validationAnimate,loaderAnimate]
})
export class ContactComponent{
  contacts?:any
  status?:any = {
    name:'hide',
    email:'hide',
    comment:'hide'
  }
  errors?:any = {
    name:'',
    email:'',
    comment:''
  }
  btn_loader = ""
  btn_name:any = {
    display: 'block',
    'font-weight' : 'bold'
  }
  loading:string="off"
  constructor(private contact:ContactService) {
    this.contacts = [{
        street: "19A SanthaiPettai, Aniyapure",
        city : "Manapparai, Trichy 621307"
      },
      {
        street: "28B Buvaneswari Nagar",
        city : "Adhambakam, Chennai 600307"
      }
    ];
  }
  formSave(e:any){
    const name:string = e.target.querySelector('#name').value
    const email:string = e.target.querySelector('#email').value
    const comment:string = e.target.querySelector('#comment').value
    if(!this.errors.name && !this.errors.email && !this.errors.comment
        && name && comment && email){
          this.btn_loader = "loader"
          this.btn_name.display = "none"
          this.loading="on"
          let formData:any = {
            name, email, comment
          }
          this.contact.save(formData)
          window.setTimeout(() => {
            this.loading="off"
            this.btn_loader = ""
            this.btn_name.display = "block"
          }, 4000)
    }
    else{
      this.status.name = this.status.email = this.status.comment = 'show'
      if(!name){
        this.errors.name ="Please enter the name"
      }
      if(!email){
        this.errors.email= "Please enter the email"
      }
      if(!comment){
        this.errors.comment="Please enter the comment"
      }
    }
  }
  validate(data:any){
    const formErrors = data.control.errors      
    if(data.name == 'name'){
      this.errors.name =  formErrors?.required? "Please enter the name" : (
        formErrors?.minlength? `Name required  at least ${formErrors?.minlength.requiredLength}` : (
          formErrors?.pattern? "Alphabets, dash and space characters only allowed" : ""
        )
      )
      this.status.name = data.control.errors? 'show': 'hide';
    }
    if(data.name == 'email'){
      this.errors.email =  formErrors?.pattern? "Please enter valid email format (example@domain.com)" : (
          formErrors?.required? "Please enter the email" : ""
      )
      this.status.email = data.control.errors?  'show': 'hide';
    }
    if(data.name == 'comment'){
      this.errors.comment =  formErrors?.pattern? "Please place valid comment" : (
          formErrors?.required? "Please enter the comment" : ""
      )
      this.status.comment = data.control.errors?  'show': 'hide';
    }
  } 
}
