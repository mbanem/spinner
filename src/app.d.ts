// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	export type TSpinnerSetter = {
		caption: string;
		button: HTMLButtonElement;
		formaction: string;
		spinOn: boolean;
		hidden: boolean;
		disabled: boolean;
		cursor: boolean;
		color: string;
		duration: string;
		size: string;
		top: string;
		width: string;
		height: string;
		get: (
			_: string
		) => string | HTMLElement | ((prop: string, val: string | boolean | HTMLElement) => void);
		set: (prop: string, val: string) => void;
	};
}

export {};
