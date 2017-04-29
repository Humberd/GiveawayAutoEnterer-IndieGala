import { Observable } from "rxjs/Observable";
const rawCouponHover = require("./CouponHover.html");

export class CouponsController {
  private readonly couponsDomSelector = ".tickets-col .giv-coupon";

  private readonly coupons: JQuery;

  constructor() {
    this.coupons = $(this.couponsDomSelector);

    this.init();
  }

  private init(): void {
    console.info("Preparing Coupons...");
    this.cleanDomSpace();
    console.info("Coupons prepared.");
  }


  /*
    Removed a link from a coupon
   */
  private cleanDomSpace(): void {
    this.getCouponsObs()
        .map((coupon: JQuery) => coupon.find(".giv-coupon-link"))
        .subscribe((couponLink: JQuery) => couponLink.remove())
  }



  /*
    Gets coupons as Observalbe
   */
  public getCouponsObs(): Observable<JQuery> {
    return Observable.from(this.coupons)
        .map(rawCoupon => $(rawCoupon));
  }

  /*
    Gets coupons
   */
  public getCoupons(): JQuery {
    return this.coupons;
  }
}