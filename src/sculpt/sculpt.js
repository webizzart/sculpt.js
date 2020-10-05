import { JsonToElement, collectElements, renderChildren } from './utilis';
import { mergeDiff } from './diff';

export function defineComponent(options) {
  if (!options) return console.error("error");
  if (!options.Selector || !options.Component) return console.error("error");
  // let ctor = customElements.get('my-paragraph');
  //TODO: check if componnt defined allready
  customElements.define(options.Selector, options.Component);

}
export const html = String.raw;
export class CustomComponent extends HTMLElement {

  constructor() {
    super();
    this.JsonToElement = JsonToElement;
  }
  __renderContent__() {
    const newContent = this.render();
    let rendered;

    if (typeof (newContent) === "object") {
      //TODO: handle strings..
      const fragment  = {
        tag:"fragment",
        children:[newContent]
      }
      rendered = this.JsonToElement.call(this, fragment);
    }
    const newNodes = collectElements(rendered);
    //Create dom fragment
    if (this.present) {
      mergeDiff(newNodes, this.present);
    }

    if (!this.present) {
      this.present = newNodes;
      renderChildren(rendered, { parentElement: this });
    }
  }

  connectedCallback() {
    const handler2 = {
      get: function (target, prop, receiver) {
        return target[prop];
      },
      set: (obj, prop, newval) => {
        // let oldval = obj[prop];
        obj[prop] = newval;
        console.log(`${this.nodeName} render from connectedcallback`)
          this.__renderContent__();
        // Indicate success
        return true;
      }
    };

    this.state = new Proxy(this.state, handler2);
    if (typeof (this.render) === 'function') {
      console.log(`${this.nodeName} first render into the dom`)
        this.__renderContent__();
    }else{
      console.error("please use declare render function..")
    }
  }
  disconnectedCallback() {
    
  }
  attributeChangedCallback(name, oldValue, newValue) {
   
  }
}
