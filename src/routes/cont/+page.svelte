<script lang="ts">
	// Generic Accessor set attribute on a type T
	const setTK = <T, K extends keyof T>(obj: T, property: K, val: T[K]): void => {
		obj[property] = val;
	};
	function getTK<T, K extends keyof T>(obj: T, property: K): T[K] {
		return obj[property];
	}

	type Person = {
		name: string;
		age: number;
	};
	let person: Person = {};
	// 	name: 'Filip',
	// 	age: 18
	// };
	// console.log('person name', getTK(person, 'name'), 'person age', getTK(person, 'age'));
	// setTK(person, 'name', 'Filip Isakovic');
	// setTK(person, 'age', 19);
	class PersonTest {
		name = '';
		age = 0;
		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}
		set = (prop: string, val: any) => {
			setTK(s, prop, val);
		};
		get = (prop: string) => {
			return getTK(s, prop);
		};
	}
	const s = new PersonTest('Marko', 14);
	// s.set('name', 'Matia Isakovic');
	// s.set('age', 21);
</script>

<div class="main">
	<p>'get person name', {s.get('name')}</p>
	<p>'get person age', {s.get('age')}</p>
	{s.set('name', 'Filip Isakovic')}
	{s.set('age', 18)}
	<p>'get person age', {s.get('age')}</p>
	<p>'s.get person name', {s.get('name')}</p>
	{s.set('name', 'Matia Isakovic')}
	<p>'get person name', {s.get('name')}</p>
</div>
