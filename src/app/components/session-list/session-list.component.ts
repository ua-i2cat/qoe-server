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
    // Get all session data
    this.getSessions();

    // Get data of new sessions
    this.socket.on('startSession', event => {
      event.status = 'Live';
      this.Sessions.push(event);
    });

    //Get last data to end session
    this.socket.on('stopSession', event => {
      this.Sessions.map(function(element){
        //Join start data with stop data of each session
        if(element.sessionId === event.sessionId){
          element.lastTime = event.date;
          element.duration = event.date - element.date;
          element.status = 'Ended';
        }
      });
    });
  }

/**
 * Gets the sessions.
 */
  private getSessions(){
    this.apiService.getSessionsQoes().subscribe((data) => {
      this.Sessions = data;
    });    
  }

/**
 * { function_description }
 *
 * @param      {<type>}  id      The identifier
 */
  public delete(session){
    if(session.lastTime){
      this.apiService.deleteSession(session.sessionId).subscribe((data) => {
        this.Sessions = this.Sessions.filter(function( obj ) {
          return obj.sessionId !== session.sessionId;
        });
      }); 
    } else {
      console.log("Session is live and can't be deleted");
    }

  }
}
