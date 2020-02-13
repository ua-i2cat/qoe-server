import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { Observable, forkJoin  } from 'rxjs';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  private socket;
  Sessions:any = [];

  constructor(private apiService: ApiService) {
    this.socket = io.connect('http://localhost:4000');
  }

  ngOnInit() {
    this.getSessions();
    this.socket.on('newSession', event => {
      this.Sessions.push(event);
      console.log(event);
    });
  }

  private getSessions(){
    this.apiService.getSessionsQoes().subscribe((data) => {
      this.Sessions = data;
    });    
  }
}
