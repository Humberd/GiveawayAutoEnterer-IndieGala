import { State } from "../State";
import { EntererContext } from "../EntererContext";
import { IdleState } from "./IdleState";
import { PageGiveawaysRetriever } from "../../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../../views/TopBar/TopBarController";
import { Giveaway } from "../../models/Giveaway";
import { CouponsController } from "../../views/Coupon/CouponsController";

export class InProgressState implements State {
  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController,
              private couponsController: CouponsController) {

  }

  start(giveaways: Giveaway[], entererContext: EntererContext): void {
    throw Error("InProgressState - cannot start already in progress state");
  }

  stop(entererContext: EntererContext): void {
    this.topBarCtrl.enableEnterButton();
    this.couponsController.removeCoupon()
    entererContext.changeCurrentState(new IdleState(
        this.giveawaysRetriever,
        this.topBarCtrl,
        this.couponsController));
  }

  getName(): string {
    return "In Progress";
  }

}