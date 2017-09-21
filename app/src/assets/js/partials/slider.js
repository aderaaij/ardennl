export default function slider() {
    const images = Array.from(document.querySelectorAll('.m-background__inner'));
    const offsets = [];

    function setStage() {
        for (let i = 0; i < images.length; i++) {
            const offset = i * 100;
            offsets.push(offset);
            images[i].style.transform = `translateX(${offset}vw)`;
        }
    }

    function goTo(num) {
        for (let i = 0; i < offsets.length; i++) {
            const offset = offsets[i] - (num * 100);
            images[i].style.transform = `translateX(${offset}vw)`;
        }
    }

    setStage();

    return { goTo };
}
