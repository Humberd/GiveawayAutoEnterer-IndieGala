import "rxjs";
import { TopBarController } from "./views/TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./giveaways/PageGiveawaysRetriever";
import { AppState } from "./AppState";
import { Observable } from "rxjs/Observable";
import { Giveaway } from "./giveaways/Giveaway";
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

    Observable.fromEvent(this.topBarController.getEnterButton(), "click")
        .flatMap(() => this.appState.giveaways)
        .filter((giveaway: Giveaway) => !giveaway.isEntered)
        .concatMap((giveaway: Giveaway) => {
          return Observable.of(giveaway)
              .delay(1000)
              .do((giveawayInner: Giveaway) => giveawayInner.enterGiveaway())
        })
        .subscribe((giveaway: Giveaway) => console.log(giveaway))
  }
}

const main: Main = new Main();
main.init();