import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/shared/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'sms-client';
}
