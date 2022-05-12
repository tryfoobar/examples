import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { init } from 'commandbar';
import { type Person, create, update, remove } from '../crud/crud.actions';

init('5ba0a816');

@Injectable({
  providedIn: 'root',
})
export class CommandbarService implements OnDestroy {
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private store: Store<{ crud: Person[] }>
  ) {
    window.CommandBar.boot('me');
  }

  addRouter(): void {
    window.CommandBar.addRouter((url) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl(url);
      });
    });
  }

  addContext(): void {
    this.store.select('crud').subscribe((people) => {
      window.CommandBar.addContext(
        'people',
        () =>
          people.map(({ first, last }, id) => ({
            id,
            label: `${first} ${last}`,
            first,
            last,
          })),
        {
          quickFindOptions: { quickFind: true },
        }
      );
    });
  }

  addCallbacks(): void {
    window.CommandBar.addCallback('create', (args: Person) =>
      this.store.dispatch(create(args))
    );
    window.CommandBar.addCallback(
      'update',
      (args: { selected: Person } & Person) => this.store.dispatch(update(args))
    );
    window.CommandBar.addCallback('remove', (args: { selected: Person }) =>
      this.store.dispatch(remove(args))
    );
  }

  addCommands(): void {
    window.CommandBar.addCommand({
      name: 'home',
      text: 'Go to Home',
      category: 'Navigation',
      icon: 'https://openmoji.org/data/color/svg/E269.svg',
      template: { type: 'link', value: '/', operation: 'router' },
      availability_rules: [
        {
          type: 'url',
          operator: 'isNot',
          value: '/',
        },
      ],
    });
    window.CommandBar.addCommand({
      name: 'foo',
      text: 'Go to Foo',
      category: 'Navigation',
      icon: 'https://openmoji.org/data/color/svg/E269.svg',
      template: { type: 'link', value: '/foo', operation: 'router' },
      availability_rules: [
        {
          type: 'url',
          operator: 'isNot',
          value: '/foo',
        },
      ],
    });

    window.CommandBar.addCommand({
      name: 'create',
      text: 'Add a person',
      category: 'CRUD',
      icon: 'https://openmoji.org/data/color/svg/E268.svg',
      template: { type: 'callback', value: 'create' },
      arguments: {
        first: { order_key: 0, value: 'text', type: 'provided' },
        last: { order_key: 1, value: 'text', type: 'provided' },
      },
    });
    window.CommandBar.addCommand({
      name: 'update',
      text: 'Update a person',
      category: 'CRUD',
      icon: 'https://openmoji.org/data/color/svg/E25D.svg',
      template: { type: 'callback', value: 'update' },
      arguments: {
        selected: {
          order_key: 0,
          value: 'people',
          type: 'context',
          label: 'Person to update',
        },
        first: {
          order_key: 1,
          value: 'text',
          type: 'provided',
          label: 'New first name',
        },
        last: {
          order_key: 2,
          value: 'text',
          type: 'provided',
          label: 'New last name',
        },
      },
    });

    window.CommandBar.addCommand({
      name: 'remove',
      text: 'Remove a person',
      category: 'CRUD',
      icon: 'https://openmoji.org/data/color/svg/E262.svg',
      template: { type: 'callback', value: 'remove' },
      arguments: {
        selected: {
          order_key: 0,
          value: 'people',
          type: 'context',
          label: 'Person to update',
        },
      },
    });
  }

  setup(): void {
    this.addRouter();
    this.addContext();
    this.addCallbacks();
    this.addCommands();
  }

  removeCommands(): void {
    window.CommandBar.removeCommand('home');
    window.CommandBar.removeCommand('foo');
    window.CommandBar.removeCommand('create');
    window.CommandBar.removeCommand('update');
    window.CommandBar.removeCommand('remove');
  }

  ngOnDestroy(): void {
    this.removeCommands();
    window.CommandBar.shutdown();
  }
}
