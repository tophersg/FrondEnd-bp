import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateTo(param: string) {
    this.router.navigate([param]);
  }
}
