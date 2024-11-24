<!--
@component
	ButtonSpinner wraps an HTMLButtonElement named button, so it could be bound to a parent variable say:
    let btnCreate:HTMLButtonElement
    <ButtonSpinner bind:button={btnCreate} ...><ButtonSpinner>
  and it is the only way to get reference to the embedded button.
  There is no way for now to get reference via document.querySelector('ButtonSpinner')
  or document.getElementsByTagName('ButtonSpinner')[0].

	Component <script lang='ts'> blocks cannot export a variable (except modules <script module lang='ts'>)
	but could export functions that return a variable -- so this component exports getSpinner function
	so parent component can get an instance of class SpinnerSetter like so
		import { onMount } from 'svelte'
		import SpinnerButton from 'usually $lib/components/Button.setter.svelte' 
		let B:typeof ButtonSpinner
		let spinner:any
	As B holds getSpinner function the instance of SpinnerSetter is usually got from onMount
		onMount(()=> {
			spinner = B.getSpinner()
		})
	The spinner exposes all the attributes that ButtonSpinner can accept from HTML markup, like
		<ButtonSpinner bind:button={btnCreate} caption='Create Todo' hidden={false} bind:color={color} ...>


	Every attribute could be bound to sibling parent variable, like color above
		let color = 'skyblue'     // with or without default value, 'skyblue' in this case
	and the variable could be changed dynamically having impact on <ButtonSpinner> component, except
	for color variable if spinner is all at the time.



	Component features a 3/4 circle skyblue spinner. In order to start and stop spinning its spinOn
	property could be set should be bound to a parent's boolean variable, e.g. 
    let loading:boolean = false; (not a $state rune)
	Spin starts when loading variable is set to true and stops when it is turn to false.
	Mandatory props are 
		- caption     -- a button title
    - spinOn      -- boolean controlling spin on/off  with loading true/false
    - button      -- a parent variable bound to internal ButtonSpinner button via parent code like
        import ButtonSpinner from '$lib/components/ButtonSpinner.svelte'
        let btnCreate:HTMLButtonElement
        let cursor:boolean           -- true set it to 'pointer', false to 'not allowed'
        let loading:boolean = false  -- keep spinner idle until loading = true
        let hidden:boolean  = true   -- hidden until conditionally visible, 
                                        false for initially visible buttons like Create Todo
                                        All buttons should be visible only when applicable
        Property formaction is defined for SvelteKIt form enhance with URL actions like
        '?/createTodo', '?/updateTodo', '?'deleteTodo'. '?/toggleTodoCompleted',... so the
        formaction='?/createTodo' would submit form's data to action createTodo in +page.server.ts
          export const actions: Actions = {
            createTodo: async ({ request }) => { 
            ...
        Property cursor is optional and is used to warn user for action not allowed
        <ButtonSpinner 
            bind:button={btnCreate} 
            caption='Create Todo' 
            spinOn={loading}
            hidden={hidden}
            /* optional */
            cursor={cursor}   /* default is true (pointer) false for 'not allowed'
            width='6rem'      /* max-content + padding='4px 1.5rem  -- default, */
                              /* or other values iin units like px */
            height='2rem'     /* default, but could be specified in values of other units e,g, px */
            top='0'				    /* adjust position:absolute of spinner to get along with button's hight */
            color='skyblue'   /= but could be rgba, hsa or #xxxxxx forma as well */
            size='1.3rem'     /* spinner circle diameter, default is 1em but could be different */
            duration='3s'     /* duration in seconds for one RPM, default is 1.5s */
        >
        </ButtonSpinner>
-->
<script lang="ts">
	import { onMount } from 'svelte';

	const setTK = <T, K extends keyof T>(obj: T, property: K, val: T[K]): void => {
		obj[property] = val;
		// if ('color|size|width|height'.includes(property as string)) {
		// 	// @ts-expect-error
		// 	obj.style[property] = val;
		// }
		// // else if ('hidden'){
		// //       obj.style.display = (val ? 'block':'none');
		// //   }
		// else if (property === 'cursor') {
		// 	(obj as HTMLElement).style.cursor = val ? 'default' : 'not-allowed';
		// } else {
		// 	obj[property] = val;
		// }
	};

	// Generic Accessor get attribute value on an instance of type T
	function getTK<T, K extends keyof T>(obj: T, property: K): T[K] {
		return obj[property];
	}

	class SpinnerSetter {
		caption = $state<string>('');
		button = $state<HTMLButtonElement>();
		formaction = $state<string>('');
		spinOn = $state<boolean>(false);
		hidden = $state<boolean>(false);
		disabled = $state<boolean>(false);
		cursor = $state<boolean>(false);
		color = $state<string>('');
		duration = '';
		size = '';
		top = '';
		width = $state<string>('');
		height = $state<string>('');

		get = (prop: string) => {
			return getTK(spinner, prop);
		};
		set = (prop: string, val: any) => {
			setTK(spinner, prop, val);
		};

		constructor(
			caption: string,
			button?: HTMLButtonElement,
			formaction: string = '?/create',
			spinOn: boolean = false,
			hidden: boolean = false,
			disabled: boolean = false,
			cursor: boolean = false,
			color: string = 'skyblue',
			duration: string = '1.5s',
			size: string = '1em',
			top: string = '0',
			width: string = '11rem',
			height: string = '2rem'
		) {
			this.caption = caption;
			this.button = button;
			this.formaction = formaction;
			this.spinOn = spinOn;
			this.hidden = hidden;
			this.disabled = disabled;
			this.cursor = cursor;
			this.color = color;
			this.duration = duration;
			this.size = size;
			this.top = top;
			this.width = width;
			this.height = height;
		}
	}
	const spinner = new SpinnerSetter('button');
	export const getSpinner = () => {
		return spinner;
	};
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
		formaction,
		spinOn = $bindable(spinner.spinOn),
		hidden = $bindable(spinner.hidden),
		disabled = $bindable(false),
		cursor = $bindable(true),
		color = $bindable(`skyblue`),
		duration = `1.5s`,
		size = `1em`,
		top = `0`,
		width = 'max-content',
		height = '2rem'
	}: ButtonSpinner = $props();

	onMount(() => {
		let width = 'width';
		// button.style[width] = '14rem'
		console.log(button.style);
	});
</script>

{#snippet _spinner(color: string)}
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
		style:display={spinner.hidden ? 'none' : 'block'}
		{formaction}
		{disabled}
		style:cursor={cursor ? 'pointer' : 'not-allowed'}
		style:width
		style:height
		style:padding="4px 1.5rem"
	>
		{#if spinOn || spinner.spinOn}
			<!-- NOTE: must have ancestor with position relative to get proper position -->
			{@render _spinner(color)}
		{/if}
		{spinner.caption ?? caption}
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
