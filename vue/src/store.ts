import { reactive } from "vue";

export interface Person {
  first: string;
  last: string;
}

const selectedPersonIndex = (people: Person[], selected: Person) =>
  people.findIndex(
    (person) => person.first === selected.first && person.last === selected.last
  );

export const store = reactive({
  people: [
    { first: "Hans", last: "Emil" },
    { first: "Max", last: "Mustermann" },
    { first: "Roman", last: "Tisch" },
  ],
});

export const create = (person: Person) => {
  store.people.push(person);
};

export const update = ({
  selected,
  first,
  last,
}: { selected: Person } & Person) => {
  store.people[selectedPersonIndex(store.people, selected)] = { first, last };
};

export const remove = ({ selected }: { selected: Person }) => {
  store.people.splice(selectedPersonIndex(store.people, selected), 1);
};
