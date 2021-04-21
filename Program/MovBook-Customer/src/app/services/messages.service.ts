import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { message } from "../models/messages";

@Injectable({
    providedIn: 'root'
  })
  export class MessageService {
  email:string = "";
  private BASE_URL = environment.MOVBOOK_BACKEND_ADMIN_SERVER_URL;

  private newMsgListener = new Subject<message>();

    constructor(private http: HttpClient) { }

    getMessages(email:string){
         return this.http.get<message[]>(this.BASE_URL +"api/messages/"+email); //becuase im returning a observable rather than a single post
      }

    sendMessage(msg:string,email:string){
        const message:message = {email:email , subject:"customer Help" , message:msg, status:"sent" };
        console.log(message);
        this.http.post(this.BASE_URL +"api/messages/sent",message).subscribe((res)=>{
            console.log(res);
            this.newMsgListener.next(message);
        })
    }

    getMsgListener(){
        return this.newMsgListener.asObservable();
      }
  }
