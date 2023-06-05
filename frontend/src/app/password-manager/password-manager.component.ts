import { Component, OnInit } from '@angular/core';
import { Password } from '../models/password';


@Component({
  selector: 'app-password-manager',
  templateUrl: './password-manager.component.html',
  styleUrls: ['./password-manager.component.css']
})
export class PasswordManagerComponent implements OnInit{
  passwords!: Password[];

  ngOnInit(): void {
  }

}