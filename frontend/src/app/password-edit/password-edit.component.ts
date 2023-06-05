import { Component } from '@angular/core';
import { PasswordService } from '../password.service';
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
    private passwordService: PasswordService // Service for managing passwords
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!; // Retrieves the 'id' parameter from the route
    
    if (id !== null) {
      // Fetch the password details from the password service based on the ID
      this.passwordService.getPasswordById(id).subscribe((password: Password) => {
        this.password = password;
        this.decryptedPassword = atob(password.encryptedPassword);
        // debug line
        console.log(this.password);
      });
    } else {
      // Set default values for a new password
      this.password = {
        category: '',
        app: '',
        userName: '',
        encryptedPassword: ''
      };
    }
  }

  save(): void {
    // Check if all required fields are filled
    if (!this.password.category || !this.password.app || !this.password.userName || !this.decryptedPassword) {
      alert('Please enter all the fields!');
      return;
    }

    this.isSaving = true; // Set saving flag to true
    
    if (this.password._id === undefined) {
      // Add a new password
      this.password.encryptedPassword = btoa(this.decryptedPassword); // Encrypt the password
      this.passwordService.addPassword(this.password)
        .subscribe(() => {
          this.isSaving = false; // Set saving flag to false
          this.goBack(); // Navigate back
        });
    } else {
      // Update an existing password
      if (this.decryptedPassword) {
        this.password.encryptedPassword = btoa(this.decryptedPassword); // Encrypt the password if it exists
      }
      this.passwordService.updatePassword(this.password._id!, this.password)
        .subscribe(() => {
          this.isSaving = false; // Set saving flag to false
          this.goBack(); // Navigate back
        });
    }
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
