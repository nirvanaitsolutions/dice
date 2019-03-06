import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'SwapSteem';

    config.map([

      { route: [''], name: 'home', title: 'Home', redirect: 'dice' },
      { route: 'dice', name: 'dice', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/dice') },
      { route: 'blackjack', name: 'blackjack', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/blackjack') },
      { route: 'slots', name: 'slots', title: 'Dice', moduleId: PLATFORM.moduleName('./routes/slots') },

    ]);

    this.router = router;
  }
}
