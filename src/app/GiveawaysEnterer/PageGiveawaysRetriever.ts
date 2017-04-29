import { Giveaway } from "../models/Giveaway";
import { HttpService } from "../http/HttpService";

export class PageGiveawaysRetriever {
  constructor(private httpService: HttpService) {
  }

  public getPageGiveaways(): Giveaway[] {
    const rawGiveaways = $(".tickets-col");

    const response: Giveaway[] = [];

    rawGiveaways.each((index, rawGiveaway) => {
      const wrappedRawGiveaway = $(rawGiveaway);

      const giveaway = new Giveaway(this.httpService);
      giveaway.minLevel = this.getMinLevel(wrappedRawGiveaway);
      giveaway.coinsPrice = this.getCoinsPrice(wrappedRawGiveaway);
      giveaway.id = this.getId(wrappedRawGiveaway);
      giveaway.isEntered = this.getIsEntered(wrappedRawGiveaway);
      giveaway.element = wrappedRawGiveaway;

      response.push(giveaway);
    });

    return response;
  }

  private getMinLevel(elem: any): number {
    if (elem.length !== 1) {
      throw Error(`getMinLevel - Elem length must be 1, but instead is: ${elem}`);
    }

    const rawText = elem.find(".type-level-cont").text();
    const index = rawText.indexOf("+");


    let reversedResult: any[] = [];

    for (let i = index - 1; ; --i) {
      if (rawText[i] === " ") {
        break;
      }

      if (i < 0) {
        throw Error("getMinLevel - Infinite loops");
      }

      reversedResult.push(rawText[i])
    }

    return parseInt(reversedResult.reverse().join(""));
  }

  private getId(elem: JQuery): number {
    if (elem.length !== 1) {
      throw Error(`getId - Elem length must be 1, but instead is: ${elem}`);
    }
    const rawText = elem.find(".ticket-right > .relative[rel]").attr("rel");

    return parseInt(rawText);
  }

  private getCoinsPrice(elem: JQuery): number {
    if (elem.length !== 1) {
      throw Error(`getCoinsPrice - Elem length must be 1, but instead is: ${elem}`);
    }
    const rawText = elem.find(".ticket-price > strong").text();

    return parseInt(rawText);
  }

  private getIsEntered(elem: JQuery): boolean {
    if (elem.length !== 1) {
      throw Error(`getCoinsPrice - Elem length must be 1, but instead is: ${elem}`);
    }
    const couponElem = elem.find(".giv-coupon");

    return !couponElem.length;
  }
}