import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private toastr: ToastrService
  ) { }

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  login() {
    if (this.form.invalid)
      return;
    this.backend.login(this.form.value).subscribe({
      next: (resp) => {
        this.toastr.success('Login Successful');
        console.log(resp);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

}
