export const TAGS = [
    'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'main', 'header', 'footer',
    'nav', 'button', 'input', 'label', 'ul', 'li', 'a', 'img', 'i', 'form', "br", "strong", "small", "canvas",
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'select', 'option'
] as const;

export type tags = typeof TAGS[number];

export type zElementGen = {
    [K in tags]: (generic?: string | Object | HTMLElementTagNameMap[tags], ...children: (zElement | string | number | Text)[]) => zElement
}

export type zElement = {
    node: HTMLElementTagNameMap[tags],
    attrs?: Object,
    children?: (zElement | HTMLElementTagNameMap[tags] | string | number | Text)[],
    id?: string
}