import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { glob } from 'glob';

const postFiles = glob.sync('posts/*.svx');
const postEntries = postFiles.map(file => {
	const slug = file.split('/').pop()?.replace('.svx', '');
	return `/posts/${slug}`;
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: '/meenotes-svelte'
		},
		adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false,
            strict: true
        }),
		prerender: {
			entries: ['/', ...postEntries]
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
