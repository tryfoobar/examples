import { createAction, props } from '@ngrx/store';

export interface Person {
  first: string;
  last: string;
}

export const create = createAction('[Crud Component] Create', props<Person>());
export const update = createAction(
  '[Crud Component] Update',
  props<{ selected: Person } & Person>()
);
export const remove = createAction(
  '[Crud Component] Remove',
  props<{ selected: Person }>()
);
