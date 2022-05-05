<script setup lang="ts">
import { RouterView } from "vue-router";
import { init } from "commandbar";
import router from "./router";

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
    name: "Fop",
    text: "Fop",
    category: "Navigation",
    template: { type: "link", value: "/fop", operation: "router" },
  });
});
</script>

<template>
  <RouterView />
</template>
