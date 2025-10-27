/**
 * Class representing an animation controller for DOM elements
 * @class
 */
export class Animation {
    /**
     * Creates an instance of Animation
     * @param {(string|HTMLElement)} target - CSS selector or DOM element to animate
     * @throws {Error} When target element is not found
     */
    constructor(target) {
        this.target = typeof target === 'string' ? document.querySelector(target) : target;
        if (!this.target) {
            throw new Error('Target element not found');
        }
    }

    /**
     * Fades in the target element
     * @param {Object} settings - Animation settings
     * @param {number} [settings.duration=1000] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @returns {Object} Assistant object with help method
     */
    fadeIn(settings = { duration: 1000, easing: 'linear', delay: 0 }) {
        const { duration, easing, delay } = settings;
        this.target.style.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
        this.target.style.opacity = 1;
    }

    /**
     * Fades out the target element
     * @param {Object} settings - Animation settings
     * @param {number} [settings.duration=1000] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @returns {Object} Assistant object with help method
     */
    fadeOut(settings = { duration: 1000, easing: 'linear', delay: 0 }) {
        const { duration, easing, delay } = settings;
        this.target.style.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
        this.target.style.opacity = 0;
    }

    /**
     * Moves the target element to a new position
     * @param {Object} settings - Animation settings
     * @param {number} [settings.x=0] - Horizontal translation in pixels
     * @param {number} [settings.y=0] - Vertical translation in pixels
     * @param {number} [settings.duration=1000] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @returns {Object} Assistant object with help method
     */
    move(settings = { x: 0, y: 0, duration: 1000, easing: 'linear', delay: 0 }) {
        const { x, y, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `translate(${x}px, ${y}px)`;
    }

    /**
     * Rotates the target element
     * @param {Object} settings - Animation settings
     * @param {number} [settings.angle=0] - Rotation angle in degrees
     * @param {number} [settings.duration=1000] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @returns {Object} Assistant object with help method
     */
    rotate(settings = { angle: 0, duration: 1000, easing: 'linear', delay: 0 }) {
        const { angle, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `rotate(${angle}deg)`;
    }

    /**
     * Scales the target element
     * @param {Object} settings - Animation settings
     * @param {number} [settings.scaleX=1] - Horizontal scale factor
     * @param {number} [settings.scaleY=1] - Vertical scale factor
     * @param {number} [settings.duration=1000] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @returns {Object} Assistant object with help method
     */
    scale(settings = { scaleX: 1, scaleY: 1, duration: 1000, easing: 'linear', delay: 0 }) {
        const { scaleX, scaleY, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `scale(${scaleX}, ${scaleY})`;
    }

    /**
     * Applies a shaking effect to the target element
     * @param {Object} settings - Animation settings
     * @param {number} [settings.amplifier=10] - Maximum shake distance in pixels
     * @param {number} [settings.frequency=100] - Time between shakes in milliseconds
     * @param {number} [settings.duration=500] - Total duration of shake effect
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @returns {Object} Controller object with help method
     */
    shake(settings = { amplifier: 10, frequency: 100, duration: 500, easing: 'linear', delay: 0 }) {
        const { amplifier, frequency, duration, easing, delay } = settings;

        // Loop to create shake effect with random positions
        for (let elapsed = 0; elapsed < duration; elapsed += frequency) {
            setTimeout(() => {
                const offsetX = (Math.random() * 2 - 1) * amplifier;
                const offsetY = (Math.random() * 2 - 1) * amplifier;
                this.target.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }, elapsed + delay);
        }

        // Reset position after shaking
        setTimeout(() => {
            this.target.style.transform = 'translate(0, 0)';
        }, duration + delay);
    }

    /**
     * Applies a pulse (scale up and down) effect to the target element
     * @param {Object} settings - Animation settings
     * @param {number} [settings.scaleX=1.1] - Maximum horizontal scale factor
     * @param {number} [settings.scaleY=1.1] - Maximum vertical scale factor
     * @param {number} [settings.duration=500] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     */
    pulse(settings = { scaleX: 1.1, scaleY: 1.1, duration: 500, easing: 'linear', delay: 0 }) {
        const { scaleX, scaleY, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `scale(${scaleX}, ${scaleY})`;

        // Return to original scale
        setTimeout(() => {
            this.target.style.transform = 'scale(1, 1)';
        }, duration + delay);
    }

    // More animation methods to be added exactly here...

    /**
     * Applies custom keyframe animations to the target element
     * @param {(Object|Array)} frames - Keyframe definitions as object or array
     * @param {Object} settings - Animation settings
     * @param {number} [settings.duration=1000] - Duration of animation in milliseconds
     * @param {string} [settings.easing='linear'] - CSS easing function
     * @param {number} [settings.delay=0] - Delay before animation starts in milliseconds
     * @param {number} [settings.iterations=1] - Number of times to repeat the animation
     * @returns {Object} Assistant object with stop and help methods
     */
    customKeyFrames(frames = {}, settings = { duration: 1000, easing: 'linear', delay: 0, iterations: 1 }) {
        const { duration, easing, delay, iterations } = settings;

        // checks if frames is array or object
        let keyframes = [];

        if (Array.isArray(frames)) {
            keyframes = frames.map(f => ({ percent: Number(f.percent), action: f.styles }));
        } else {
            keyframes = Object.entries(frames).map(([k, v]) => ({ percent: Number(k), action: v }));
        }

        keyframes = keyframes.filter(f => !Number.isNaN(f.percent)).sort((a, b) => a.percent - b.percent);

        const toMs = pct => Math.round((pct / 100) * duration);
        const camel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const applyStyleString = (el, str) => {

            // accepts "key: value;" format
            str.split(';').forEach(pair => {
                const [rawProp, rawVal] = pair.split(':').map(p => p && p.trim());

                if (!rawProp || typeof rawVal === 'undefined') return;

                el.style[camel(rawProp)] = rawVal;
            });
        };

        let stopped = false;
        const timers = [];

        const scheduleIteration = (iter) => {
            kfs.forEach(kf => {
                const time = delay + toMs(kf.percent) + iter * duration;
                const t = setTimeout(() => {
                    if (stopped) return;

                    const a = kf.action;

                    if (typeof a === 'function') {
                        a.call(this);
                    } else if (typeof a === 'string') {
                        applyStyleString(this.target, a);
                    } else if (a && typeof a === 'object') {
                        Object.entries(a).forEach(([prompt, val]) => {
                            this.target.style[camel(prop)] = val;
                        });
                    }
                }, time);
                timers.push(t);
            });
        };

        for (let i = 0; i < Math.max(1, iterations); i++) scheduleIteration(i);

        const controller = {
            stop: () => {
                stopped = true;
                while (timers.length) clearTimeout(timers.pop());
            },
        }

        return controller;
    }
}

export default Animation;