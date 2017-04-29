import "rxjs";
import { TopBarController } from "./TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./GiveawaysEnterer/PageGiveawaysRetriever";
require("./styles.scss");

export class Main {
  private topBar: TopBarController;
  private http: HttpService;
  private giveawaysRetriever: PageGiveawaysRetriever;

  constructor() {
  }

  public init(): void {
    this.instantiateObjects();
    this.bindCallbacks();
  }

  private instantiateObjects(): void {
    this.topBar = new TopBarController();
    this.http = new HttpService();
    this.giveawaysRetriever = new PageGiveawaysRetriever();
  }

  private bindCallbacks(): void {
    this.topBar.getEnterButton()
        .click(() => {
          const giveaways = this.giveawaysRetriever.getPageGiveaways();

          console.table(giveaways);
        });
  }
}

const main: Main = new Main();
main.init();