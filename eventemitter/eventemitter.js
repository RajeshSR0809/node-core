import { EventEmitter } from 'node:events';
class Notify extends EventEmitter {}

const ToastNotify = new Notify();

ToastNotify.once("initiated", (props) => {
    console.log(props)
});

ToastNotify.on("change", (props) => {
    console.log(props)
});




ToastNotify.emit("initiated", {a: 1});
ToastNotify.emit("initiated", {a: 1});
ToastNotify.emit("change", {a: 100});