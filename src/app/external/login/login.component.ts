import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  validateFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f.user.value, this.f.password.value).subscribe(result => {
      if (Object.keys(result).length > 0) {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.router.navigate(['/admin']);
      }
    });
  }

  reset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
