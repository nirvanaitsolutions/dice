import { UserService } from './../services/user';
import { customElement, computedFrom, autoinject } from 'aurelia-framework';
import { MdModal } from 'aurelia-materialize-bridge';

import steem from 'steem';

import styles from './status.css';
import { dispatchify, Store } from 'aurelia-store';
import { login, logout, setUserMeta } from 'store/actions';
import { Router } from 'aurelia-router';
import { map } from 'rxjs/operators';
import { State } from 'store/state';

@autoinject()
@customElement('status')
export class Status {
    private styles = styles;
    private state: State;
    private balance;
    private subscription;
    private loginUsername = localStorage.getItem('_dice_userNameCached') || null;
    private modal: MdModal;

    constructor(private router: Router, private userService: UserService, private store: Store<State>) {

    }

    bind() {
        this.subscription = this.store.state.subscribe((state: State) => this.state = state);
        
        this.balance = this.store.state.pipe(
            map(s => {
                const balanceString = s.user.balance.split(' ');

                return {
                    value: parseFloat(balanceString[0]),
                    unit: balanceString[1]
                };
            })
        );
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

            console.log(response);

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
        dispatchify(logout)();
        this.router.navigate('/');
    }
}
