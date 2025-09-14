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
			[rehypeKatexSvelte, {
				// Emulate common DeclareMathOperator uses
				macros: {
					"\\argmax": "\\operatorname*{arg\\,max}",
					"\\argmin": "\\operatorname*{arg\\,min}",
					"\\E": "\\mathbb{E}",
					"\\R": "\\mathbb{R}"
				}
			}],
		],
		extensions: ['.md', '.svx'],
		layout: {
			post: './src/lib/_post-layout.svelte'
		}
	})],
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
