import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WelcomeModel } from './data/welcome-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http : HttpClient) { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return user !== null;
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');
  }

  executeAuthenticationService(username: string, password: string) {
    console.log('executeAuthenticationService -'+ password);
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
        Authorization : basicAuthHeaderString
      });

    return this.http.get<AuthenticationModel>(`http://localhost:8080/basicauth`,
      {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username);
            sessionStorage.setItem('token', basicAuthHeaderString);
            return data;
        })
      );
  }

  executeJWTAuthenticationService(username: string, password: string) {
    console.log('executeAuthenticationService -'+ password);
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    return this.http.post<any>(`http://localhost:8080/authenticate`, {
      username,
      password
    }).pipe(
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username);
            sessionStorage.setItem('token', `Bearer ${data.token}`);
            return data;
        })
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
  }

}

export class AuthenticationModel {
  constructor(public message : string) {
  }
}
