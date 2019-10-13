const { createElement, render, Component } = preact;
const h = createElement;

const regex = new RegExp(
    '^(([A-Z][a-z]+)(([ _][A-Z][a-z]+)|([ _][A-z]+[ _][A-Z][a-z]+)))$'
);

// The main rendering function.
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: false,
            roleplayname: '',
            currentYear: new Date().getFullYear(),
            errors: {
                name: false,
                dob: false
            }
        };
    }

    nameChange(e) {
        const result = regex.test(e.target.value);

        if (!result) {
            this.state.errors.name = true;
            this.setState();
            return;
        }

        this.state.errors.name = false;
        this.setState({ roleplayname: e.target.value });
    }

    dateChange(e) {
        if (!this.dateValid(e.target.value)) {
            this.state.errors.dob = true;
            this.setState();
            return;
        }

        this.state.errors.dob = false;
        this.setState({ date: e.target.value });
    }

    dateValid(date) {
        date = new Date(date);

        if (!date || isNaN(date.getTime())) return false;

        if (date.getFullYear() <= 1920) return false;

        if (date.getFullYear() > this.state.currentYear) return false;

        return true;
    }

    submit() {
        const result = regex.test(this.state.roleplayname);
        if (!result) {
            this.state.errors.name = true;
            this.setState();
            return;
        }

        if ('alt' in window) {
            alt.emit('roleplay:SetInfo', {
                name: this.state.roleplayname,
                dob: this.state.date
            });
        } else {
            console.log([this.state.roleplayname, this.state.date]);
        }
    }

    render() {
        return h('div', { class: "hgg-tablet"});
    }
}

render(h(App), document.querySelector('#render'));
