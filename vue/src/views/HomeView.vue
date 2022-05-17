<script lang="ts" setup>
import { watch, reactive } from "vue";
import { type Person, store, create, update, remove } from "@/store";

const state = reactive({
  prefix: "",
  first: "",
  last: "",
  index: 0,
  filteredPeople: store.people,
  selected: store.people[0],
});

watch(
  () => ({ people: store.people, prefix: state.prefix }),
  ({ people, prefix }) => {
    state.filteredPeople = prefix
      ? people.filter((person) => {
          const name = `${person.last}, ${person.first}`;
          return name.toLowerCase().startsWith(prefix.toLowerCase());
        })
      : people;
  }
);

watch(
  () => ({ filteredPeople: state.filteredPeople, index: state.index }),
  ({ filteredPeople, index }) => {
    state.selected = filteredPeople[index];
  }
);

const reset_inputs = (person?: Person) => {
  state.first = person ? person.first : "";
  state.last = person ? person.last : "";
};

watch(() => state.selected, reset_inputs);
</script>

<template>
  <main>
    <input placeholder="filter prefix" v-model="state.prefix" />

    <select v-model="state.index" size="5">
      <option
        v-for="(person, i) in state.filteredPeople"
        :value="i"
        v-bind:key="i"
      >
        {{ person.last }}, {{ person.first }}
      </option>
    </select>

    <label>
      <input v-model="state.first" placeholder="first" />
    </label>
    <label>
      <input v-model="state.last" placeholder="last" />
    </label>

    <div class="buttons">
      <button
        @click="create({ first: state.first, last: state.last })"
        :disabled="!state.first || !state.last"
      >
        create
      </button>
      <button
        @click="
          update({
            selected: state.selected,
            first: state.first,
            last: state.last,
          })
        "
        :disabled="!state.first || !state.last || !state.selected"
      >
        update
      </button>
      <button
        @click="
          remove({
            selected: {
              first: state.selected.first,
              last: state.selected.last,
            },
          })
        "
        :disabled="!state.selected"
      >
        delete
      </button>
    </div>
  </main>
</template>
