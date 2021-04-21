import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { MessageService } from '../../services/messages.service';
import { message } from '../../models/account/messages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
currentUser =localStorage.getItem('name');

form: FormGroup;
@ViewChild(IonContent) content:IonContent;
  messages:message[] = [];
  email:string =localStorage.getItem('email')
  constructor(private msgServ:MessageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'msg':new FormControl(null,{validators:[Validators.required,Validators.required]})
    });
    this.msgServ.getMsgListener().subscribe((msg)=>{
      this.messages.push(msg);
      setTimeout(()=>{
        this.content.scrollToBottom(100);
      });
    })

    this.msgServ.getMessages(this.email).subscribe((res)=>{
      console.log(res);
      this.messages = res;

    })
  }

  sendMsg(){

    this.msgServ.sendMessage(this.form.value.msg,this.email);

    this.form.reset();

  }


}
