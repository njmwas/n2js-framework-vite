import { TAGS, type tags, type zElement, type zElementGen } from "./@types/zdom";


export function DomEntity(text: string): string {
    return new DOMParser().parseFromString(text, "text/html").body.textContent;
}

const getNodes = (children: zElement[]): (HTMLElementTagNameMap[tags] | Text)[] => children.reduce((a: (HTMLElementTagNameMap[tags] | Text)[], c: zElement) => [
    ...a,
    ...(typeof c === "object" && "node" in c ? [c.node] :
        typeof c === "string" ? [document.createTextNode(DomEntity(c))] :
            typeof c === "number" ? [document.createTextNode(c)] :
                [c])
], [])


export default function Element(tag: keyof HTMLElementTagNameMap, generic: string | Object | zElement = {}, ...children: zElement[]): zElement {

    const node = document.createElement(tag);
    let attrs = {}

    if (typeof generic === "object" && generic !== null && "node" in generic) {
        children = [generic, ...children]
    }
    else if (typeof generic === "string") {
        attrs = generic.split(" ").reduce((a: any, b) => {
            if (b.startsWith(".")) a.class = b.substring(1).replaceAll(".", " ");
            else if (b.startsWith("#")) a.id = b.substring(1);
            else if (new RegExp(/\[(.*)]/g).test(b)) {
                for (const matchedString of b.matchAll(/\[(.*)\]/g)) {
                    const [attrName, attrVal] = matchedString[1].split("=");
                    console.log(attrName, attrVal);
                    a[attrName] = attrVal;
                }
            }
            /* else if (b.includes(":")) {
                b.split(",").forEach(c => {
                    const [k, v] = c.split(":");
                    a[k.trim()] = v;
                }, {});
            } */
            return a;
        }, attrs);
    }
    else attrs = generic;

    Object.entries(attrs as Record<string, any>).forEach(([k, v]) => {
        if (typeof v === "function") {
            node.addEventListener(k, v as EventListener);
        }
        else node.setAttribute(k, String(v));
    });

    node.append(...getNodes(children));

    return new Proxy({ node, attrs, children, id: crypto.randomUUID() } as zElement, {
        set(target: zElement, p: string | symbol, newVal: any): boolean {
            if (p === "node") {
                const newElem: HTMLElementTagNameMap[tags] = newVal.node;
                target.node.replaceWith(newElem);
                target.node = newElem;
            }
            else if (p === "children") {
                const children = getNodes(Array.isArray(newVal) ? newVal : [newVal]);
                target.node.replaceChildren(...children);
                target.children = children;
            }
            else if (p === "attrs") {
                Object.entries(newVal).map(([v, k]: (any | string)[]) => target.node.setAttribute(k, v));
                target.attrs = newVal;
            }
            else (target as any)[p as keyof zElement] = newVal;
            return true;
        },

        get(target: zElement, p: string | symbol, receiver: any): any {
            if (p in target) {
                // return target.node;
                return Reflect.get(target, p as keyof zElement, receiver);
            }

            return Reflect.get(target, p, receiver);
        }
    })

    // return node;
}

export const $ = TAGS.reduce((a, tag) => ({ ...a, [tag]: (...params: any[]) => Element(tag, ...params) }), {}) as zElementGen;