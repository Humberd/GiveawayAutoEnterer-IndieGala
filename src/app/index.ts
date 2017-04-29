import { EnterButtonController } from "./GiveawaysEnterer/EnterButtonController";
require("./styles.scss");
import "rxjs";
import { CoinsDisplayController } from "./CoinsDisplay/CoinsDisplayController";
import { GiveawaysEntererService } from "./GiveawaysEnterer/GiveawaysEntererService";

export class Main {
  private coinsDisplayController: CoinsDisplayController;
  private enterButtonController: EnterButtonController;
  private enterService: GiveawaysEntererService;

  constructor() {
  }

  public init(): void {
    this.coinsDisplayController = new CoinsDisplayController();
    this.enterButtonController = new EnterButtonController();
    this.enterService = new GiveawaysEntererService();
    setTimeout(() => {
      const giveaways = this.enterService.getPageGiveaways();
      console.log(giveaways);
    }, 1000);
  }
}

const main: Main = new Main();
main.init();