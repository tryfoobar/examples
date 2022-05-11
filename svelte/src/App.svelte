<script lang="ts">
  import { onMount } from "svelte";
  import { navigate, Router, Link, Route } from "svelte-routing";
  import Foo from "./Foo.svelte";

  export let url = "";

  interface Person {
    first: string;
    last: string;
  }

  onMount(() => {
    window.CommandBar.boot("me").then(() => {
      window.CommandBar.addRouter(navigate);

      window.CommandBar.addCommand({
        name: "home",
        text: "Go to Home",
        category: "Navigation",
        icon: "https://openmoji.org/data/color/svg/E269.svg",
        template: { type: "link", value: "/", operation: "router" },
        availability_rules: [
          {
            type: "url",
            operator: "isNot",
            value: "/",
          },
        ],
      });
      window.CommandBar.addCommand({
        name: "foo",
        text: "Go to Foo",
        category: "Navigation",
        icon: "https://openmoji.org/data/color/svg/E269.svg",
        template: { type: "link", value: "/foo", operation: "router" },
        availability_rules: [
          {
            type: "url",
            operator: "isNot",
            value: "/foo",
          },
        ],
      });

      window.CommandBar.addContext(
        "people",
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
      window.CommandBar.addCallback("create", create);
      window.CommandBar.addCallback("update", update);
      window.CommandBar.addCallback("remove", remove);
      window.CommandBar.addCommand({
        name: "create",
        text: "Add a person",
        category: "CRUD",
        icon: "https://openmoji.org/data/color/svg/E268.svg",
        template: { type: "callback", value: "create" },
        arguments: {
          first: { order_key: 0, value: "text", type: "provided" },
          last: { order_key: 1, value: "text", type: "provided" },
        },
      });
      window.CommandBar.addCommand({
        name: "update",
        text: "Update a person",
        category: "CRUD",
        icon: "https://openmoji.org/data/color/svg/E25D.svg",
        template: { type: "callback", value: "update" },
        arguments: {
          selected: {
            order_key: 0,
            value: "people",
            type: "context",
            label: "Person to update",
          },
          first: {
            order_key: 1,
            value: "text",
            type: "provided",
            label: "New first name",
          },
          last: {
            order_key: 2,
            value: "text",
            type: "provided",
            label: "New last name",
          },
        },
      });

      window.CommandBar.addCommand({
        name: "remove",
        text: "Remove a person",
        category: "CRUD",
        icon: "https://openmoji.org/data/color/svg/E262.svg",
        template: { type: "callback", value: "remove" },
        arguments: {
          selected: {
            order_key: 0,
            value: "people",
            type: "context",
            label: "Person to update",
          },
        },
      });
    });

    return window.CommandBar.shutdown;
  });

  let people = [
    { first: "Hans", last: "Emil" },
    { first: "Max", last: "Mustermann" },
    { first: "Roman", last: "Tisch" },
  ];

  let prefix = "";
  let first = "";
  let last = "";
  let i = 0;

  $: filteredPeople = prefix
    ? people.filter((person) => {
        const name = `${person.last}, ${person.first}`;
        return name.toLowerCase().startsWith(prefix.toLowerCase());
      })
    : people;

  $: selected = filteredPeople[i];

  $: reset_inputs(selected);

  function create({
    first: _first,
    last: _last,
  }: {
    first: string;
    last: string;
  }) {
    people = people.concat({ first: _first, last: _last });
    i = people.length - 1;
    first = last = "";
  }

  const selectedPersonIndex = (_selected: Person) =>
    people.findIndex(
      (person) =>
        person.first === _selected.first && person.last === _selected.last
    );

  function update({
    selected: _selected,
    first: _first,
    last: _last,
  }: {
    selected: Person;
    first: string;
    last: string;
  }) {
    const index = selectedPersonIndex(_selected);
    people[index] = { first: _first, last: _last };
  }

  function remove({ selected: _selected }: { selected: Person }) {
    const index = selectedPersonIndex(_selected);
    people = [...people.slice(0, index), ...people.slice(index + 1)];

    first = last = "";
    i = Math.min(i, filteredPeople.length - 2);
  }

  function reset_inputs(person: { first: string; last: string }) {
    first = person ? person.first : "";
    last = person ? person.last : "";
  }
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="foo">Foo</Link>
  </nav>
  <main>
    <Route path="foo" component={Foo} />
    <Route path="/">
      <input placeholder="filter prefix" bind:value={prefix} />

      <select bind:value={i} size={5}>
        {#each filteredPeople as person, i}
          <option value={i}>{person.last}, {person.first}</option>
        {/each}
      </select>

      <label><input bind:value={first} placeholder="first" /></label>
      <label><input bind:value={last} placeholder="last" /></label>

      <div class="buttons">
        <button
          on:click={() => {
            create({ first, last });
          }}
          disabled={!first || !last}>create</button
        >
        <button
          on:click={() => {
            update({ selected, first, last });
          }}
          disabled={!first || !last || !selected}>update</button
        >
        <button
          on:click={() => {
            remove({ selected });
          }}
          disabled={!selected}>delete</button
        >
      </div>
    </Route>
  </main>
</Router>

<style>
  * {
    font-family: inherit;
    font-size: inherit;
  }

  input {
    display: block;
    margin: 0 0 0.5em 0;
  }

  select {
    float: left;
    margin: 0 1em 1em 0;
    width: 14em;
  }

  .buttons {
    clear: both;
  }
</style>
