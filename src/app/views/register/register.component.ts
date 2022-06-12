import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this._fb.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    name: ['',[Validators.required]],
    surname: ['',[Validators.required]]
  })

  hide = true;
  
  constructor(
    private readonly _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
