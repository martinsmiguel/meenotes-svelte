import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { glob } from 'glob';

// Encontra todos os posts para pré-renderizar
const postFiles = glob.sync('posts/*.svx');
const postEntries = postFiles.map(file => {
	const slug = file.split('/').pop()?.replace('.svx', '');
	return `/posts/${slug}`;
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false,
            strict: true
        }),
		// Lista de páginas para pré-renderizar
		prerender: {
			entries: ['/', ...postEntries]
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
