const { createElement, render, Component } = preact;
const h = createElement;

const keys = [
    'W'.charCodeAt(0),
    'A'.charCodeAt(0),
    'S'.charCodeAt(0),
    'D'.charCodeAt(0),
    27
];

// The main rendering function.
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        if ('alt' in window) {
            // alt.on('setBank', this.setBankBalance.bind(this));
            // alt.on('setCash', this.setCashBalance.bind(this));
            // alt.on('showSuccess', this.showSuccess.bind(this));
        }
        //close command by pressing a key from 'const keys' 27 => escape
        window.addEventListener('keyup', e => {
            if (keys.includes(e.keyCode)) {
                if ('alt' in window) {
                    alt.emit('close');
                }
            }
        });
    }
    
    call() { 
        
    }
    sms() {
        
    }
    contact(){

    }
    settings() {

    }
    render() { 
        return h("div", {},
                h(img, { 
                    src: "assets/6debd12063821f7ac0f52eb1cadb6d9d.png", 
                    class:"ub-h_450px ub-rgt_-65px ub-btm_1px ub-pst_absolute ub-box-szg_border-box",
                }),
                h("div", {
                    class: "hgg-icon-bt ub-rgt_76px ub-btm_61px ub-pst_absolute ub-box-szg_border-box",
                    onclick: this.call.bind(this)
                }),
                h("div", {
                    class: "hgg-icon-bt ub-rgt_118px ub-btm_61px ub-pst_absolute ub-box-szg_border-box",
                    onclick: this.sms.bind(this)
                }),
                h("div", {
                    class: "hgg-icon-bt ub-rgt_160px ub-btm_61px ub-pst_absolute ub-box-szg_border-box",
                    onclick: this.contact.bind(this)
                }),
                h("div", {
                    class: "hgg-icon-bt ub-rgt_200px ub-btm_61px ub-pst_absolute ub-box-szg_border-box",
                    onclick: this.settings.bind(this)
                })
            );
    }
}

render(h(App), document.querySelector('#render'));