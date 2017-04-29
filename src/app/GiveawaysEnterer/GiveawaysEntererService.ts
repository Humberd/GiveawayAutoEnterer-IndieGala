import { Giveaway } from "./Giveaway";
export class GiveawaysEntererService {
  constructor() {

  }

  public getPageGiveaways(): Giveaway[] {
    console.log("hello");
    const rawGiveaways = $(".tickets-col");

    const response: Giveaway[] = [];

    rawGiveaways.each((index, rawGiveaway) =>{
      const giveaway:Giveaway = {
        minLevel: this.getMinLevel(rawGiveaway),
        coinsPrice: this.getCoinsPrice($(rawGiveaway)),
        id: this.getId($(rawGiveaway))
      };
      response.push(giveaway);
    });

    return response;
  }

  private getMinLevel(elem: any): number {
    if (elem.length !== 1) {
      throw Error(`getMinLevel - Elem length must be 1, but instead is: ${elem}`);
    }

    const children = elem.children(".type-level-cont");

    const rawText = elem.children(".type-level-cont").text();
    const index = rawText.indexOf("+");


    let reversedResult: any[] = [];

    // for (let i = index - 1; ; --i) {
    //   if (rawText[i] === " ") {
    //     break;
    //   }
    //
    //   reversedResult.push(rawText[i])
    // }

    return parseInt(reversedResult.reverse().join(""));
  }

  private getId(elem: JQuery): number {
    if (elem.length !== 1) {
      throw Error(`getId - Elem length must be 1, but instead is: ${elem}`);
    }
    const rawText = elem.children(".ticket-right > .relative[rel]").attr("rel");

    return parseInt(rawText);
  }

  private getCoinsPrice(elem: JQuery): number {
    if (elem.length !== 1) {
      throw Error(`getCoinsPrice - Elem length must be 1, but instead is: ${elem}`);
    }
    const rawText = elem.children(".ticket-price > strong").text();

    return parseInt(rawText);
  }
}