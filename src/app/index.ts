import "rxjs";
import { TopBarController } from "./views/TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./giveaways/PageGiveawaysRetriever";
import { AppState } from "./AppState";
import { Observable } from "rxjs/Observable";
import { Giveaway } from "./giveaways/Giveaway";
import { AllGiveaways } from "./giveaways/AllGiveaways";
require("./styles.scss");

export class Main {
  private appState: AppState;
  private topBarController: TopBarController;
  private httpService: HttpService;
  private giveawaysRetriever: PageGiveawaysRetriever;
  private allGiveaways: AllGiveaways;

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
    this.allGiveaways = new AllGiveaways(this.topBarController);
  }

  private bindCallbacks(): void {
    this.allGiveaways.verifyEnteringState();

    Observable.from(this.giveawaysRetriever.getAllGiveaways())
        .do((giveaway: Giveaway) => giveaway.unbindCouponDefaultClick())
        .do((giveaway: Giveaway) => giveaway.bindCouponEnterClick())
        .do((giveaway: Giveaway) => giveaway.addAnimationsElement())
        .toArray()
        .subscribe((giveaways: Giveaway[]) => this.appState.giveaways = giveaways);

    Observable.fromEvent(this.topBarController.getEnterButton(), "click")
        .subscribe(() => {
            this.allGiveaways.startSequence();
        })
        // .flatMap(() => this.appState.giveaways)
        // .filter((giveaway: Giveaway) => !giveaway.isEntered)
        // .concatMap((giveaway: Giveaway) => {
        //   return Observable.of(giveaway)
        //       .delay(1000)
        //       .do((giveawayInner: Giveaway) => giveawayInner.enterGiveaway())
        // })
        // .subscribe(
        //     (giveaway: Giveaway) => console.log(giveaway),
        //     (error) => console.error("There was an error in enter many giveaways: ", error),
        //     () => )
  }
}

const main: Main = new Main();
main.init();