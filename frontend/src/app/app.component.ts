import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TribuService } from './services/tribu.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[TribuService, provideNativeDateAdapter()]

})
export class AppComponent {
  title = 'frontend';
}
