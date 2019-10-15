const { createElement, render, Component } = preact;
const h = createElement;

// The main rendering function.
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: 0,
            fadeOut: 0,
            feedback: 'Willkommen',
            username: '',
            password1: '',
            password2: '',
            valid: false,
            isWaiting: false
        };

        this.wrapper = preact.createRef();
        this.username = preact.createRef();
    }

    componentDidMount() {
        if ('alt' in window) {
            alt.on('error', errorName => {
                this.updateFeedback(errorName);
                this.setState({ isWaiting: false });
            });

            alt.on('success', successMessage => {
                this.updateFeedback(successMessage);
            });

            alt.on('setUsername', username => {
                this.setState({ username });
                setTimeout(() => {
                    this.username.current.value = this.state.username;
                }, 500);
            });

            alt.on('goToLogin', () => {
                this.setState({ register: 0, isWaiting: false });
            });
        }

        setTimeout(() => {
            if ('alt' in window) {
                alt.emit('ready');
            }
            this.username.current.focus();
        }, 500);
    }

    updateFeedback(msg) {
        this.setState({ feedback: msg });
    }

    validData(e) {
        if (e.target.id === 'username') {
            this.setState({ username: e.target.value });
        }

        if (e.target.id === 'password1') {
            this.setState({ password1: e.target.value });
        }

        if (e.target.id === 'password2') {
            this.setState({ password2: e.target.value });
        }

        if (this.state.username.length <= 5) {
            this.setState({
                feedback: 'Der Benutzername muss länger als 5 Zeichen sein',
                valid: false
            });

            return;
        }

        if (this.state.password1.length <= 5) {
            this.setState({
                feedback: 'Das Passwort muss länger als 5 Zeichen sein.',
                valid: false
            });
            return;
        }

        if (this.state.register === 1 && this.state.password1 !== this.state.password2) {
            this.setState({ feedback: 'Die Passwörter stimmen nicht überein.', valid: false });
            return;
        }

        if (this.state.username.length >= 6 && this.state.password1.length >= 6) {
            this.setState({ valid: true });
        } else {
            this.setState({ valid: false });
        }

        this.setState({ feedback: 'Alles bereit!' });
    }

    setRegister() {
        this.setState({ fadeOut: 1 });

        setTimeout(() => {
            this.setState({ register: 1, fadeOut: 0 });
        }, 125);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.submitData()
        }
      }

    setLogin() {
        this.setState({ fadeOut: 1 });

        setTimeout(() => {
            this.setState({ register: 0, fadeOut: 0 });
        }, 125);
    }

    submitData() {
        this.setState({ isWaiting: true });

        if ('alt' in window) {
            if (this.state.register === 1) {
                alt.emit('registerAccount', this.state.username, this.state.password1);
            } else {
                alt.emit(
                    'existingAccount',
                    this.state.username,
                    this.state.password1,
                    true
                );
            }
        }
    }

    render() {
        return h('div',
            {
                class: this.state.isWaiting ? 'wrapper none animated fadeOut faster' : 'wrapper regular animated fadeIn faster'
            },
            h(
                'div',
                { id: 'formContent' },
                h(
                    'h2',
                    {
                        onclick: this.setLogin.bind(this),
                        class: this.state.register ? 'inactive underlineHover' : 'active'
                    },
                    'Anmelden'
                ),
                h(
                    'h2',
                    {
                        onclick: this.setRegister.bind(this),
                        class: this.state.register ? 'active' : 'inactive underlineHover'
                    },
                    'Registrieren'
                ),
                h(
                    'div',
                    {},
                    h(
                        'img',
                        {
                            src: 'logo.png',
                            id: 'icon'
                        }
                    )
                ),
                h(
                    'div',
                    { class: 'animated flash container' },
                    h('p', { class: 'center', id: 'feedback' }, this.state.feedback)
                ),
                h(
                    'form',
                    {
                        ref: this.wrapper,
                        class: this.state.fadeOut ? 'animated fadeOut innerwrapper' : 'animated fadeIn innerwrapper'
                    },
                    h(
                        'div',
                        { class: 'container' },
                        h(
                            'div',
                            {
                                class: 'text-box'
                            },
                            h('input', {
                                type: 'text',
                                name: 'username',
                                placeholder: 'Benutzername',
                                autocomplete: 'off',
                                oninput: this.validData.bind(this),
                                id: 'username',
                                ref: this.username,
                                class: this.state.username.length >= 6 ? 'green' : 'red'
                            })
                        )
                    ),
                    h(
                        'div',
                        { class: 'container' },
                        h(
                            'div',
                            {
                                class: 'text-box'
                            },
                            h('input', {
                                type: 'password',
                                name: 'password',
                                placeholder: 'Passwort',
                                oninput: this.validData.bind(this),
                                onkeypress: this.handleKeyPress.bind(this),
                                id: 'password1',
                                class:
                                    (this.state.register &&
                                        (this.state.password1.length >= 6 &&
                                            this.state.password2.length >= 6 &&
                                            this.state.password1 === this.state.password2)) ||
                                    (!this.state.register && this.state.password1.length >= 6)
                                        ? 'green'
                                        : 'red'
                            })
                        )
                    ),
                    this.state.register === 1
                        ? h(
                        'div',
                        {
                            class: 'container'
                        },
                        h(
                            'div',
                            { class: 'text-box' },
                            h('input', {
                                type: 'password',
                                name: 'password',
                                placeholder: 'Passwort wiederholen',
                                oninput: this.validData.bind(this),
                                id: 'password2',
                                onkeypress: this.handleKeyPress.bind(this),
                                class:
                                    this.state.register &&
                                    (this.state.password1.length >= 6 &&
                                        this.state.password2.length >= 6 &&
                                        this.state.password1 === this.state.password2)
                                        ? 'green'
                                        : 'red'
                            })
                        )
                        )
                        : h('div', { class: 'container' }),
                    h(
                        'div',
                        {
                            class: 'container'
                        },
                        h(
                            'button',
                            {
                                onclick: this.submitData.bind(this),
                                disabled: !this.state.valid,
                                class: 'submit'
                            },
                            this.state.register ? 'Registrieren' : 'Anmelden'
                        )
                    )
                )
            )
        );
    }
}

render(h(App), document.querySelector('#render'));
