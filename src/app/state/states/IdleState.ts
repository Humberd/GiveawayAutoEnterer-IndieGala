import { State } from "../State";
import { EntererContext } from "../EntererContext";
import { InProgressState } from "./InProgressState";
import { PageGiveawaysRetriever } from "../../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../../TopBar/TopBarController";
import { Observable } from "rxjs/Observable";
import { Giveaway } from "../../models/Giveaway";

export class IdleState implements State {
  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController) {

  }

  start(entererContext: EntererContext): void {
    this.topBarCtrl.disableEnterButton();
    entererContext.changeCurrentState(new InProgressState(this.giveawaysRetriever, this.topBarCtrl));


    Observable.from(this.giveawaysRetriever.getPageGiveaways())
        /*Get only not entered giveaways*/
        .filter((giveaway: Giveaway) => !giveaway.isEntered)
        .count()
        .do(item => console.log(item))
        .subscribe(() => entererContext.stopEntering())

    // this.giveawaysRetriever.getPageGiveaways();

  }

  stop(entererContext: EntererContext): void {
    throw Error("IdleState - cannot stop an idle state");
  }

  getName(): string {
    return "Idle";
  }

}