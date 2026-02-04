import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			const basePath = import.meta.env.VITE_BASE_PATH || '';
			if (basePath) {
				return html.replace(
					'</head>',
					`<base href="${basePath}" /></head>`
				);
			}
			return html;
		}
	});
	return response;
};
