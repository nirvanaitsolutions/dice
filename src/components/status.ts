import { UserService } from './../services/user';
import { customElement, computedFrom, autoinject } from 'aurelia-framework';
import { MdModal } from 'aurelia-materialize-bridge';

import steem from 'steem';

import styles from './status.css';
import { dispatchify } from 'aurelia-store';
import { login, logout, setUserMeta } from 'store/actions';
import { Router } from 'aurelia-router';

@autoinject()
@customElement('status')
export class Status {
    private styles = styles;
    private loginUsername = localStorage.getItem('_dice_userNameCached') || null;
    private loggedInUser = this.getUser();
    private modal: MdModal;

    constructor(private router: Router, private userService: UserService) {

    }

    @computedFrom('loggedInUser.balance')
    get balance() {
        if (this.loggedInUser) {
            const balanceString = this.loggedInUser.balance.split(' ');

            return {
                value: parseFloat(balanceString[0]),
                unit: balanceString[1]
            };
        }

        return null;
    }

    getUser() {
        const localUser = sessionStorage.getItem('_dice_user');

        if (!localUser) {
            return null;
        }

        return JSON.parse(localUser);
    }

    login() {
        this.modal.open();
    }

    async handleLogin() {
        if (!window.steem_keychain) {
            window.alert('Steem Keychain extension not installed');

            return;
        }

        if (!this.loginUsername) {
            return;
        }

        try {
            const response = await this.userService.promptUserLogin(this.loginUsername);
            const user = response[0];
            const steemData = response[1];

            this.loggedInUser = user;

            dispatchify(login)(user);
            dispatchify(setUserMeta)(steemData);

            this.modal.close();

            sessionStorage.setItem('_dice_user', JSON.stringify(user));
            localStorage.setItem('_dice_userNameCached', user.username);
        } catch(e) {

        }
    }

    logout() {
        sessionStorage.removeItem('_dice_user');
        this.loggedInUser = null;
        dispatchify(logout)();
        this.router.navigate('/');
    }
}
