import { Injectable, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { init } from 'commandbar';

@Injectable({
  providedIn: 'root',
})
export class CommandbarService implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {
    init('5ba0a816');
  }

  ngOnInit(): void {
    window.CommandBar.boot('me').then(() => {
      window.CommandBar.addRouter((url) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl(url);
        });
      });

      window.CommandBar.addCommand({
        name: 'Home',
        text: 'Home',
        category: 'Navigation',
        template: { type: 'link', value: '/', operation: 'router' },
      });
      window.CommandBar.addCommand({
        name: 'Fop',
        text: 'Fop',
        category: 'Navigation',
        template: { type: 'link', value: '/fop', operation: 'router' },
      });
    });
  }

  ngOnDestroy(): void {
    window.CommandBar.shutdown();
  }
}
