<script lang="ts">
	import { onMount } from 'svelte';
	import ButtonSpinner from './ButtonSpinner.svelte';

	let buttonSpinner: ReturnType<typeof ButtonSpinner>;

	let spinner: ReturnType<typeof buttonSpinner.getSpinner>;
	let btnDelete: HTMLButtonElement;

	let var_color = 'skyblue';

	const colors = [
		['pink', 'Dragana'],
		['rgb(200,1,1)', 'Zeljko'],
		['rgba(0,0,210,0.5)', 'Filip'],
		['#0000aacc', 'Matia'],
		['hsl(138, 60%, 35%)', 'Mia'],
		['rebeccapurple', 'Marko'],
		['hsl(64, 68%, 40%)', 'Nikola'],
		['green', 'Bojana'],
		['red', 'Jovana'],
		['orange', 'Milica']
	];
	const toggleVisible = () => {
		spinner.hidden = !spinner.hidden;
	};
	const toggleLoading = () => {
		spinner.spinOn = !spinner.spinOn;
	};
	const toggleAction = () => {
		toggleLoading();

		btnDelete.style.color = spinner.spinOn ? 'red' : 'black';
		spinner.width = spinner.width === '10rem' ? '15rem' : '10rem';
		spinner.caption = spinner.spinOn ? 'Creating...' : 'Create Todo';
		const btn = document.querySelector('#action') as HTMLButtonElement;
		btn.innerText = spinner.spinOn ? 'stop action' : 'start action';
	};

	// Drag and Drop functionality.
	// User starts dragging from an element having an id attribute
	const start = (event: DragEvent) => {
		event.dataTransfer?.setData('text', (event.target as HTMLSpanElement).id);
	};

	// this is only visual indicator that element with attribute ondragover={allowDrop}
	// allows dropping when dragging over it
	const allowDrop = (event: DragEvent) => {
		event.preventDefault();
	};
	let fromUser: string; // drag  source holds username to show when dropped
	// element having the above attribute and ondrop={drop} is where the dragged element could be dropped
	// drop will deliver only id attribute of the source element, so the drop function have to get
	// source HTMLElement by id and take some content like innerText or datastore content
	const drop = (event: DragEvent) => {
		event.preventDefault();
		const id = event.dataTransfer?.getData('text') as string;
		if (!id) return;
		const el = document.getElementById(id);
		if (!el) return;
		fromUser = `from ${el.dataset.username}`;
		var_color = el?.innerText as string;
		(event.target as HTMLInputElement).value = var_color;
		spinner.color = var_color;

		toggleAction();
		setTimeout(() => {
			toggleAction();
		}, 2000);
	};
	const spinWithRandomColor = (event: MouseEvent) => {
		spinner.spinOn = event.type === 'mouseenter';
		spinner.caption = spinner.caption === 'button' ? 'spinning...' : 'button';
		if (event.type === 'mouseleave') return;
		const rgb =
			[1, 2, 3]
				.reduce((acc) => acc + `${Math.floor(Math.random() * 1000) % 255},`, 'rgb(')
				.slice(0, -2) + ')';
		spinner.color = rgb;
	};
	const cursorNotAllowed = () => {
		spinner.cursor = !spinner.cursor;
		spinner.width = spinner.width === '11rem' ? '20rem' : '11rem';
		spinner.height = spinner.height === '2rem' ? '3rem' : '2rem';

		// spinner.caption = 'newly created button';
		// spinner.button = btnDelete;
		// spinner.formaction = '?/createTodo';
		// spinner.spinOn = true;
		// spinner.hidden = true;
		// spinner.disabled = true;
		// spinner.cursor = true;
		// spinner.color = 'magenta';
		// spinner.duration = '2s';
		// spinner.size = '2em';
		// spinner.top = '10px';
		// spinner.width = '14rem';
		// spinner.height = '4rem';
		// got what we wrote
		// createTodo true true true true magenta 2s 2em 10px 14rem 4rem
		// console.log(
		// 	spinner.caption,
		// 	spinner.button,
		// 	spinner.formaction,
		// 	spinner.spinOn,
		// 	spinner.hidden,
		// 	spinner.disabled,
		// 	spinner.cursor,
		// 	spinner.color,
		// 	spinner.duration,
		// 	spinner.size,
		// 	spinner.top,
		// 	spinner.width,
		// 	spinner.height
		// );
	};

	onMount(() => {
		// get reference to SpinnerSetter instance
		spinner = buttonSpinner.getSpinner();
		btnDelete.addEventListener('mouseenter', spinWithRandomColor);
		btnDelete.addEventListener('mouseleave', spinWithRandomColor);
	});
