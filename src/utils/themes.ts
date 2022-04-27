const theme = {
	colors: {
		primary: '#2A3740',
		secondary: 'white',
		tertiary: '#F2BC79',
		fourth: '#736E65',
	},
	fonts: {
		family: {
			primary: 'Quicksand',
			secondary: "'Roboto Condensed', sans-serif",
		},
		size: {
			bigger: '3em',
			big: '2.5em',
			medium: '1.5em',
			littleMedium: '1.2em',
			normal: '1em',
			small: '0.8em',
			smaller: '0.6em',
		},
		weight: {
			bolder: 'bolder',
			bold: 'bold',
			normal: 'normal',
			light: 'lighter',
		},
	},
	spacing: {
		big: '5em',
		medium: '3em',
		littleMedium: '2em',
		normal: '1em',
		small: '0.8em',
		smaller: '0.6em',
	},
	positioning: {
		center: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		absLeft: {
			position: 'absolute',
			left: '0',
		},
		absRight: {
			position: 'absolute',
			right: '0',
		},
	},
} as const;

export default theme;
