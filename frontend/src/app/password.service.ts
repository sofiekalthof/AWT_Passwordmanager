import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient } from '@angular/common/http';
import { Password } from './models/password';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private apiUrl = environment.apiUrl; // Represents the API endpoint for passwords

  constructor(private http: HttpClient) { }

  getAllPasswords() {
    return this.http.get<Password[]>(`${this.apiUrl}/passwords`); // Retrieves all passwords from the API
  }

  getPasswordById(id: string) {
    return this.http.get<Password>(`${this.apiUrl}/password-edit/${id}`); // Retrieves a password by ID from the API
  }

  addPassword(password: Password) {
    return this.http.post(`${this.apiUrl}/passwords-edit`, password); // Adds a new password to the API
  }

  updatePassword(id: string, password: Password){
    return this.http.put(`${this.apiUrl}/passwords-edit/${id}`, password); // Updates a password by ID in the API
  }

  deletePassword(id: string){
    return this.http.delete(`${this.apiUrl}/passwords/${id}`); // Deletes a password by ID from the API
  }
}
