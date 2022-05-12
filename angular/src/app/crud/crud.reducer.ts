import { createReducer, on } from '@ngrx/store';
import { type Person, create, update, remove } from './crud.actions';

export const initialState = [
  { first: 'Hans', last: 'Emil' },
  { first: 'Max', last: 'Mustermann' },
  { first: 'Roman', last: 'Tisch' },
];

export const crudReducer = createReducer(
  initialState,
  on(create, (state, { first, last }) => [...state, { first, last }]),
  on(update, (state, { selected, first, last }) =>
    state.map((person, i) =>
      i === selectedPersonIndex(state, selected) ? { first, last } : person
    )
  ),
  on(remove, (state, { selected }) => {
    const index = selectedPersonIndex(state, selected);
    return [...state.slice(0, index), ...state.slice(index + 1)];
  })
);

const selectedPersonIndex = (state: typeof initialState, selected: Person) =>
  state.findIndex(
    (person) => person.first === selected.first && person.last === selected.last
  );
