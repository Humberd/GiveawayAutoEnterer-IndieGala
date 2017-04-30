import { HttpService } from "../http/HttpService";
import { EnterGiveawayRequest } from "../dto/EnterGiveawayRequest";
import { EnterGiveawayResponse } from "../dto/EnterGiveawayResponse";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { GiveawayState } from "./GiveawayState";
import { TopBarController } from "../views/TopBar/TopBarController";
import { AppState } from "../AppState";
const animationTemplate = require("../views/Coupon/CouponAnimation.html");

export class Giveaway {
  id: number;
  minLevel: number;
  coinsPrice: number;
  title: string;
  isEntered: boolean;
  element: JQuery;

  private enterClickSub: Subscription;
  private state: GiveawayState;
  private readonly animationElem: JQuery;

  constructor(private httpService: HttpService,
              private topBarCtrl: TopBarController,
              private appState: AppState) {
    this.state = GiveawayState.IDLE;
    this.animationElem = $(animationTemplate);
  }

  /*
   Sends an enter giveaways request
   */
  private sendEnter(): Observable<EnterGiveawayResponse> {
    const body: EnterGiveawayRequest = {
      ticket_price: this.coinsPrice.toString(),
      giv_id: this.id.toString()
    };

    return this.httpService.enterGiveaway(body);
  }

  public enterGiveaway(): Observable<EnterGiveawayResponse> {
    if (this.state === GiveawayState.IN_PROGRESS) {
      throw Error("Cannot enter Giveaway, because it's already IN_PROGRESS");
    }

    return this.showLoadingFrame()
        .do(() => this.state = GiveawayState.IN_PROGRESS)
        .flatMap(() => this.startLoadingAnimation())
        .flatMap(() => this.sendEnter())
        .do((response: EnterGiveawayResponse) => {
          if (response.status === "ok") {
            this.successRequest(response);
          } else {
            this.failRequest(response);
          }
          this.state = GiveawayState.IDLE;
        })
        .catch(error => {
          this.failRequest(error);
          this.state = GiveawayState.IDLE;
          throw error;
        });
  }

  private successRequest(response: EnterGiveawayResponse): void {
    this.isEntered = true;
    this.topBarCtrl.updateCoinsValue(response.new_amount);
    this.appState.userCoins = response.new_amount;

    this.stopLoadingAnimation()
        .flatMap(() => this.startSuccessAnimation())
        .delay(5000)
        .flatMap(() => this.stopSuccessAnimation())
        .flatMap(() => this.hideLoadingFrame())
        .do(() => this.removeCoupon())
        .subscribe();
  }

  private failRequest(response: EnterGiveawayResponse): void {
    console.warn(`Entering a '${this.title}' giveaway failed. Reason: ${response.status}`);

    this.stopLoadingAnimation()
        .flatMap(() => this.startErrorAnimation())
        .delay(5000)
        .flatMap(() => this.stopErrorAnimation())
        .flatMap(() => this.hideLoadingFrame())
        .subscribe();
  }


  /*
   Removes a default click link from DOM
   */
  public unbindCouponDefaultClick(): void {
    Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".giv-coupon-link"))
        .subscribe((couponLink: JQuery) => couponLink.remove());
  }

  /*
   Adds element that will display animations
   */
  public addAnimationsElement(): void {
    Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".giv-coupon"))
        .subscribe((coupon: JQuery) => coupon.after(this.animationElem));
  }

  /*
   Bind click event to a coupon
   */
  public bindCouponEnterClick(): void {
    if (this.enterClickSub && this.enterClickSub.closed) {
      console.warn("Cannot bind a coupon enter clik..., sub: ", this.enterClickSub);
      return;
    }

    this.enterClickSub = Observable.fromEvent(this.element.find(".giv-coupon"), "click")
        .filter(() => this.state === GiveawayState.IDLE)
        .flatMap(() => this.enterGiveaway())
        .subscribe()
  }

  /*
   Removes the coupon from DOM
   */
  private removeCoupon(): void {
    Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".giv-coupon"))
        .subscribe((coupon: JQuery) => coupon.remove());
  }


  //////////////////////////////////////////

  private showLoadingFrame(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame"))
        .do((elem: JQuery) => elem.removeClass("gae-hide"));
  }

  private hideLoadingFrame(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame"))
        .do((elem: JQuery) => elem.addClass("gae-hide"));
  }

  private startLoadingAnimation(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame .loader"))
        .do((elem: JQuery) => elem.removeClass("gae-hide"));
  }

  private stopLoadingAnimation(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame .loader"))
        .do((elem: JQuery) => elem.addClass("gae-hide"));
  }

  private startSuccessAnimation(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame .success"))
        .do((elem: JQuery) => elem.removeClass("gae-hide"));
  }

  private stopSuccessAnimation(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame .success"))
        .do((elem: JQuery) => elem.addClass("gae-hide"));
  }

  private startErrorAnimation(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame .error"))
        .do((elem: JQuery) => elem.removeClass("gae-hide"));
  }

  private stopErrorAnimation(): Observable<JQuery> {
    return Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".gae-loading-frame .error"))
        .do((elem: JQuery) => elem.addClass("gae-hide"));
  }
}