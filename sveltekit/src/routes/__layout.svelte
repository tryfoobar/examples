<script lang="ts">
	import { onMount } from 'svelte';
	import { init } from 'commandbar';
	import { goto } from '$app/navigation';

	onMount(() => {
		// we only want CommandBar to init if it hasdn't already
		if (!window.CommandBar) {
			init('5ba0a816');

			// @ts-expect-error CommandBar is on the window after init
			window.CommandBar.boot('me').then(() => {
				window.CommandBar.addRouter(goto);
				window.CommandBar.addCommand({
					name: 'Home',
					text: 'Home',
					category: 'Navigation',
					template: { type: 'link', value: '/', operation: 'router' }
				});
				window.CommandBar.addCommand({
					name: 'Fop',
					text: 'Fop',
					category: 'Navigation',
					template: { type: 'link', value: '/fop', operation: 'router' }
				});
			});
		}

		return window.CommandBar.shutdown;
	});
</script>

<slot />
