import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarcolour : string = "navbar-dark";
  light ! : string;
  constructor(private sharingService:SharingService) {}

  ngOnInit(): void {

    
    }

    
  }

