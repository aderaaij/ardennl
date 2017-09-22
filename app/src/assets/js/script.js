import Headroom from 'headroom.js';
import slider from './partials/slider';
import './partials/Intro';

const header = document.querySelector('.m-logo');
const headroom = new Headroom(header, {
    scroller: document.querySelector('.l-intro'),
});

headroom.init();

slider();


if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('../service-worker.js').then(() => {
        console.log('CLIENT: service worker registration complete.');
    }, () => {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
    console.log('CLIENT: service worker is not supported.');
}
