import { JsonObjectToStyleString } from "./style";
import { valueChanger } from "./valueChanger";
import {camelCaseToDash} from './strings';

export function JsonToElement(jsonObject, options) {
    if (!options) options = {};
    let { parentElement } = options;

    //TODO: create parentelement and jsonobject validation   
    const renderAttrs = (jsElement, element) => {
        if (Array.isArray(jsElement.classList)) {
            jsElement.classList.forEach(className => {
                if (typeof (className) === "string") {
                    className = valueChanger.call(this, className);
                    element.classList.add(className);
                }
            });

            if (jsElement.attributes && jsElement.attributes.class) {
                const classes = jsElement.attributes.class.split(" ");
                classes.forEach(clssName => {
                    if (!jsElement.classList.includes(clssName)) {
                        if (typeof (className) === "string") {
                            className = valueChanger.call(this, className);
                            jsElement.classList.add(className);
                        }
                    }
                });
                delete jsElement.attributes.class
            }
        }
        if ((typeof (jsElement.key) !== "undefined")) {
            element.key = jsElement.key;
        }

        const readOnlyKeys = ["children", "classList", "attributes", "style"];
        for (const key in jsElement) {
            let value = jsElement[key];
            if (typeof (value) === "string") {
                value = valueChanger.call(this, value)
            }
            if (!readOnlyKeys.includes(key)) {
                element[key] = value;
            }
        }
        if (jsElement.style) {
            let collectedStyle = JsonObjectToStyleString(jsElement.style);
            collectedStyle = valueChanger.call(this, collectedStyle);
            collectedStyle = camelCaseToDash(collectedStyle);
            element.style = collectedStyle;
        }
        if (jsElement.id) {
            element.setAttribute("id", valueChanger.call(this, jsElement.id));
        }
        if (jsElement.attributes) {
            for (const attr of jsElement.attributes) {
                if (attr !== "style" && attr !== "class")
                    element.setAttribute(attr.key, valueChanger.call(this, attr.value));
            }
        }
        //TODO: other attrs...
    }
    const createHtmlElement = (jsElement) => {
        const nodeType = jsElement.tag;
        let element;

        element = document.createElement(nodeType);
        renderAttrs(jsElement, element);
        return element;
    }

    if (!parentElement) {
        options.index = 0;
        parentElement = createHtmlElement(jsonObject);
    }
    jsonObject.__index__ = options.index;
    if (Array.isArray(jsonObject.children)) {
        jsonObject.children.forEach(jsChild => {
            const htmlElement = createHtmlElement(jsChild);

            if (htmlElement) {
                parentElement.appendChild(htmlElement);
                JsonToElement.call(this, jsChild, { parentElement: htmlElement, index: options.index });
            } else {
                console.error('cant create dom element from json', jsChild);
            }
        });
    }
    return parentElement;
}

export const collectElements = (node) => {
    const nodes = [];
    Array.from(node.childNodes).forEach(n => {
        if (n.key) {
            nodes.push({ key: n.key, element: n });
            const subNodes = collectElements(n);
            nodes.push(...subNodes);
        }
    });
    return nodes;
}
export const renderChildren = (node, options) => {
    if (!options) options = {}
    const { parentElement, oldNodes } = options;
    const parent = parentElement ? parentElement : node;
    Array.from(node.childNodes).forEach(n => {
        parent.appendChild(n);
        renderChildren(n);
    })
}
