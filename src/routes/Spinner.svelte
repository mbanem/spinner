<script lang="ts">
	type ButtonSpinner = {
		caption: string;
		button: HTMLButtonElement;
		formaction?: string;
		spinOn: boolean;
		hidden?: boolean;
		disabled?: boolean;
		cursor?: boolean;
		color?: string;
		duration?: string;
		size?: string;
		top?: string;
		width?: string;
		height?: string;
	};
	let {
		caption = 'button',
		button = $bindable(),
		formaction = '?/create',
		spinOn = false,
		hidden = $bindable(true),
		disabled = $bindable(false),
		cursor = $bindable(true),
		color = `skyblue`,
		duration = `1.5s`,
		size = `1em`,
		top = `0`,
		width = 'max-content',
		height = '2rem'
	}: ButtonSpinner = $props();

	export class Spinner {
		static get caption() {
			return caption;
		}
		static set caption(value: string) {
			caption = value;
		}
		static get button() {
			return button;
		}
		static set button(value: HTMLButtonElement) {
			button = value;
		}
		static get formaction() {
			return formaction;
		}
		static set formaction(value: string) {
			formaction = value;
		}
		static get spinOn() {
			return spinOn;
		}
		static set spinOn(value: boolean) {
			spinOn = value;
		}
		static get hidden() {
			return hidden;
		}
		static set hidden(value: boolean) {
			hidden = value;
		}
		static get disabled() {
			return disabled;
		}
		static set disabled(value: boolean) {
			disabled = value;
		}
		static get cursor() {
			return cursor;
		}
		static set cursor(value: boolean) {
			cursor = value;
		}
		static get color() {
			return color;
		}
		static set color(value: string) {
			color = value;
		}
		static get duration() {
			return duration;
		}
		static set duration(value: string) {
			duration = value;
		}
		static get size() {
			return size;
		}
		static set size(value: string) {
			size = value;
		}
		static get top() {
			return top;
		}
		static set top(value: string) {
			top = value;
		}
		static get width() {
			return width;
		}
		static set width(value: string) {
			width = value;
		}
		static get height() {
			return height;
		}
		static set height(value: string) {
			height = value;
		}
	}
</script>

{#snippet spinner(color: string)}
	<!-- styling for a spinner itself -->
	<div
		class="spinner"
		style:border-color="{color} transparent {color}
		{color}"
		style="--duration: {duration}"
		style:text-wrap="nowrap !important"
		style:width={size}
		style:height={size}
		style:top
	></div>
{/snippet}

<p style="position:relative;margin:0;padding:0;">
	<!-- styling for a button -->
	<button
		bind:this={button}
		type="submit"
		class:hidden
		{formaction}
		{disabled}
		style:cursor={cursor ? 'pointer' : 'not-allowed'}
		style:width
		style:height
		style:padding="4px 1.5rem"
	>
		{#if spinOn}
			<!-- NOTE: must have ancestor with position relative to static get proper position -->
			{@render spinner(color)}
		{/if}
		{caption}
	</button>
</p>

<style>
	.spinner {
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		margin: 0 4pt;
		border-width: calc(1em / 4);
		border-style: solid;
		border-radius: 50%;
		animation: var(--duration) infinite rotate;
		position: absolute;
		left: 0;
		top: 3px !important;
	}
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	.hidden {
		display: none;
	}
</style>
