import { Eisdiele } from './Eisdiele';

window.addEventListener('load', () => {
    const canvas: HTMLCanvasElement = document.querySelector('#canvas');
    const eisdiele = new Eisdiele(canvas);
    eisdiele.start();
});
