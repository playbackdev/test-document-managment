export const PAGE_CABINET = 'cabinet';
export const PAGE_LOGIN = 'login';
import firebase from 'firebase/app';
import 'firebase/auth';

export const appModel = {
    user: {},
    users: [
        {login: "German", password: "123"},
        {login: "German1", password: "1234"},
        {login: "German2", password: "12345"},
        {login: "German3", password: "123456"},
    ],
    page: PAGE_LOGIN,
    authorize(user) {
        this.user = user;
        this.page = PAGE_CABINET;
        document.dispatchEvent(new CustomEvent('pagechanged', {detail: { page: PAGE_CABINET } }));
    },
    login({login, password}) {
        if(login && password) {
            return firebase.auth().signInWithEmailAndPassword(login, password)
            .then(() => {
                this.user = firebase.auth().currentUser;
                this.page = PAGE_CABINET;
                document.dispatchEvent(new CustomEvent('pagechanged', {detail: { page: PAGE_CABINET } }));
                return new Promise((resolve) => resolve());
            });
        } else {
            return new Promise((resolve, reject) => reject('Логин или пароль были введены неверно'));
        }
    },
    logout() {
        this.user = {};
        firebase.auth().signOut();
        this.page = PAGE_LOGIN;
        document.dispatchEvent(new CustomEvent('pagechanged', {detail: { page: PAGE_LOGIN } }));
    },
    register({login, password}) {
        if(login && password) {
            return firebase.auth().createUserWithEmailAndPassword(login, password);
        } else {
            return new Promise((resolve, reject) => reject('Введите почту и пароль не менее 6 символов'));
        }
    }
};