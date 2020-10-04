import './style.pcss';
import { CustomComponent, html } from './customElement';
import HTML from './template.html';

export default class MyApp extends CustomComponent {

  constructor() {
    super();

    this.state = {
      counter: 1,
      foo: () => console.log(this.state),
      fromInput:"Hello im a new title.. ",
      name: "Developer",
      template:"im rendered from state {{this.state.counter}} and still change"
    }
    this.state.obj = [];
    this.createNewElement = () =>{
      this.rendered.children[0].children[0].children.splice(0,0, {
        tag: "p",
        key:Date.now(),
        onclick: this.Foo,
        innerHTML: "{{this.state.fromInput}}"
      });
    }
    this.onclick = () => {
    
      console.log(this.rendered);
      ++this.state.counter;
    }

    this.rendered = {
      tag: "div",
      id: "root",
      key:1,
      children: [
        {
          tag: "section",
          key:2,
          classList: ["Container","{{this.state.counter}}"],
          attributes:[{key:"data-c",value:"{{this.state.counter}}"}],
          props: { type: "root" },
          children: [
            {
              tag: "header",
              key:3,
      
              classList: ["Header"],
              children: [
                {
                  tag: "h1",
                  classList: ["DisplayTitle","{{this.state.counter}}"],
                  key:4,
                  innerHTML: "Hello {{this.state.name}} X {{this.state.counter}}  " 
                } 
                , {
                  tag: "p",
                  key:5,
                  onclick: this.Foo,
                  innerHTML: "Edit the template and watch the magic happening."
                }
              ]
            }, {
              tag: "main",
              key:6,
              classList: ["Content"],
              children:[
                {
                  tag:"button",
                  key:992,
                  onclick:this.createNewElement,
                  innerHTML:"Create new Title"
                },
                {
                  tag:"input",
                  key:999999,
                  oninput:(e)=>this.state.fromInput = e.target.value
                },
                {
                  tag:"div",
                  key:1999,
                  innerHTML: this.state.template
                }
              ]
            }
          ]
        }
      ]
    }
  }
  Foo() {
    alert("works!")
  }
  render() {
    //  return html`${HTML}`;
    return this.rendered;
  }
}
