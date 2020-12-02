import { Component, ViewChild } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
export interface TableElement {
  id: string;
  name: string;
  email: string;
  website: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService, ChatService]
})

export class AppComponent {
  Data: TableElement[];
  col: string[] = ['id', 'name', 'email', 'website'];
  dataSource;
  subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private restApiService: RestApiService, private chatService: ChatService) {

    // chatService.messages.subscribe(msg => {
    //   console.log('Response from websocket: ' + msg);
    // });
    this.subscription = this.chatService.getData()
    .subscribe(val => {
        console.log(val);
    });

    this.restApiService.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<TableElement>(res);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }
  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  };
  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    // this.chatService.messages.next(this.message);
    // this.message.message = '';
  }

}
