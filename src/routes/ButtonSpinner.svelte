<!--
@component
	ButtonSpinner wraps an HTMLButtonObject named button, so it could be bound to a parent variable say
			let btnCreate:HTMLButtonElement
			<ButtonSpinner bind:button={btnCreate} ...><ButtonSpinner>
  and it is the ony way to get reference to embedded button.
  There is no way for now to get reference via document.querySelector('ButtonSpinner')
  or document.getElementsByTagName('ButtonSpinner')[0]

	Component features a 3/4 circle skyblue spinner. In order to start and stop spinning we ser its spinOn
	property that should be bound to a parent boolean variable, e.g. 
			let loading:boolean = false (not a $state rune)
	Spin starts when variable loading is set to true and stops when it is set to false
	Mandatory props are 
		- caption     -- a button title, default is 'button'
		- spinOn      -- boolean controlling spin on/off  with loading true/false, default is false
    - button      -- a parent variable bound to internal ButtonSpinner button via parent code like
										import ButtonSpinner from '$lib/components/ButtonSpinner.svelte'
										let btnCreate:HTMLButtonElement
										let cursor:boolean           -- true sets cursor to 'pointer', false to 'not allowed'
										let loading:boolean = false  -- keep spinner idle until loading set to true
										let hidden:boolean = true    -- hidden until conditionally visible, 
																										false for initially visible buttons like Update Todo
																										All buttons should be visible only when applicable.
										Property formaction is defined for SvelteKIt enhance with URL actions like
										'?/createTodo', '?/updateTodo', '?'deleteTodo'. '?/toggleTodoCompleted',...
										so formaction='?/createTodo' would submit form data to createTodo action in 
										+page.server.ts file:
											export const actions: Actions = {
												createTodo: async ({ request }) => { ...
										Property cursor is optional and is used to warn user for action not allowed
										Most of settings are done in markup like via ButtonSpinner attributes like:
												<ButtonSpinner 
													bind:button={btnCreate} 
													caption='Create Todo' 
													spinOn={loading}
													hidden={hidden}
													/* optional */
													cursor={cursor}   		/* default is true (pointer) false for 'not allowed'
													width='6rem'      		/* max-content + padding='4px 1.5rem  -- default, */
																								/* or other values iin units like px */
													height='2rem'     		/* default, but could be specified in values of other units e,g, px */
													top='0'				    		/* adjust position:absolute of spinner to get along with button's hight */
													color='skyblue'   		/= but could be rgba, hsa or #xxxxxx forma as well */
													spinnerSize='1.3rem'	/* spinner circle diameter, default is 1em but could be different */
													duration='3s'     		/* duration in seconds for one RPM, default is 1.5s */
												>
												</ButtonSpinner>
										Properties could be set dynamically by importing class instance Spinner that holds static getters and setters
										that control ButtonSpinner behavior:
										  import Spinner from '$lib/components/Spinner.svelte';		// class instance holding attribute defaults
										if spinOn is set via attribute <ButtonSpinner spinOn={loading} .../> then spin control is done as
										  loading = true;			// start spinning
											loading = false;    // stop spinning
										or, as default is false it could be controlled via instance setter:
										  Spinner.spinOn = true;  // start spinning
											Spinner.spinOn = false;  // stop spinning
										All attributes could be controlled via Spinner instance getters and setters:
-->

<script module lang="ts">
	let button: HTMLButtonElement; // just to avoid constructor's complain
	class SpinnerSetter {
		private _caption = $state<string>('');
		private _button = $state<HTMLButtonElement>();
		private _formaction = $state<string>('');
		private _spinOn = $state<boolean>(false);
		private _hidden = $state<boolean>(false);
		private _disabled = $state<boolean>(false);
		private _cursor = $state<boolean>(false);
		private _color = $state<string>('');
		private _duration = $state<string>('');
		private _size = $state<string>('');
		private _top = $state<string>('');
		private _width = $state<string>('');
		private _height = $state<string>('');

		get caption() {
			return this._caption;
		}
		set caption(value: string) {
			this._caption = value;
		}
		get button() {
			return this._button ?? button;
		}
		set button(value: HTMLButtonElement) {
			this._button = value;
		}
		get formaction() {
			return this._formaction;
		}
		set formaction(value: string) {
			this._formaction = value;
		}
		get spinOn() {
			return this._spinOn;
		}
		set spinOn(value: boolean) {
			this._spinOn = value;
		}
		get hidden() {
			return this._hidden;
		}
		set hidden(value: boolean) {
			this._hidden = value;
		}
		get disabled() {
			return this._disabled;
		}
		set disabled(value: boolean) {
			this._disabled = value;
		}
		get cursor() {
			return this._cursor;
		}
		set cursor(value: boolean) {
			this._cursor = value;
		}
		get color() {
			return this._color;
		}
		set color(value: string) {
			this._color = value;
		}
		get duration() {
			return this._duration;
		}
		set duration(value: string) {
			this._duration = value;
		}
		get size() {
			return this._size;
		}
		set size(value: string) {
			this._size = value;
		}
		get top() {
			return this._top;
		}
		set top(value: string) {
			this._top = value;
		}
		get width() {
			return this._width;
		}
		set width(value: string) {
			this._width = value;
		}
		get height() {
			return this._height;
		}
		set height(value: string) {
			this._height = value;
		}

		constructor(
			caption: string,
			button?: HTMLButtonElement,
			formaction: string = '?/create',
			spinOn: boolean = false,
			hidden: boolean = true,
			disabled: boolean = false,
			cursor: boolean = false,
			color: string = 'skyblue',
			duration: string = '1.5s',
			size: string = '1em',
			top: string = '0',
			width: string = 'max-content',
			height: string = '2rem'
		) {
			this._caption = caption;
			this._button = button;
			this._formaction = formaction;
			this._spinOn = spinOn;
			this._hidden = hidden;
			this._disabled = disabled;
			this._cursor = cursor;
			this._color = color;
			this._duration = duration;
			this._size = size;
			this._top = top;
			this._width = width;
			this._height = height;
		}
	}
	export const Spinner = new SpinnerSetter('button');
</script>

<!--
@component
	ButtonSpinner wraps an HTMLButtonElement named button, so it could be bound to a parent variable say:
    let btnCreate:HTMLButtonElement
    <ButtonSpinner bind:button={btnCreate} ...><ButtonSpinner>
  and it is the only way to get reference to the embedded button.
  There is no way for now to get reference via document.querySelector('ButtonSpinner')
  or document.getElementsByTagName('ButtonSpinner')[0].

	Component features a 3/4 circle skyblue spinner. In order to start and stop spinning its spinOn
	property should be bound to a parent's boolean variable, e.g. 
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
		spinOn = Spinner.spinOn,
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
		{#if spinOn || Spinner.spinOn}
			<!-- NOTE: must have ancestor with position relative to get proper position -->
			{@render spinner(color)}
		{/if}
		{Spinner.caption ?? caption}
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
