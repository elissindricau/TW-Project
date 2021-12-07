import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { User } from './interface/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(){
  }
  



}
