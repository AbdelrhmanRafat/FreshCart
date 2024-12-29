import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [TranslateModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
 @Input({required : true}) navLink! : string;
 @Input({required : true}) navTitle! : string;
}
