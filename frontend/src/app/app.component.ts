import { Component, OnInit } from '@angular/core';
import { Password } from './models/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  passwords!: Password[];


  ngOnInit(): void {
  }



  
}
