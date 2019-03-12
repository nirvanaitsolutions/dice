import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
  private router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'SwapSteem';

        config.options.pushState = true;

        config.map([
            { route: [''], name: 'home', title: 'Home', redirect: 'dice' },
            { route: 'dice', name: 'dice', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/dice/dice'), nav: true },
            { route: 'blackjack', name: 'blackjack', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/blackjack/blackjack'), nav: true },
            { route: 'slots', name: 'slots', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/slots/slots'), nav: true },

            { route: 'my-bets', name: 'myBets', title: 'My Bets', moduleId: PLATFORM.moduleName('./routes/user/my-bets'), auth: true, nav: true }
        ]);

        config.addAuthorizeStep(AuthorizeStep);

        this.router = router;
    }
}
