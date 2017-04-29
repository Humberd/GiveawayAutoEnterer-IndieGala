import { EnterButtonController } from "./GiveawaysEnterer/EnterButtonController";
require("./styles.scss");
import "rxjs";
import { PageGiveawaysRetriever } from "./GiveawaysEnterer/PageGiveawaysRetriever";
import { TopBarController } from "./TopBar/TopBarController";

export class Main {
  private enterButtonController: EnterButtonController;
  private enterService: PageGiveawaysRetriever;
  private topBar: TopBarController;

  constructor() {
  }

  public init(): void {
    this.topBar = new TopBarController();
    // this.enterButtonController = new EnterButtonController();
    // this.enterService = new PageGiveawaysRetriever();
    // const giveaways = this.enterService.getPageGiveaways();
    // console.table(giveaways);
    const requestBody: EnterGiveawayRequest = {
      giv_id: "238490",
      ticket_price: "1"
    };

    $.ajax("https://www.indiegala.com/giveaways/new_entrydd", {
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(requestBody),
      success: function () {
        console.log("success");
        console.log(arguments);
      },
      error: function () {
        console.log("error");
        console.log(arguments);
      }
    })
  }
}

const main: Main = new Main();
main.init();