</script>

<svelte:head>
	<title>Button Spinner</title>
</svelte:head>
<a href="/permissions">Permissions</a><br />
<pre>
	Use input box below to enter color in any valid format. Change the spinner and/or
	ButtonSpinner color to indicate different operations (e.g. red for deleting...)
	or to indicate long running processes.
</pre>

<div class="container">
	<button onclick={toggleVisible}>toggle visible</button>
	<br />
	<!-- 
    To handle the drag flow, you need some kind of source element (where the drag starts), 
    the data payload (the thing being dragged), and a target (an area to catch the drop). 
  -->
	Spinner color {fromUser}
	<input
		id="color_input"
		type="text"
		bind:value={var_color}
		placeholder="enter color"
		ondrop={drop}
		ondragover={allowDrop}
	/>
	<div style="margin:0;padding:0;">
		<p>-- drag and drop yellow color def into input box to start colored spinner for 2 seconds</p>
		{#each colors as color, ix}
			{#if ix === 5}
				<span style="display:block;margin-top:8px"></span>
			{/if}
			<span
				id={`c${ix + 1}`}
				draggable={true}
				ondragstart={start}
				aria-hidden={true}
				data-username={color[1]}>{color[0]}</span
			>
		{/each}
	</div>
	<br />
	<button id="action" onclick={toggleAction}>start action</button>

	<ButtonSpinner
		bind:this={buttonSpinner}
		bind:button={btnDelete}
		caption="new_button"
		formaction="?/createTodo"
		spinOn={false}
		hidden={false}
		disabled={false}
		cursor={true}
		color="tomato"
		duration="2s"
		size="1em"
		top="0"
		width="11rem"
		height="3rem"
	></ButtonSpinner>
	<pre class="div-hover" onclick={cursorNotAllowed} aria-hidden={true}>
		click to toggle cursor to 'not-allowed' and then hover over 
		above button to observe cursor is now {spinner?.cursor ? 'default' : 'not-allowed'}
	</pre>
	<div
		class="div-hover"
		onmouseenter={spinWithRandomColor}
		onmouseleave={spinWithRandomColor}
		aria-hidden={true}
	>
		Hover over to spin with random spinner color
	</div>
</div>

<style>
	pre {
		color: hsl(158, 64%, 42%);
	}
	.container {
		margin-left: 2rem;
		color: lightgreen;
	}
	button {
		margin: 1rem 0;
		padding: 5px 1rem;
	}
	input[type='text'] {
		padding: 3px 0 5px 1rem;
		font-size: 18px;
	}
	span[id^='c'] {
		cursor: pointer;
		display: inline-block;
		width: max-content;
		padding: 1px 0.5rem 6px 0.5rem;
		height: 20px;
		background-color: cornsilk;
		margin-right: 10px;
		border-radius: 8px;
		border: 1px solid yellow;
		color: black;
		line-height: 22px;
	}
	.div-hover {
		width: max-content;
		padding: 3px 2rem;
		background-color: cornsilk;
		margin-top: 1rem;
		cursor: default;
		/* color:hsl(64, 68%, 40%) */
	}
</style>
