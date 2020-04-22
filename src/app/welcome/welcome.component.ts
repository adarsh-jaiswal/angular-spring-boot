import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = '';

  constructor(private route : ActivatedRoute,
    private welcomeService : WelcomeDataService) { }

  ngOnInit(): void {
    console.log("name=" + this.route.snapshot.params['name']);
    //this.message += this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    let name = this.route.snapshot.params['name'];
    this.welcomeService.executeWelcomeService(name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    
  }

  handleSuccessfulResponse(response) {
    this.message = response.message;
  }

  handleErrorResponse(error) {
    this.message = error.error.message;
  }
}
