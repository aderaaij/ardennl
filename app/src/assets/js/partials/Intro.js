import theaterJS from 'theaterjs';
import { physics, css } from 'popmotion';
import Cookies from 'js-cookie';
import slider from './slider';
import data from '../../../data/data.json';

if (!Cookies.get('visitCheck')) {
    introScene();
} else {
    document.body.classList.add('no-js');
}

function introScene() {
    const bg = document.querySelector('.m-background');
    const icons = Array.from(document.querySelectorAll('.m-social li'));
    const scene = theaterJS({ minSpeed: 60 });
    const logo = document.querySelector('.m-logo');

    scene
        .on('type:start, erase:start', () => {
            const actor = scene.getCurrentActor();
            actor.$element.classList.add('is-typing');
            actor.$element.classList.add('is-active');
        })
        .on('type:end, erase:end', () => {
            const actor = scene.getCurrentActor();
            actor.$element.classList.remove('is-typing');
        });

    scene.addActor('arden', { accuracy: 0.7, speed: 1 });
    scene.addActor('ardenSmall', { accuracy: 0.9, speed: 1.1 });

    scene
        .addScene('ardenSmall: ')
        .addScene('arden:Hola...', 300)
        .addScene(`arden:${data.content.intro[0]}`)
        .addScene((done) => {
            bg.classList.add('is-active');
            document.querySelector('span').style.color = '#fff';
            setTimeout(() => {
                document.querySelector('span').style.color = '#000';
                bg.classList.add('is-shrunken');
                physics({
                    from: -200,
                    to: 0,
                    velocity: 80,
                    spring: 300,
                    friction: 0.8,
                    onUpdate: x => css(logo).set('x', x),
                }).start();
            }, 900);
            setTimeout(() => {
                done();
            }, 1300);
        })
        .addScene(data.content.intro[1])
        .addScene(data.content.intro[2])
        .addScene((done) => {
            setTimeout(() => {
                bg.classList.remove('is-shrunken');
                slider().goTo(1);
                document.querySelector('.m-logo svg').style.fill = '#fff';
                // document.querySelector('.m-logo svg').style.stroke = '#fff';
                document.querySelector('.lisbon').style.color = '#fff';
            }, 300);

            setTimeout(() => {
                bg.classList.add('is-shrunken');
                document.querySelector('.m-logo svg').style.fill = '#000';
                document.querySelector('.lisbon').style.color = '#000';
                done();
            }, 1200);
        })
        .addScene(data.content.intro[3])
        .addScene(`ardenSmall:${data.content.introSmall[0]}`)
        .addScene(data.content.introSmall[1])
        .addScene((done) => {
            physics({
                from: 0,
                to: 1,
                velocity: 60,
                spring: 300,
                friction: 0.8,
                onUpdate: x => css(icons[0]).set('scale', x),
                onStart: () => {
                    setTimeout(() => {
                        done();
                    }, 300);
                },
            }).start();
        })
        .addScene(data.content.introSmall[2])
        .addScene((done) => {
            physics({
                from: 0,
                to: 1,
                velocity: 60,
                spring: 300,
                friction: 0.8,
                onUpdate: x => css(icons[1]).set('scale', x),
                onStart: () => {
                    setTimeout(() => {
                        done();
                    }, 300);
                },
            }).start();
        })
        .addScene(data.content.introSmall[3])
        .addScene((done) => {
            physics({
                from: 0,
                to: 1,
                velocity: 60,
                spring: 300,
                friction: 0.8,
                onUpdate: x => css(icons[2]).set('scale', x),
                onStart: () => {
                    setTimeout(() => {
                        done();
                    }, 300);
                },
            }).start();
        })
        .addScene(data.content.introSmall[4])
        .addScene((done) => {
            physics({
                from: 0,
                to: 1,
                velocity: 60,
                spring: 300,
                friction: 0.8,
                onUpdate: x => css(icons[3]).set('scale', x),
                onStart: () => {
                    setTimeout(() => {
                        done();
                    }, 300);
                },
            }).start();
        })
        .addScene(data.content.introSmall[5])
        .addScene((done) => {
            physics({
                from: 0,
                to: 1,
                velocity: 60,
                spring: 300,
                friction: 0.8,
                onUpdate: x => css(icons[4]).set('scale', x),
                onStart: () => {
                    done();
                },
            }).start();
        })
        .addScene(data.content.introSmall[6])
        .addScene((done) => {
            physics({
                from: 0,
                to: 1,
                velocity: 60,
                spring: 300,
                friction: 0.8,
                onUpdate: x => css(icons[5]).set('scale', x),
                onStart: () => {
                    done();
                },
            }).start();
        })
        .addScene(data.content.introSmall[7])
        .addScene((done) => {
            Cookies.set('visitCheck', 'visited', {
                secure: false,
            });
            done();
        });
}
