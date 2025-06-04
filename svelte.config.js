import { mdsvex } from 'mdsvex';
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from 'remark-math';
import relativeImages from 'mdsvex-relative-images';
import remarkFootnotes from 'remark-footnotes';

const config = {
	preprocess: [mdsvex({
		remarkPlugins: [
			remarkMath,
			relativeImages,
			remarkFootnotes,
		],
		rehypePlugins: [
			rehypeKatexSvelte,
		],
		extensions: ['.md', '.svx'],
		layout: {
			post: './src/lib/_post-layout.svelte'
		}
	})],
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
