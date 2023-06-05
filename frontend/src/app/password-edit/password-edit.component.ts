import { Component } from '@angular/core';
import { Password } from '../models/password';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent {
  password!: Password;
  decryptedPassword!: string;
  isSaving = false;

  constructor(
    private route: ActivatedRoute, // Provides access to the current route
    private router: Router, // Used for navigation
  ) { }

  ngOnInit(): void {
  }



  goBack(): void {
    this.router.navigate(['/']); // Navigate back to the password manager page
  }

  togglePasswordVisibility(): void {
    // Toggle password visibility
    const passwordField = document.getElementById('encryptedPassword') as HTMLInputElement;
    const toggleButton = document.getElementById('togglePasswordVisibilityButton') as HTMLButtonElement;
    const toggleButtonIcon = toggleButton.querySelector('i');

    if (toggleButtonIcon) {
      if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Show the password
        toggleButtonIcon.classList.remove('fa-eye');
        toggleButtonIcon.classList.add('fa-eye-slash');
      } else {
        passwordField.type = 'password'; // Hide the password
        toggleButtonIcon.classList.remove('fa-eye-slash');
        toggleButtonIcon.classList.add('fa-eye');
      }
    }
  }

}
