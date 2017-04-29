import { Giveaway } from "../models/Giveaway";
export class PageGiveawaysRetriever {
  constructor() {

  }

  public getPageGiveaways(): Giveaway[] {
    const rawGiveaways = $(".tickets-col");

    const response: Giveaway[] = [];

    rawGiveaways.each((index, rawGiveaway) => {
      const wrappedRawGiveaway = $(rawGiveaway);

      const giveaway: Giveaway = {
        minLevel: this.getMinLevel(wrappedRawGiveaway),
        coinsPrice: this.getCoinsPrice(wrappedRawGiveaway),
        id: this.getId(wrappedRawGiveaway),
        isEntered: this.getIsEntered(wrappedRawGiveaway),
        element: wrappedRawGiveaway
      };
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