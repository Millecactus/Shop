import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  users ?: Observable<User[]>;

  private readonly BASE_URL = 'http://localhost:3000/users'; // URL de l'API JSON Server

  private userService: UserService = inject(UserService);
  private http : HttpClient = inject(HttpClient);

  msg ?: string;

  form : FormGroup = new FormGroup ({
    email : new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    name : new FormControl("", Validators.required),
    password : new FormControl("", [
      Validators.required,
      Validators.minLength(6)])
  })

  onSubmit() {
    if(this.form.valid){
      const user = {
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        password : this.form.get('password')?.value
      }; 
      console.log(user);
      this.userService.register(user).subscribe(
        (response) => {
          console.log("Utilisateur enregistré avec succes " , response)
        }, (err) => {
          console.error("Erreur ",err);
        }
      );
    } else {
      console.error('Formulaire invalide.');
    }
    
  }

    //   if (this.form.valid) {
  //     const email = this.form.get('email')?.value;

  //     this.http.get<User[]>(this.BASE_URL).pipe(
  //       map((users) => users.some(user => user.email === email))
  //     ).subscribe({
  //       next: (exists) => {
  //         if (exists) {
  //           this.msg= "Félicitations, vous etes enregitré"
  //         } else {
  //           this.msg= "Email non trouvé en base de données."
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Erreur lors de la vérification de l\'email :', err);
  //       }
  //     });
  //   }
}
