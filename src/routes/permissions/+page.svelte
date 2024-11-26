<script lang="ts">
	// works in vsCOde error in REPL import from './Permissions.svelte'
	// needs some plugin?!
	import { setCSSValue } from '$lib/utils/helper';
	import { hasPermission } from './Permissions.svelte';
	/* 
		we usually have value/text pairs for options but we can use 
		objects with more properties, though we still bindle pairs
		of value/text for presenting the options in a select box,
		but then, like here, we can use additional properties to set
		condition for selected option attribute, e.g. role -- to be ADMIN
	*/
	type Option = {
		id: number;
		value: string;
		role: string;
	};

	let options: Option[] = [
		{ id: 4, value: '2019', role: 'USER' },
		{ id: 3, value: '2018', role: 'USER' },
		{ id: 2, value: '2023', role: 'USER' },
		{ id: 1, value: '2016', role: 'ADMIN' }
	];

	let selected_id = $state(2);
	let selected = $derived(options.find((o) => o.role === 'ADMIN'));
	const authorId = 12345678;
	// --------------------------------------------------------------
	let firstName = $state('');
	let permission = $state('view:comments');

	type TUser = {
		id: string;
		firstName: string;
		lastName: string;
		role: string;
	};
	type Users = { name: keyof typeof users; user: TUser };
	const users = {
		matia: {
			id: '12345678',
			firstName: 'Filip',
			lastName: 'Isakovic',
			role: 'admin'
		},
		filip: {
			id: '12345678',
			firstName: 'Filip',
			lastName: 'Isakovic',
			role: 'user'
		},
		Marko: {
			id: '12345678',
			firstName: 'Marko',
			lastName: 'MIlutinovic',
			role: 'visitor'
		}
	} as const;
	const firstNameOnChange = (event: KeyboardEvent) => {
		if (event.target instanceof HTMLInputElement) {
			if (Object.keys(users).includes(event.target.value)) {
				// setCSSValue('--FIRST-NAME-BACKGROUND-COLOR', '#3e3e3e');
				firstName = event.target.value;
			} else {
				// setCSSValue('--FIRST-NAME-BACKGROUND-COLOR', 'pink');
				firstName = '';
			}
		} else {
			console.error('event.target is not an HTMLInputElement');
		}
	};
</script>

<a href="/">home</a>
<div class="wrapper">
	<div>
		<pre>
  Users are defined as:
  const users = &lcub;
		<span>matia</span>: &lcub;
			id: '1740980519',
			firstName: 'Filip',
			lastName: 'Isakovic',
			role: 'admin'
		&rcub;,
		filip: &lcub;<span>filip</span>: &lcub;
			id: '12345678',
			firstName: 'Filip',
			lastName: 'Isakovic',
			role: 'user'
		&rcub;,
    <span>Marko</span>: &lcub;
			id: '014789741',
			firstName: 'Marko',
			lastName: 'Milutinovic',
			role: 'visitor'
		&rcub;,
	} as const;
  So to access role of the first user we use:
    users[item as keyof typeof users].role
  where item is either 'filip','matia' or 'Marko' taking care of case-sensitivity

  const ROLES = &lcub;
    admin: ['view:comments', 'create:comments', 'update:comments', 'delete:comments'],
    moderator: ['view:comments', 'create:comments', 'delete:comments'],
    user: ['view:comments', 'create:comments'],
    visitor: ['view:comments']
  &rcub; as const;
  NOTE: type Users = &lcub; name: keyof typeof users; user: TUser &rcub;
  has big impact on &lt;input type="text" bind:value=&lcub;firstName&rcub; placeholder="enter firstName" /&gt;
  as <i>keyof typeof users</i> is <span>"filip" | "Marko" | "matia"</span
			> and only those strings are acceptable 
  no matter what string we enter in the input box 
		</pre>
	</div>
	<div class="container">
		<div>
			<p class="warning">Please enter first name</p>
			{#if Object.keys(users).includes(firstName)}
				<p class="answer">
					Does <span>{firstName}</span> has permission for {permission}?
					<span class="has-permission">
						{hasPermission(users[firstName as keyof typeof users], permission, authorId)}
					</span>
				</p>
			{:else}
				<p class="has-no-permission">First name does not exist in our database.</p>
			{/if}
			<input type="text" onkeyup={firstNameOnChange} placeholder="enter firstName" value="fili" />
			<input type="text" bind:value={permission} placeholder="enter permission as action:object" />

			<select bind:value={selected_id}>
				{#each options as option}
					{#if option.role === 'ADMIN'}
						<option selected={true} value={option.id}>{option.value}</option>
					{:else}
						<option value={option.id}>{option.value}</option>
					{/if}
				{/each}
			</select>
			<p>
				Selected {JSON.stringify(selected)}
			</p>
		</div>
		<pre>
	Permissions are based on case-sensitive user name and action allowed.
	On the left side there is a list of test user names, their roles and 
	allowed actions per role.
	Enter arbitrary user name and action to see it such user is allowed to 
	take the specified action.
	For users from the list and the actions allowed for thad users' role 
	the permission should be true otherwise false.
		</pre>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 3rem 0 0 3rem;
	}
	.container {
		@include container(
			'Handling Permissions -- Web Dev Simplified',
			$head-color: lightgreen,
			$background-color: #3e3e3e,
			$padding: 0.5rem
		);
		height: 10rem;
		margin: 4rem 0 0 3rem;
		padding: 1rem;
		div {
			margin-bottom: 1rem;
		}
	}
	select {
		width: max-content;
		padding: 3px 1.5rem;
		font-weight: bold;
	}
	pre {
		font-size: 16px;
		tab-size: 1rem;
		margin-top: 0;
		color: skyblue;
		padding: 0;
		margin: 0;
	}
	p {
		font-size: 16px;
		padding: 5px;
		margin: 0;
		color: lightgreen;
	}
	input {
		width: 12rem;
		background-color: var(--FIRST-NAME-BACKGROUND-COLOR);
	}
	span,
	.has-permission {
		color: yellow;
		font-size: 20px;
		line-height: 20px;
	}
	.has-no-permission {
		color: pink;
		line-height: 21px;
	}
	.warning,
	.answer {
		color: lightgreen;
		line-height: 20px;
	}
</style>
