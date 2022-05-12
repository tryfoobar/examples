import { Component, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { create, remove, update, type Person } from './crud.actions';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent {
  people$: Observable<Person[]>;
  filteredPeople$ = new BehaviorSubject<Person[] | null>(null);
  selected$ = new BehaviorSubject<Person | null>(null);

  prefix = this.formBuilder.control('');
  first = this.formBuilder.control('');
  last = this.formBuilder.control('');
  index = this.formBuilder.control(0);
  crudForm = this.formBuilder.group({
    prefix: this.prefix,
    first: this.first,
    last: this.last,
    index: this.index,
  });

  constructor(
    private store: Store<{ crud: Person[] }>,
    private formBuilder: FormBuilder,
    private ngZone: NgZone
  ) {
    this.people$ = store.select('crud');

    this.onChanges();
  }

  onChanges(): void {
    this.people$.subscribe((people) => {
      this.ngZone.run(() => {
        this.filteredPeople$.next(people);
      });
    });

    combineLatest([this.filteredPeople$, this.index.valueChanges]).subscribe(
      ([filteredPeople, index]) => {
        if (filteredPeople) {
          this.selected$.next(filteredPeople[index]);
        }
      }
    );

    combineLatest([this.people$, this.prefix.valueChanges]).subscribe(
      ([people, prefix]) => {
        this.filteredPeople$.next(
          prefix
            ? people.filter((person) => {
                const name = `${person.last}, ${person.first}`;
                return name.toLowerCase().startsWith(prefix.toLowerCase());
              })
            : people
        );
      }
    );

    this.selected$.subscribe((selected) => {
      if (selected) {
        this.reset_inputs(selected);
      }
    });
  }

  reset_inputs(person?: Person): void {
    this.first.setValue(person ? person.first : '');
    this.last.setValue(person ? person.last : '');
  }

  create(): void {
    this.store.dispatch(
      create({ first: this.first.value, last: this.last.value })
    );
  }

  update(): void {
    if (this.selected$.value) {
      this.store.dispatch(
        update({
          selected: this.selected$.value,
          first: this.first.value,
          last: this.last.value,
        })
      );
    }
  }

  remove(): void {
    if (this.selected$.value) {
      this.store.dispatch(remove({ selected: this.selected$.value }));
    }
  }
}
