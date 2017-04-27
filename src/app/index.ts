require("./styles.scss");
import "rxjs";
import { CoinsDisplayController } from "./CoinsDisplay/CoinsDisplayController";

export class Main {
  private coinsDisplayController: CoinsDisplayController;

  constructor() {
  }

  public init(): void {
    this.coinsDisplayController = new CoinsDisplayController();
  }
}

const main: Main = new Main();
main.init();