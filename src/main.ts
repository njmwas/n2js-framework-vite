import "./style.css";
import Counter from "./counter";
import { $ } from "../lib/dom";
import State, { subscribe } from "../lib/state";

const date = new Date(2026, 7, 26, 14, 57, 0);
const countUp = State({ d: 0, h: 0, m: 0, s: 0, ms: 0 });
const display = Object.entries(countUp).map(([k, v], i) => {
  const span = $.span("", Number(v));
  subscribe(k, (p) => span.children = [i === Object.keys(countUp).length - 1 ? `${p}`.padStart(3, "0") : `${p}`.padStart(2, "0")]);
  return span;
})


const appNodes = $.div("#app",
  $.header("", $.h3("", "n2js Framework")),
  $.main("",
    $.p("", "Welcome to this JavaScript mini framework"),
    Counter(),
    $.p(".w-[3px] [style=background-image:url(/images/test.png)]", "In existance for ",
      $.h4("[style=color:red;margin-bottom:0;]", "dd:hh:mm:ss:ms"),
      $.h4({style:"margin-top:0"},
        ...Array.from(Array((display.length * 2) - 1), (_, i) => i % 2 != 0 ? ":" : display[i === 0 ? i : i / 2])
      )
    )
  )
);

document.querySelector<HTMLButtonElement>("#app")?.replaceWith(appNodes.node);

setInterval(() => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const days = 24 * 60 * 60 * 1000;
  const hours = 60 * 60 * 1000;
  const minutes = hours / 60;
  const seconds = minutes / 60;

  const d = Math.floor(diff / days);
  if (d != countUp.d) countUp.d = d;

  const h = Math.floor((diff % days) / hours);
  if (h != countUp.h) countUp.h = h;

  const m = Math.floor((diff % hours) / minutes);
  if (m !== countUp.m) countUp.m = m;

  const s = Math.floor(((diff % hours) % minutes) / seconds);
  if (s != countUp.s) countUp.s = s;

  countUp.ms = (((diff % hours) % minutes) % seconds) % 1000;

}, 1);