import { Component, OnInit } from '@angular/core';
import { Password } from '../models/password';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-password-manager',
  templateUrl: './password-manager.component.html',
  styleUrls: ['./password-manager.component.css']
})
export class PasswordManagerComponent implements OnInit{
  passwords!: Password[];
  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
    this.getPasswords(); // Retrieves the passwords when the component is initialized
  }

  getPasswords(): void {
    // Retrieves all passwords from the password service
    this.passwordService.getAllPasswords()
      .subscribe(passwords => this.passwords = passwords);
  }

  deletePassword(password: Password) {
    if (confirm('Are you sure you want to delete this password?')) {
      // Removes the password from the list
      this.passwords = this.passwords.filter(p => p !== password);
      // Calls the password service to delete the password
      this.passwordService.deletePassword(password._id!).subscribe();
    }
  }



}
