import { State } from "./State";
import { IdleState } from "./states/IdleState";
import { PageGiveawaysRetriever } from "../GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "../TopBar/TopBarController";
export class EntererContext {
  private currentState: State;

  constructor(private giveawaysRetriever: PageGiveawaysRetriever,
              private topBarCtrl: TopBarController) {
    this.changeCurrentState(new IdleState(giveawaysRetriever, this.topBarCtrl));
  }

  public changeCurrentState(state: State): void {
    this.currentState = state;
    this.topBarCtrl.updateCurrentStateValue(state.getName());
  }

  public startEntering(): void {
    this.currentState.start(this);
  }

  public stopEntering(): void {
    this.currentState.stop(this);
  }

}