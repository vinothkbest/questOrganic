import { Component} from '@angular/core';
import { contactAnimate } from 'src/app/app-animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations:[contactAnimate]
})
export class ContactComponent{
  contacts?:any = []

  constructor() {
    this.contacts = [{
        street: "19A SanthaiPettai, Aniyapure",
        city : "Manapparai, Trichy 621307"
      },
      {
        street: "28B Buvaneswari Nagar",
        city : "Adhambakam, Chennai 600307"
      }
    ]
  }

}
