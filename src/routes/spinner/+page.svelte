<script lang="ts">
	import { onMount} from 'svelte'
	import ButtonSpinner from './ButtonSpinner.svelte';
	// import { getSpinner } from './ButtonSpinner.svelte'

	let B:typeof ButtonSpinner
	let spinner
	let btnDelete: HTMLButtonElement;
	let caption = 'Create Todo';
	let loading = false;
	let hidden = false;
	let color = 'skyblue';
	const colors = ['pink','rgb(200,1,1)','rgba(0,0,210,0.5)','#0000aacc','rebeccapurple','hsl(158, 64%, 42%)','green'];
	const toggleVisible = () => {
		// hidden = !hidden    // this work as well
		btnDelete.style.display = btnDelete.style.display === 'none' ? 'block' : 'none';
	};
	const toggleLoading = () => {
		loading = !loading;
	};
	const toggleAction = () => {
		toggleLoading();
		spinner.color = spinner.color === 'red' ? 'black' : 'red';
		// btnDelete.style.width = btnDelete.style.width==='12rem'? '10rem':'12rem'
		spinner.caption = spinner.caption === 'Create Todo' ? 'Creating...' : 'Create Todo';
		const btn = document.querySelector('#action') as HTMLButtonElement;
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
		console.log('data', event.dataTransfer);
		(event.target as HTMLInputElement).value = color = document.getElementById(id)
			?.innerText as string;

		toggleAction();
		setTimeout(() => {
			toggleAction();
		}, 2000);
	};
	const spinWithRandomColor = (event:MouseEvent) => {
		spinner.spinOn = !spinner.spinOn
		spinner.caption = spinner.caption === 'button' ? 'spinning...' : 'button'
		if (event.type === 'mouseleave') return;
		const rgb = [1,2,3].reduce(acc => acc + `${Math.floor(Math.random()*1000)%255},`, 'rgb(').slice(0,-2)+')';
		color = rgb;
	}
	onMount(()=>{
		 spinner = B.getSpinner()
	})
</script>

<svelte:head>
	<title>Button Spinner</title>
</svelte:head>
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
		-- drag and drop yellow color def into input box to start collored spinner for 2 seconds<br />
		{#each colors as color,ix}
			{#if ix === 4}
				<span style='display:block;margin-top:8px'></span>
			{/if}
			<span id={`c${ix+1}`} draggable={true} ondragstart={start} aria-hidden={true}>{color}</span>
		{/each}
	</p>
	<br />
	<button id="action" onclick={toggleAction}>start action</button>

	<ButtonSpinner
		bind:this={B}
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
	<div class='div-hover' onmouseenter={spinWithRandomColor} onmouseleave={spinWithRandomColor} aria-hidden={true}>
		Hover over to spin with random spinner color
	</div>
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
		border-radius:8px;
		border: 1px solid yellow;
	}
	.div-hover {
		width: max-content;
		padding: 3px 2rem;
		background-color: cornsilk;
		margin-top:1rem;
	}
</style>
