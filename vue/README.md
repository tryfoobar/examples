# vue

This is the Vue version of the 7GUIs CRUD implementation with CommandBar.

The app used is a basic CRUD app based on
the [7GUIs CRUD spec](https://eugenkiss.github.io/7guis/tasks#crud) plus 1
additional route.

The app is setup so that all actions are available globally and can be 
dispatched by CommandBar. 

- `App.vue`: all CommandBar logic is located here
- `store.ts`: the app data and methods for updating state are here
- `views/HomeView.vue`: logic for manipulating and viewing app state 
- `views/FooView.vue`: a simple view to help demonstrate routing with CommandBar

## Demo

![CleanShot 2022-05-17 at 11 01 31](https://user-images.githubusercontent.com/10150898/168879979-3cd8e8d0-cc98-4673-97a9-9b82a62a73e8.gif)

## Features

- All actions can be completed in UI and CommandBar
- Everything in CommandBar is done
  with [the SDK](https://www.commandbar.com/sdk)
- A router is used to prevent page reload
- All CRUD actions can be completed from any point in the app
- 2 routes to navigate between: "/" and "/foo"

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Screenshots

<img width="913" alt="CleanShot 2022-05-17 at 10 59 14@2x" src="https://user-images.githubusercontent.com/10150898/168879502-9ce52bda-d93d-4190-a644-8eb5657f6dae.png">

## Documentation

[CommandBar Documentation](https://www.commandbar.com/docs)

[CommandBar SDK Documentation](https://www.commandbar.com/sdk)
