import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  users ?: Observable<User[]>;

  private readonly BASE_URL = 'http://localhost:3000/users'; // URL de l'API JSON Server

  private userService: UserService = inject(UserService);
  private http : HttpClient = inject(HttpClient);

  msg ?: string;

  form : FormGroup = new FormGroup ({
    email : new FormControl("gerardBouchard@mail.com", [
      Validators.required,
      Validators.email
    ]),
    password : new FormControl("coucou", [
      Validators.required,
      Validators.minLength(6)])
  })

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;

      this.http.get<User[]>(this.BASE_URL).pipe(
        map((users) => users.some(user => user.email === email))
      ).subscribe({
        next: (exists) => {
          if (exists) {
            this.msg= "Félicitations, vous etes enregitré"
          } else {
            this.msg= "Email non trouvé en base de données."
          }
        },
        error: (err) => {
          console.error('Erreur lors de la vérification de l\'email :', err);
        }
      });
    }
  }
}
