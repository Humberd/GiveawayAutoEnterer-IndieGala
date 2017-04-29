import "rxjs";
import { TopBarController } from "./views/TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./GiveawaysEnterer/PageGiveawaysRetriever";
import { Observable } from "rxjs/Observable";
import { EntererContext } from "./state/EntererContext";
import { CouponsController } from "./views/Coupon/CouponsController";
import { AjaxRequest } from "rxjs/Rx";
import { Giveaway } from "./models/Giveaway";
import { IdleState } from "./state/states/IdleState";
require("./styles.scss");

export class Main {
  private topBar: TopBarController;
  private coupons: CouponsController;
  private http: HttpService;
  private giveawaysRetriever: PageGiveawaysRetriever;
  private entererContext: EntererContext;

  constructor() {
  }

  public init(): void {
    this.instantiateObjects();
    this.bindCallbacks();
    this.idleContext();
  }

  private instantiateObjects(): void {
    this.topBar = new TopBarController();
    this.coupons = new CouponsController();
    this.http = new HttpService();
    this.giveawaysRetriever = new PageGiveawaysRetriever(this.http);
    this.entererContext = new EntererContext(
        this.giveawaysRetriever,
        this.topBar,
        this.coupons);
  }

  private bindCallbacks(): void {
    // Observable.fromEvent(this.topBar.getEnterButton(), "click")
    //     .switchMap(() => this.coupons.getCouponsObs())
    //     .subscribe((item: JQuery) => item.click());


    Observable.fromEvent(this.coupons.getCoupons(), "click")
        .map((item: JQueryEventObject) => $(item.currentTarget))
        .map((item: JQuery) => item.parents(".tickets-col"))
        .map((item: JQuery) => this.giveawaysRetriever.getGiveaway(item))
        .do((item: Giveaway) => console.log(item))
        .subscribe((item) => this.entererContext.startEntering([item]));
  }

  private idleContext(): void {
    this.entererContext.changeCurrentState(new IdleState(
        this.giveawaysRetriever,
        this.topBar,
        this.coupons));
  }
}

const main: Main = new Main();
main.init();