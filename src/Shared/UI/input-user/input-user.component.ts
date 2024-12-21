import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-user',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './input-user.component.html',
  styleUrl: './input-user.component.scss'
})
export class InputUserComponent {
   @Input() register! : FormGroup;
   @Input() controlName! : string;
   @Input() typeName! : string;
   @Input() PlaceHolder! : string;
}
