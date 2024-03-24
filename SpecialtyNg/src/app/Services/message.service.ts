import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chatRespone, messagesResponse } from '../Interfaces/message.Interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getChats(userId: string){
    return this.http.get<chatRespone>(`http://localhost:3900/chats/user-chats/${userId}`)
  }

  getMessages(chatId: string){
    return this.http.get<messagesResponse>(`http://localhost:3900/chats/chat-messages/${chatId}`)
  }
}
