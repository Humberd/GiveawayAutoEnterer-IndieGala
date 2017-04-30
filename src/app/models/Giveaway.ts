import { HttpService } from "../http/HttpService";
import { EnterGiveawayRequest } from "../dto/EnterGiveawayRequest";
import { EnterGiveawayResponse } from "../dto/EnterGiveawayResponse";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { GiveawayState } from "./GiveawayState";
import { TopBarController } from "../views/TopBar/TopBarController";
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
              private topBarCtrl: TopBarController) {
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

  private enterGiveaway(): void {
    if (this.state === GiveawayState.IN_PROGRESS) {
      throw Error("Cannot enter Giveaway, because it's already IN_PROGRESS");
    }

    this.state = GiveawayState.IN_PROGRESS;
    this.addCouponLoadingAnimation();

    this.sendEnter()
        .subscribe(
            response => {
              if (response.status === "ok") {
                this.removeCoupon();
                this.isEntered = true;
                this.topBarCtrl.updateCoinsValue(response.new_amount);
              } else {
                console.warn(`Entering a '${this.title}' giveaway failed. Reason: ${response.status}`);
              }
            }, error => {
              console.error("There was some error: ", error)
            }, () => {
              this.state = GiveawayState.IDLE;
              this.removeCouponLoadingAnimation();
            })

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
        .subscribe(() => this.enterGiveaway())
  }

  /*
   Removes the coupon from DOM
   */
  private removeCoupon(): void {
    Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".giv-coupon"))
        .subscribe((coupon: JQuery) => coupon.remove());
  }

  /*
   Adds a loading animation of a coupon
   */
  private addCouponLoadingAnimation(): void {
    Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".giv-coupon"))
        .subscribe((coupon: JQuery) => console.log("Adding coupon loading animation..."));
  }

  /*
   Removes a loading animation of a coupon
   */
  private removeCouponLoadingAnimation(): void {
    Observable.of(this.element)
        .map((elem: JQuery) => elem.find(".giv-coupon"))
        .subscribe((coupon: JQuery) => console.log("Removing coupon loading animation."));
  }
}