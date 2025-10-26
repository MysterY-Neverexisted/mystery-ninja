/**
 * Class representing a web loader that tracks loading progress of resources.
 */

class Animation {
    constructor(target) {
        this.target = typeof target === 'string' ? document.querySelector(target) : target;
        if (!this.target) {
            throw new Error('Target element not found');
        }
    }

    fadeIn(settings = { duration: 1000, easing: 'linear', delay: 0 }) {
        const { duration, easing, delay } = settings;
        this.target.style.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
        this.target.style.opacity = 1;

        const assistent = {
            help: () => {
                console.log('The fadeIn method changes the opacity of the target element from 0 to 1.');
                console.log('Usage: fadeIn({ duration: number, easing: string, delay: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- duration: Duration of the animation in milliseconds (default: 1000)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
            }
        }

        return assistent;
    }

    fadeOut(settings = { duration: 1000, easing: 'linear', delay: 0 }) {
        const { duration, easing, delay } = settings;
        this.target.style.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
        this.target.style.opacity = 0;

        const assistent = {
            help: () => {
                console.log('The fadeOut method changes the opacity of the target element from 1 to 0.');
                console.log('Usage: fadeOut({ duration: number, easing: string, delay: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- duration: Duration of the animation in milliseconds (default: 1000)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
            }
        }

        return assistent;
    }

    move(settings = { x: 0, y: 0, duration: 1000, easing: 'linear', delay: 0 }) {
        const { x, y, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `translate(${x}px, ${y}px)`;

        const assistent = {
            help: () => {
                console.log('The move method translates the target element to a new position.');
                console.log('Usage: move({ x: number, y: number, duration: number, easing: string, delay: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- x: Horizontal distance to move in pixels (default: 0)');
                console.log('- y: Vertical distance to move in pixels (default: 0)');
                console.log('- duration: Duration of the animation in milliseconds (default: 1000)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
            }
        }

        return assistent;
    }

    rotate(settings = { angle: 0, duration: 1000, easing: 'linear', delay: 0 }) {
        const { angle, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `rotate(${angle}deg)`;

        const assistent = {
            help: () => {
                console.log('The rotate method rotates the target element by a specified angle.');
                console.log('Usage: rotate({ angle: number, duration: number, easing: string, delay: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- angle: Angle to rotate in degrees (default: 0)');
                console.log('- duration: Duration of the animation in milliseconds (default: 1000)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
            }
        }

        return assistent;
    }

    scale(settings = { scaleX: 1, scaleY: 1, duration: 1000, easing: 'linear', delay: 0 }) {
        const { scaleX, scaleY, duration, easing, delay } = settings;
        this.target.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
        this.target.style.transform = `scale(${scaleX}, ${scaleY})`;

        const assistent = {
            help: () => {
                console.log('The scale method scales the target element by specified factors.');
                console.log('Usage: scale({ scaleX: number, scaleY: number, duration: number, easing: string, delay: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- scaleX: Horizontal scaling factor (default: 1)');
                console.log('- scaleY: Vertical scaling factor (default: 1)');
                console.log('- duration: Duration of the animation in milliseconds (default: 1000)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
            }
        }

        return assistent;
    }

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

        const controller = {
            help: () => {
                console.log('The shake method applies a shaking effect to the target element.');
                console.log('Usage: shake({ amplifier: number, frequency: number, duration: number, easing: string, delay: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- amplifier: Maximum distance to shake in pixels (default: 10)');
                console.log('- frequency: Time interval between shakes in milliseconds (default: 100)');
                console.log('- duration: Total duration of the shake effect in milliseconds (default: 500)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
            }
        }

        return controller;
    }

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

        const assistent = {
            stop: () => {
                stopped = true;
                while (timers.length) clearTimeout(timers.pop());
            },
            help: () => {
                console.log('The customKeyFrames method applies custom keyframe animations to the target element.');
                console.log('Usage: customKeyFrames(frames: object|array, { duration: number, easing: string, delay: number, iterations: number })');
                console.log('\n');
                console.log('Parameters:');
                console.log('- frames: An object mapping percentages to style objects or an array of { percent, styles }');
                console.log('- duration: Total duration of one iteration in milliseconds (default: 1000)');
                console.log('- easing: Easing function for the transition (default: linear, others: ease, ease-in, ease-out, ease-in-out)');
                console.log('- delay: Delay before the animation starts in milliseconds (default: 0)');
                console.log('- iterations: Number of times to repeat the animation (default: 1)');
            }
        }

        return assistent;
    }
}

export default Animation;