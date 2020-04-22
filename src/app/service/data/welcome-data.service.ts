import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http : HttpClient) { }

  executeWelcomeService(name: string) {
    return this.http.get<WelcomeModel>(`http://localhost:8080/welcome/${name}`);
  }
}

export class WelcomeModel {
  constructor(public message : string) {
  }
}