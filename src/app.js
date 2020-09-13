import {appModel, PAGE_CABINET, PAGE_LOGIN} from './model/appModel';
import {loader} from './components/loader/loader';
import './style/style.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from './firebase.config';

export const App = {
    init() {
        this.appElement = document.getElementById('app');

        this.render(loader());

        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                appModel.authorize(user);
            }
            this.renderPage(appModel.page);
        });

        document.addEventListener('pagechanged', (e) => {
            this.renderPage(e.detail.page);
        });
    },
    renderPage(page) {
        switch(page) {
            case PAGE_LOGIN:
                import('./pages/authPage').then(module => {
                    this.render(module.authPage.render());
                });
                break;
            case PAGE_CABINET:
                import('./pages/tablePage').then(module => {
                    this.render(module.tablePage.render());
                });
                break;
        }
    },
    render(el) {
        while(this.appElement.firstChild) {
            this.appElement.removeChild(this.appElement.firstChild);
        }
        this.appElement.insertAdjacentElement('afterbegin', el);
    }
};
