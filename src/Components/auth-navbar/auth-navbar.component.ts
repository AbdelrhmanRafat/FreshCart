import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { TranslationService } from '../../core/Services/translation.service';
import { NavLanguageItemComponent } from "../../Shared/UI/nav-language-item/nav-language-item.component";
import { NavItemComponent } from '../../Shared/UI/nav-item/nav-item.component';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule, NavLanguageItemComponent,NavItemComponent],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent implements OnInit {

  private readonly _TranslationService = inject(TranslationService);
  cartCounter = 0;
  ngOnInit(): void {
    this._TranslationService.changedirection();
}}

