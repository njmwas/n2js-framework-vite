import { tags, zElement, zElementGen } from './@types/zdom';
export declare function DomEntity(text: string): string;
export default function Element<T extends HTMLElementTagNameMap[tags]>(tag: keyof HTMLElementTagNameMap, generic?: string | Object | zElement, ...children: zElement[]): zElement;
export declare const $: zElementGen;
