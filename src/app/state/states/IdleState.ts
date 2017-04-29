import { State } from "../State";
import { EntererContext } from "../EntererContext";
import { InProgressState } from "./InProgressState";
import { PageGiveawaysRetriever } from "../../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../../views/TopBar/TopBarController";
import { Giveaway } from "../../models/Giveaway";
import { Observable } from "rxjs/Observable";
import { EnterGiveawayResponse } from "../../dto/EnterGiveawayResponse";
import { CouponsController } from "../../views/Coupon/CouponsController";

export class IdleState implements State {
  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController,
              private couponsController: CouponsController) {

  }

  start(giveaways: Giveaway[], entererContext: EntererContext): void {
    this.topBarCtrl.disableEnterButton();
    entererContext.changeCurrentState(new InProgressState(
        this.giveawaysRetriever,
        this.topBarCtrl,
        this.couponsController));

    
    Observable.from(giveaways)
        .do((giveaway: Giveaway) => this.couponsController.addCouponAnimation(giveaway.element))
        .switchMap((giveaway: Giveaway) => giveaway.sendEnter())
        .subscribe(
            (response: EnterGiveawayResponse) => {
              if (response.status === "ok") {
                this.topBarCtrl.updateCoinsValue(response.new_amount);
              }
            }, error => {
            }, () => {
              entererContext.stopEntering();
            });
  }

  stop(entererContext: EntererContext): void {
    throw Error("IdleState - cannot stop an idle state");
  }

  getName(): string {
    return "Idle";
  }

}