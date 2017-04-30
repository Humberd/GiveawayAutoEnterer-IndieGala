import { Giveaway } from "./Giveaway";
import { HttpService } from "../http/HttpService";
import { Observable } from "rxjs/Observable";
import { TopBarController } from "../views/TopBar/TopBarController";
import { AppState } from "../AppState";

export class PageGiveawaysRetriever {
  constructor(private httpService: HttpService,
              private topBarCtrl: TopBarController,
              private appState: AppState) {
  }

  public getAllGiveaways(): Giveaway[] {
    const rawGiveawayElements = $(".tickets-col");

    const result: Giveaway[] = [];

    rawGiveawayElements.each((intex, elem) => {
      const wrappedElem = $(elem);

      result.push(this.getGiveaway(wrappedElem));
    });

    return result;
  }

  public getGiveaway(elem: JQuery): Giveaway {
    const giveaway = new Giveaway(
        this.httpService,
        this.topBarCtrl,
        this.appState);
    giveaway.minLevel = this.getMinLevel(elem);
    giveaway.coinsPrice = this.getCoinsPrice(elem);
    giveaway.id = this.getId(elem);
    giveaway.isEntered = this.getIsEntered(elem);
    giveaway.title = this.getTitle(elem);
    giveaway.element = elem;

    return giveaway;
  }

  private getMinLevel(elem: any): number {
    if (elem.length !== 1) {
      throw Error(`getMinLevel() - Elem length must be 1, but instead is: ${elem}`);
    }

    const rawElement = elem.find(".type-level-cont");

    if (!rawElement.length) {
      throw Error("getMinLevel() - RawElement is empty");
    }

    const rawText = rawElement.text();
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
      throw Error(`getId() - Elem length must be 1, but instead is: ${elem}`);
    }
    const rawText = elem.find(".ticket-right > .relative[rel]").attr("rel");

    return parseInt(rawText);
  }

  private getCoinsPrice(elem: JQuery): number {
    if (elem.length !== 1) {
      throw Error(`getCoinsPrice() - Elem length must be 1, but instead is: ${elem}`);
    }
    const rawText = elem.find(".ticket-price > strong").text();

    return parseInt(rawText);
  }

  private getIsEntered(elem: JQuery): boolean {
    if (elem.length !== 1) {
      throw Error(`getIsEntered() - Elem length must be 1, but instead is: ${elem}`);
    }
    const couponElem = elem.find(".giv-coupon");

    return !couponElem.length;
  }

  private getTitle(elem: JQuery): string {
    if (elem.length !== 1) {
      throw Error(`getTitle() - Elem length must be 1, but instead is: ${elem}`);
    }
    const titleElem = elem.find(".box_pad_5 > h2 > a");

    return titleElem.attr("title");
  }
}