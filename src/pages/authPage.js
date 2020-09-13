import {appModel} from '../model/appModel';
import {Popup} from '../components/popup/popup';
import './authPage.css';

export const authPage = {
    render() {
        const authPageEl = document.createElement('div');
        authPageEl.classList.add('app-content');
        authPageEl.insertAdjacentHTML('afterbegin', `
            <div class="auth-page-header">
                <h1><i class="fas fa-laptop"></i> Вход в личный кабинет</h1>
            </div>
            <div class="auth-page-content">
            </div>
        `);

        const authForm = document.createElement('form');
        authPageEl.lastElementChild.append(authForm);
        authForm.classList.add('auth-form');
        authForm.insertAdjacentHTML('afterbegin', `
            <div class="form-item">
                <label for="login"><i class="fas fa-envelope"></i> Почта</label>
                <input id="login" name="login" type="email" placeholder="Введите почту"/>
            </div>
            <div class="form-item">
                <label for="password"><i class="fas fa-unlock-alt"></i> Пароль</label>
                <input id="password" name="password" type="password" placeholder="Введите пароль"/>
            </div>
            <div class="form-item">
            </div>
        `);
        const loginButton = document.createElement('button');
        loginButton.append('Вход');
        loginButton.classList.add('login');
        loginButton.setAttribute('type', 'submit');
        const registerButton = document.createElement('button');
        registerButton.append('Регистрация');
        registerButton.classList.add('register')
        registerButton.setAttribute('type', 'submit');
        authForm.lastElementChild.append(loginButton);
        authForm.lastElementChild.append(registerButton);

        loginButton.addEventListener('click', (e) => {
            this.clicked = 'login';
        });
        registerButton.addEventListener('click', (e) => {
            this.clicked = 'register';
        });

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            loginButton.disabled = true;
            registerButton.disabled = true;

            let data = { };
            let inputs = e.target;
            for(let i = 0; i < inputs.length; i++) {
                if(inputs[i].name && inputs[i].value && inputs[i].tagName === "INPUT") {
                    data[inputs[i].name] = inputs[i].value
                }
            }
            if(this.clicked === 'login') {
                appModel.login(data).then()
                .catch((error) => {
                    loginButton.disabled = false;
                    registerButton.disabled = false;
                    Popup.create('Логин или пароль были введены неверно');
                });
            } else if(this.clicked === 'register') {
                appModel.register(data)
                .then(message => {
                    loginButton.disabled = false;
                    registerButton.disabled = false;
                    Popup.create('Аккаунт зарегистрирован');
                })
                .catch(error => {
                    loginButton.disabled = false;
                    registerButton.disabled = false;
                    Popup.create(error);
                });
            }
            
        });
        return authPageEl;
    }
};