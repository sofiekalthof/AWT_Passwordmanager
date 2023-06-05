import { Component, OnInit } from '@angular/core';
import { PasswordService } from './password.service';
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

  constructor(private passwordService: PasswordService, private router: Router) {}

  ngOnInit(): void {
    this.updatePasswords();
  }

  updatePasswords() {
    this.passwordService.getAllPasswords()
    .subscribe((password: Password[]) => {
      this.passwords = password;
    });
  }

  
}
