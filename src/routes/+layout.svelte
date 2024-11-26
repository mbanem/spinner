<!--
@component
-->

<script lang="ts">
	import '$styles/app.scss';
	let { children } = $props();
</script>

<div class="main">{@render children()}</div>

<style lang="scss">
	.main {
		margin: 3rem 0 0 1rem;
	}
</style>
