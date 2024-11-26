export const setCSSValue = (varName: string, value: string) => {
	try {
		const root = document.querySelector(':root');
		if (root) {
			root.style.setProperty(varName, value);
		}
	} catch (err) {
		// $1.log('setCSSValue', err)
	}
};
