import { State } from "../State";
import { EntererContext } from "../EntererContext";
import { IdleState } from "./IdleState";
import { PageGiveawaysRetriever } from "../../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../../views/TopBar/TopBarController";

export class InProgressState implements State {
  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController) {

  }

  start(entererContext: EntererContext): void {
    throw Error("InProgressState - cannot start already in progress state");
  }

  stop(entererContext: EntererContext): void {
    this.topBarCtrl.enableEnterButton();
    entererContext.changeCurrentState(new IdleState(this.giveawaysRetriever, this.topBarCtrl));
  }

  getName(): string {
    return "In Progress";
  }

}