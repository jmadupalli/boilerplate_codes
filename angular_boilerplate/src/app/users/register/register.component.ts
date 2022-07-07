import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private backend: BackendService,
    private toastr: ToastrService,
  ) { }

  form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)]
  });


  ngOnInit(): void {
    if (this.backend.isLoggedIn) {
      this.toastr.info("You're already logged in");
      this.router.navigate(['dashboard']);
    }
  }

  register() {
    if (this.form.invalid)
      return;

    this.backend.register(this.form.value).subscribe({
      next: (resp) => {
        this.toastr.success('Registration Successful');
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

}
