import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
})
export class BlankComponent {}
