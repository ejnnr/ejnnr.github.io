import { cubicOut } from 'svelte/easing';

/**
 * A custom slide transition with constant velocity, closely based on Svelte's built-in slide.
 * Duration is proportional to the element's height.
 * Handles both 'in' and 'out' directions correctly.
 *
 * @param {Element} node The element to transition
 * @param {object} [params] Transition parameters
 * @param {number} [params.delay=0] Delay in ms
 * @param {number} [params.durationPerPixel=0.5] Duration in ms per pixel of height
 * @param {number} [params.minDuration=150] Minimum duration in ms
 * @param {Function} [params.easing=cubicOut] Easing function
 * @returns {import('svelte/transition').TransitionConfig}
 */
export function customSlide(
    node,
    { delay = 0, durationPerPixel = 0.5, minDuration = 150, easing = cubicOut } = {}
) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;

    // Use offsetHeight for reliable measurement and animation target height
    const elementHeight = node.offsetHeight;

    // Extract other box model values like Svelte's slide (assuming axis='y')
    const paddingTopValue = parseFloat(style.paddingTop);
    const paddingBottomValue = parseFloat(style.paddingBottom);
    const marginTopValue = parseFloat(style.marginTop);
    const marginBottomValue = parseFloat(style.marginBottom);
    const borderTopWidthValue = parseFloat(style.borderTopWidth);
    const borderBottomWidthValue = parseFloat(style.borderBottomWidth);

    // Calculate dynamic duration based on the measured height
    let dynamicDuration = elementHeight * durationPerPixel;
    dynamicDuration = Math.max(minDuration, dynamicDuration);

    return {
        delay,
        duration: dynamicDuration, // Our dynamic duration
        easing,
        // Mimic Svelte's slide CSS animation structure, using offsetHeight for target height
        // Svelte handles the t value inversion for 'out' transitions (1 -> 0)
        css: (t) => // t is 0->1 for 'in', 1->0 for 'out'
            'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            // Animate height using measured offsetHeight, scaled by t
            `height: ${t * elementHeight}px;` +
            // Animate padding, margin, border like Svelte's slide, scaled by t
            `padding-top: ${t * paddingTopValue}px;` +
            `padding-bottom: ${t * paddingBottomValue}px;` +
            `margin-top: ${t * marginTopValue}px;` +
            `margin-bottom: ${t * marginBottomValue}px;` +
            `border-top-width: ${t * borderTopWidthValue}px;` +
            `border-bottom-width: ${t * borderBottomWidthValue}px;` +
            // Add min-height: 0 like Svelte's slide
            `min-height: 0;`
    };
}
