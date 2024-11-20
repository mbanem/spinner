<script lang="ts">
	import ButtonSpinner, { Spinner } from './ButtonSpinner.svelte';

	const capitalize = (str: string) => {
		const spaceUpper = (su: string) => {
			return ` ${su[1]?.toUpperCase()}`;
		};
		return str
			.toLowerCase()
			.replace(/\b[a-z](?=[a-z]{2})/g, (char) => char.toUpperCase())
			.replace(/(_\w)/, spaceUpper);
	};

	// Capitalize as a String method
	// @ts-expect-error
	String.prototype.capitalize = function () {
		// @ts-expect-error
		return capitalize(this);
	};
	let btnDelete: HTMLButtonElement;
	let caption = 'Create Todo';
	let loading = false;
	let hidden = false;
	let color = 'skyblue';

	const toggleVisible = () => {
		// hidden = !hidden    // this work as well
		btnDelete.style.display = btnDelete.style.display === 'none' ? 'block' : 'none';
	};
	const toggleLoading = () => {
		loading = !loading;
		Spinner.caption = 'New Button';
	};
	const onClick = () => {
		toggleLoading();
		btnDelete.style.color = btnDelete.style.color === 'red' ? 'black' : 'red';
		// btnDelete.style.width = btnDelete.style.width==='12rem'? '10rem':'12rem'
		caption = caption === 'Create Todo' ? 'Creating...' : 'Create Todo';
		const btn = document.querySelector('#delete_button') as HTMLButtonElement;
		btn.innerText = btn.innerText === 'start action' ? 'stop action' : 'start action';
	};

	// Drag and Drop functionality.
	// User starts dragging from an element with id
	const start = (event: DragEvent) => {
		event.dataTransfer?.setData('text', (event.target as HTMLSpanElement).id);
	};

	// element can allow dropping over it
	const allowDrop = (event: DragEvent) => {
		event.preventDefault();
	};
	const drop = (event: DragEvent) => {
		event.preventDefault();
		const id = event.dataTransfer?.getData('text') as string;
		(event.target as HTMLInputElement).value = color = document.getElementById(id)
			?.innerText as string;

		onClick();
		setTimeout(() => {
			onClick();
		}, 2000);
	};
	let captionName: string = '';
	let oldCaption: string = '';
	const setCaption = (event: MouseEvent | KeyboardEvent) => {
		const btn = event.target as HTMLButtonElement;
		if (oldCaption) {
			Spinner.caption = oldCaption;
			oldCaption = '';
			Spinner.spinOn = false;
			btn.innerText = 'set caption';
		} else {
			oldCaption = Spinner.caption;
			Spinner.caption = capitalize(captionName);
			Spinner.spinOn = true;
			btn.innerText = 'reverse';
		}
	};
</script>

<svelte:head>
	<title>Button Spinner</title>
</svelte:head>
<pre>
	Use input box below to enter color in any valid format. Change the spinner and/or ButtonSpinner 
  color if applicable for indicating different operations (e.g. red for deleting...) or to
  indicate long running processes.
</pre>
<div class="container">
	<button onclick={toggleVisible}>toggle visible</button>
	<!-- <button onclick={toggleLoading}>toggle spinner</button> -->
	<br />
	<!-- 
    To handle the drag flow, you need some kind of source element (where the drag starts), 
    the data payload (the thing being dragged), and a target (an area to catch the drop). 
  -->
	Spinner color
	<input
		id="color_input"
		type="text"
		bind:value={color}
		placeholder="enter color"
		ondrop={drop}
		ondragover={allowDrop}
	/>
	<p style="margin:0;padding:0;">
		-- drag and drop color def into input box to start spinner for 2 seconds<br />
		<span id="c1" draggable={true} ondragstart={start} aria-hidden={true}>pink</span>
		<span id="c2" draggable={true} ondragstart={start} aria-hidden={true}>rgb(200,1,1)</span>
		<span id="c3" draggable={true} ondragstart={start} aria-hidden={true}>rgba(0,0,210,0.5)</span>
		<span id="c4" draggable={true} ondragstart={start} aria-hidden={true}>#0000aacc</span>
		<span id="c5" draggable={true} ondragstart={start} aria-hidden={true}>rebeccapurple</span>
		<span id="c6" draggable={true} ondragstart={start} aria-hidden={true}>hsl(158, 64%, 42%)</span>
	</p>
	<br />
	<button id="delete_button" onclick={onClick}>start action</button>

	<ButtonSpinner
		bind:button={btnDelete}
		spinOn={loading}
		{caption}
		formaction="?/https://www.w3schools.com/tags/tag_button.asp"
		cursor={true}
		bind:hidden
		size="1.3rem"
		width="10rem"
		height="2rem"
		{color}
		top="-14px"
	></ButtonSpinner>
	<input type="text" bind:value={captionName} placeholder="Caption Name" />
	<button onclick={setCaption} disabled={!captionName}>set caption</button>
</div>

<style>
	pre {
		color: hsl(158, 64%, 42%);
	}
	.container {
		margin-left: 2rem;
	}
	button {
		margin: 1rem 0;
		padding: 5px 1rem;
		text-transform: capitalize;
	}
	input[type='text'] {
		padding: 3px 0 5px 1rem;
		font-size: 18px;
	}
	span[id^='c'] {
		cursor: pointer;
		display: inline-block;
		width: max-content;
		padding: 2px 0.5rem;
		height: 20px;
		background-color: cornsilk;
		margin-right: 10px;
	}
</style>
