import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRequest } from 'src/app/model/user-data';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]]
  })

  hide = true;
  usuario: UserRequest;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly apiService: ApiService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
  }

  registrar() {

    if (this.registerForm.valid) {
      this.usuario = {
        nombre: this.registerForm.get('name').value,
        apellidos: this.registerForm.get('surname').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        usuario: this.registerForm.get('username').value,
      }
      this.apiService.registrarUsuario$(this.usuario).subscribe(response => {
        this._dialog.open(DialogComponent, {
          data: {
            title: 'DIALOG.TITLE_SUCCESS',
            message: 'USER.REGISTER_USER_SUCCESS',
            success: true
          },
          width: '25%',
        });
        this._router.navigate(['']);
      },
        error => {
          this._dialog.open(DialogComponent, {
            data: {
              title: 'DIALOG.TITLE_ERROR',
              message: error.error,
              success: false
            },
            width: '25%',
          });
        });

    } else {
      this._dialog.open(DialogComponent, {
        data: {
          title: 'DIALOG.TITLE_ERROR',
          message: 'USER.REGISTER_USER_VALIDATION',
          success: false
        },
        width: '25%',
      });
    }

  }

}
