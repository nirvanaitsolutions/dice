import { UserService } from './services/user';
import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';
import { AuthorizeStep } from './resources/pipeline-steps/auth-pipeline';
import { Store, dispatchify, rehydrateFromLocalStorage } from 'aurelia-store';
import { State } from 'store/state';
import { Subscription } from 'rxjs';
import { autoinject } from 'aurelia-framework';
import { login } from 'store/actions';

@autoinject()
export class App {
    private router: Router;
    private state: State;
    private subscription: Subscription;

    constructor(private store: Store<State>) {
        this.subscription = this.store.state.subscribe((state) => {
            if (state) {
                this.state = state;

                AuthorizeStep.loggedIn = state.loggedIn;
            }
        });
    }

    // On initial load, rehydrate store from cache middleware
    attached() {
        dispatchify(rehydrateFromLocalStorage)('steemswap_gaming');
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'SwapSteem';

        config.options.pushState = true;

        config.map([
            { route: [''], name: 'home', title: 'Home', redirect: 'dice' },
            { route: 'dice', name: 'dice', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/games/dice/dice'), nav: true },
            { route: 'blackjack', name: 'blackjack', title: 'Blackjack', moduleId: PLATFORM.moduleName('./routes/games/blackjack/blackjack'), nav: true },
            { route: 'slots', name: 'slots', title: 'Slots', moduleId: PLATFORM.moduleName('./routes/games/slots/slots'), nav: true },

            { route: 'my-bets', name: 'myBets', title: 'My Bets', moduleId: PLATFORM.moduleName('./routes/user/my-bets'), auth: true, nav: true }
        ]);

        config.addAuthorizeStep(AuthorizeStep);

        this.router = router;
    }
}
