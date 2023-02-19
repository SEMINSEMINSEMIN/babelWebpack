import _ from "lodash";
import { divide, multiply } from "./calculator.js";
import "./style.css";
import Cat from "./cat.jpeg";

function getComponent() {
    const element = document.createElement("div");

    element.innerHTML = _.join(["Hello", "Semin"], " ");
    element.classList.add("hello");

    const myCat = new Image();
    myCat.src = Cat;

    element.appendChild(myCat);

    const btn = document.createElement("button");

    btn.innerHTML = "Click me and check the console!";
    btn.onclick = async () => {
        const printMe = (await import(/* webpackChunkName: "print" */ "./print.js")).default;
        printMe();
    };

    element.appendChild(btn);

    return element;
}

document.body.appendChild(getComponent());

console.log(divide(6, 2));
console.log(multiply(5, 3));

console.log([1, 2, 3].map(e => e));
