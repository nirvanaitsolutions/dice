import { customElement } from 'aurelia-framework';

declare global {
    interface Window {
        steem_keychain: any;
    }
}

@customElement('status')
export class Status {
    login() {
        if (!window.steem_keychain) {
            window.alert('Steem Keychain extension not installed');

            return;
        }

        const username = '';

        window.steem_keychain.requestSignBuffer(username, `dice_login-${Math.floor(100000000 + Math.random() * 900000000)}`, 'Posting', response => {
            if(response.success === true) {
                const currentUser = ''; // get current username logged in
                const username = response.data.username;

                if (currentUser == username) {
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
