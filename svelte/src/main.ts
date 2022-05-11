import App from './App.svelte';
import {init} from 'commandbar'

init('5ba0a816');

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
