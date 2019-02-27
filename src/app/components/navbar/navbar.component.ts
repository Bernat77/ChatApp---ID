import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //this is the current user the navbar html will use
  public currentUser: any = null;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    //oninit this current user it's retrieved from subscription on the authservice > current user.
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

}
