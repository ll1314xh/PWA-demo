import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';
const CHAT_URL = 'ws://echo.websocket.org/';

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<string> = new Subject<string>();

  constructor(wsService: WebsocketService) {
    // this.messages = wsService.connect(CHAT_URL).map(
    //   (response: MessageEvent): Message => {
    //     const data = JSON.parse(response.data);
    //     return {
    //       author: data.author,
    //       message: data.message
    //     };
    //   }
    // );
  }
  getData(): Observable<string> {
    return this.messages.asObservable();
}
}
