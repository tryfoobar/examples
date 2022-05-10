import { Component } from '@angular/core';
import { CommandbarService } from './commandbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private readonly commandbarService: CommandbarService) {
    this.commandbarService.ngOnInit();
  }
}
