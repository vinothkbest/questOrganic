import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

interface data{
  message:string,
  status:boolean
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  
  save(comments:any){
    this.http.post<data>('http://localhost:2000/comments', comments).subscribe( response => {
      console.log(response)
    });
  }
}
