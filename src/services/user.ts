import steem from 'steem';

export interface UserInterface {
    username: string;
    userMeta: any;
    balance: string;
    type: string;
}

export class UserService {
    
    promptUserLogin(username: string): Promise<[UserInterface, any]> {
        return new Promise((resolve, reject) => {
            const loginChallenge = `dice_login-${Math.floor(100000000 + Math.random() * 900000000)}`;

            steem_keychain.requestSignBuffer(username, loginChallenge, 'Posting', async (response) => {
                if (response.success === true) {
                    const returnedUser = response.data.username;
                    const localUser: any = sessionStorage.getItem('_dice_user') ? JSON.parse(sessionStorage.getItem('_dice_user')) : null;
    
                    if (localUser && localUser.username === returnedUser) {
                      return;
                    }
    
                    try {
                        const getUser: any = await steem.api.getAccountsAsync([returnedUser]);
                        const userObject: any = getUser[0];
                        const userMeta = JSON.parse(userObject.json_metadata);
    
                        const user = {
                            username: response.data.username,
                            userMeta,
                            balance: userObject.balance,
                            type: 'keychain'
                        };
    
                        return resolve([user, userObject]);
                    } catch (e) {
                        reject(new Error('Could not load account from Steem blockchain'));
                    }
                } else {
                    reject(new Error('User did not successfully authenticate'));
                }
            });
        });
    }
}
