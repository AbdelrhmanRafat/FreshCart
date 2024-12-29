import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-item-with-logo',
  standalone: true,
  imports: [TranslateModule,RouterLink,RouterLinkActive,NgClass],
  templateUrl: './nav-item-with-logo.component.html',
  styleUrl: './nav-item-with-logo.component.scss'
})
export class NavItemWithLogoComponent {
  @Input({required : true}) navLink! : string;
  @Input({required : true}) navTitle! : string;
  @Input() counter! : number;
  @Input() navLogo! : string;

}
