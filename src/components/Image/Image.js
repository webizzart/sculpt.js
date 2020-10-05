import { CustomComponent, html } from '../../sculpt/sculpt';

export default class Image extends CustomComponent {

    constructor(){
        super();

        this.state = {
            src:"https://picsum.photos/id/1/300/200",
            num:1
        }
        this.rendered = {
            tag:"img",
            src:"{{this.state.src}}",
            width:300,
            height:200,
            // height:"auto", // TODO: check why auto get zero
            key:1
        }
        this.onclick = () =>{
            this.state.num++;
            this.state.src = `https://picsum.photos/id/${this.state.num}/300/200`
        }
    }
    render(){
        return this.rendered;
    }
}