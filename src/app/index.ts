import "rxjs";
import { TopBarController } from "./views/TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./GiveawaysEnterer/PageGiveawaysRetriever";
import { CouponsController } from "./views/Coupon/CouponsController";
require("./styles.scss");

export class Main {
  private topBarController: TopBarController;
  private couponsController: CouponsController;
  private httpService: HttpService;
  private giveawaysRetriever: PageGiveawaysRetriever;

  constructor() {
  }

  public init(): void {
    this.instantiateObjects();
    this.bindCallbacks();
  }

  private instantiateObjects(): void {
    this.topBarController = new TopBarController();
    this.couponsController = new CouponsController();
    this.httpService = new HttpService();
    this.giveawaysRetriever = new PageGiveawaysRetriever(this.httpService);
  }

  private bindCallbacks(): void {
    // Observable.fromEvent(this.topBar.getEnterButton(), "click")
    //     .switchMap(() => this.coupons.getCouponsObs())
    //     .subscribe((item: JQuery) => item.click());


    // Observable.fromEvent(this.coupons.getCoupons(), "click")
    //     .map((item: JQueryEventObject) => $(item.currentTarget))
    //     .map((item: JQuery) => item.parents(".tickets-col"))
    //     .map((item: JQuery) => this.giveawaysRetriever.getGiveaway(item))
    //     .do((item: Giveaway) => console.log(item))
    //     .subscribe((item) => this.entererContext.startEntering([item]));
  }
}

const main: Main = new Main();
main.init();