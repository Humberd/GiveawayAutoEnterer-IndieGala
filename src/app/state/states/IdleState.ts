import { State } from "../State";
import { EntererContext } from "../EntererContext";
import { InProgressState } from "./InProgressState";
import { PageGiveawaysRetriever } from "../../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../../TopBar/TopBarController";

export class IdleState implements State {
  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController) {

  }

  start(entererContext: EntererContext): void {
    this.topBarCtrl.disableEnterButton();
    entererContext.changeCurrentState(new InProgressState(this.giveawaysRetriever, this.topBarCtrl));

    setTimeout(() => {
      entererContext.stopEntering();
    }, 1000);

    // this.giveawaysRetriever.getPageGiveaways();

  }

  stop(entererContext: EntererContext): void {
    throw Error("IdleState - cannot stop an idle state");
  }

  getName(): string {
    return "Idle";
  }

}