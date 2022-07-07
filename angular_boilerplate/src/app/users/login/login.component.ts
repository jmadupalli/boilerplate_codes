import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    if (this.backend.isLoggedIn) {
      this.toastr.info("You're already logged in");
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    if (this.form.invalid)
      return;
    this.backend.login(this.form.value).subscribe({
      next: (resp) => {
        localStorage.setItem('access_token', resp['access_token']);
        delete resp['access_token'];
        localStorage.setItem('user_profile', JSON.stringify(resp));
        this.backend.user = resp;
        this.toastr.success('Login Successful');
        this.router.navigate(['dashboard']);

      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

}
