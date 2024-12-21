import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent {

}
