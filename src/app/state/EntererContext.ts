import { State } from "./State";
import { PageGiveawaysRetriever } from "../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../views/TopBar/TopBarController";
import { InitState } from "./states/InitState";
import { Giveaway } from "../models/Giveaway";
import { CouponsController } from "../views/Coupon/CouponsController";

export class EntererContext {
  private currentState: State;

  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController,
              private couponsController: CouponsController) {
    this.changeCurrentState(new InitState());
  }

  /*
   Changes current state and updates a status name in a topBar
   */
  public changeCurrentState(state: State): void {
    this.currentState = state;
    this.topBarCtrl.updateCurrentStateValue(state.getName());
  }

  /*
   Starts entering giveaways
   */
  public startEntering(giveaways: Giveaway[]): void {
    this.currentState.start(giveaways, this);
  }

  /*
   Stops entering giveaways
   */
  public stopEntering(): void {
    this.currentState.stop(this);
  }

}