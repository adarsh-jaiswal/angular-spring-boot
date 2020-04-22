import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'adarsh';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router,
    private authentication: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.authentication.executeAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log('Success login-' + data)
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
      }, error => {
        console.log('error in loggin in- '+ error)
        this.invalidLogin = true;
      }
    );
  }

  handleJWTLogin() {
    this.authentication.executeJWTAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log('Success login-' + data)
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
      }, error => {
        console.log('error in loggin in- '+ error)
        this.invalidLogin = true;
      }
    );
  }
}
