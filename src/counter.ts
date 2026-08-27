import type { zElement } from "../lib-cool/@types/zdom";
import { $ } from "./lib/dom";

export default function Counter(count = 0) {
  const button: zElement = $.button({ click() { button.children = ["Counter is at ", count += 1] } }, "Counter is at " + count);
  return button;
}
