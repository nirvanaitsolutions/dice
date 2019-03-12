import { customElement, computedFrom, autoinject } from 'aurelia-framework';
import { MdModal } from 'aurelia-materialize-bridge';

import steem from 'steem';

import styles from './status.css';
import { dispatchify } from 'aurelia-store';
import { login, logout } from 'store/actions';
import { Router } from 'aurelia-router';

@autoinject()
@customElement('status')
export class Status {
    private styles = styles;
    private loginUsername = localStorage.getItem('_dice_userNameCached') || null;
    private loggedInUser = this.getUser();
    private modal: MdModal;

    constructor(private router: Router) {

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

    handleLogin() {
        if (!window.steem_keychain) {
            window.alert('Steem Keychain extension not installed');

            return;
        }

        if (!this.loginUsername) {
            return;
        }

        window.steem_keychain.requestSignBuffer(this.loginUsername, `dice_login-${Math.floor(100000000 + Math.random() * 900000000)}`, 'Posting', response => {
            if(response.success === true) {
                const returnedUser = response.data.username;
                const localUser: any = sessionStorage.getItem('_dice_user') ? JSON.parse(sessionStorage.getItem('_dice_user')) : null;

                if (localUser && localUser.username === returnedUser) {
                  // User already logged in
                  this.modal.close();
                  return;
                }

                steem.api.getAccounts([returnedUser], (err, result) => {
                    const userObject = result[0];
                    const userMeta = JSON.parse(userObject.json_metadata);

                    const user = {
                        username: response.data.username,
                        userMeta,
                        balance: userObject.balance,
                        type: 'keychain'
                    };

                    this.loggedInUser = user;

                    dispatchify(login)(user);

                    this.modal.close();

                    sessionStorage.setItem('_dice_user', JSON.stringify(user));
                    localStorage.setItem('_dice_userNameCached', response.data.username);
                });
            } else {
              //  Verification failed
            }
        });
    }

    logout() {
        sessionStorage.removeItem('_dice_user');
        this.loggedInUser = null;
        dispatchify(logout)();
        this.router.navigate('/');
    }
}
