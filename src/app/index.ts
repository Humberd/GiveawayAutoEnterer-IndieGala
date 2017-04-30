import "rxjs";
import { TopBarController } from "./views/TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./GiveawaysEnterer/PageGiveawaysRetriever";
import { AppState } from "./GiveawaysEnterer/AppState";
import { Observable } from "rxjs/Observable";
import { Giveaway } from "./models/Giveaway";
require("./styles.scss");

export class Main {
  private appState: AppState;
  private topBarController: TopBarController;
  private httpService: HttpService;
  private giveawaysRetriever: PageGiveawaysRetriever;

  constructor() {
  }

  public init(): void {
    this.instantiateObjects();
    this.bindCallbacks();
  }

  private instantiateObjects(): void {
    this.appState = new AppState();
    this.topBarController = new TopBarController();
    this.httpService = new HttpService();
    this.giveawaysRetriever = new PageGiveawaysRetriever(
        this.httpService,
        this.topBarController);
  }

  private bindCallbacks(): void {
    Observable.from(this.giveawaysRetriever.getAllGiveaways())
        .do((giveaway: Giveaway) => giveaway.unbindCouponDefaultClick())
        .do((giveaway: Giveaway) => giveaway.bindCouponEnterClick())
        .do((giveaway: Giveaway) => giveaway.addAnimationsElement())
        .toArray()
        .subscribe((giveaways: Giveaway[]) => this.appState.giveaways = giveaways);
  }
}

const main: Main = new Main();
main.init();