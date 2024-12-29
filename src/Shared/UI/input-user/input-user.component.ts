import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'input-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,TranslateModule],
  templateUrl: './input-user.component.html',
  styleUrls: ['./input-user.component.scss']
})
export class InputUserComponent {
  @Input() register!: FormGroup;
  @Input() controlName!: string;
  @Input() typeName!: string;
  @Input() PlaceHolder!: string;

  private _TranslateService = inject(TranslateService);

  validationClass() {
    const control = this.register.get(this.controlName);
    return {
      'is-valid': control && !control.errors && (control.touched || control.dirty),
      'is-invalid': control && control.errors && (control.touched || control.dirty),
    };
  }
}
