<script setup lang="ts">
import { init } from "commandbar";
import router from "./router";
import { store, create, update, remove } from "./store";

init("5ba0a816");

window.CommandBar.boot("me").then(() => {
  window.CommandBar.addRouter(router.push);
  window.CommandBar.addCommand({
    name: "Home",
    text: "Home",
    category: "Navigation",
    template: { type: "link", value: "/", operation: "router" },
  });
  window.CommandBar.addCommand({
    name: "Foo",
    text: "Foo",
    category: "Navigation",
    template: { type: "link", value: "/foo", operation: "router" },
  });

  window.CommandBar.addContext(
    "people",
    () =>
      store.people.map(({ first, last }, id) => ({
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
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/foo">Foo</router-link>
  </nav>

  <RouterView />
</template>
