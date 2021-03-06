import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.getUserLoggedIn();
   }

  userName:string;

  ngOnInit() {

    console.log('userName', this.userName);

  }


  getUserLoggedIn() {
    if(localStorage.getItem('user') != null){
      this.userName = JSON.parse(localStorage.getItem('user'))['email'];
    }
  }


}
