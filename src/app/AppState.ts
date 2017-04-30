import { Giveaway } from "./giveaways/Giveaway";
import { TopBarController } from "./views/TopBar/TopBarController";

export class AppState {
  giveaways: Giveaway[];
  private _userCoins: number;

  constructor(private topBarCtrl: TopBarController) {
    this.userCoins = 300;
  }

  get userCoins(): number {
    return this._userCoins;
  }

  set userCoins(value: number) {
    this._userCoins = value;
    this.topBarCtrl.updateCoinsValue(value);
  }
}