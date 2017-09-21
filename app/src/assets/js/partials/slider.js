import { physics, tween, css, valueTypes } from 'popmotion';

const { percent } = valueTypes;

export default function slider() {
    const sliderElement = document.querySelector('.m-slider');
    const slides = Array.from(sliderElement.querySelectorAll('.m-slider__slide'));
    const offsets = [];

    function setStage() {
        for (let i = 0; i < slides.length; i++) {
            const slideRenderer = css(slides[i]);
            const offset = i * 100;
            offsets.push(offset);
            slideRenderer.set('x', percent.transform(offset));
        }
    }

    function goTo(num, cb) {
        for (let i = 0; i < offsets.length; i++) {
            const offset = offsets[i] - (num * 100);
            const slideRenderer = css(slides[i]);
            physics({
                from: offsets[i],
                to: offset,
                velocity: 30,
                spring: 300,
                friction: 0.9,
                onUpdate: x => slideRenderer.set('x', percent.transform(x)),
                onComplete: () => {
                    console.log(cb);
                },
            }).start();
        }
    }

    function setSlide(num) {
        for (let i = 0; i < offsets.length; i++) {
            const offset = offsets[i] - (num * 100);
            const slideRenderer = css(slides[i]);
            tween({
                to: offset,
                duration: 0,
                onUpdate: x => slideRenderer.set('x', percent.transform(x)),
            }).start();
        }
    }

    setStage();

    return { setSlide, goTo };
}
