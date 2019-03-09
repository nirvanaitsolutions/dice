import { customElement } from 'aurelia-framework';
import steem from 'steem';

declare const steem_keychain: any;

declare global {
    interface Window {
        steem_keychain: any;
    }
}

@customElement('status')
export class Status {
    login(username) {
        if (!window.steem_keychain) {
            window.alert('Steem Keychain extension not installed');

            return;
        }

        window.steem_keychain.requestSignBuffer(username, `dice_login-${Math.floor(100000000 + Math.random() * 900000000)}`, 'Posting', response => {
            if(response.success === true) {
                const returnedUser = response.data.username;

                if (returnedUser == username) {
                  // User already logged in
                  return;
                }

                const user = {
                   username: response.data.username,
                   type: 'keychain'
                }

                // Save user
            } else {
              //  Verification failed
            }
        });
    }
}
