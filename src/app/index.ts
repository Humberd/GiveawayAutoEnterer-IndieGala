import "rxjs";
import { TopBarController } from "./views/TopBar/TopBarController";
import { HttpService } from "./http/HttpService";
import { PageGiveawaysRetriever } from "./GiveawaysEnterer/PageGiveawaysRetriever";
import { Observable } from "rxjs/Observable";
import { EntererContext } from "./state/EntererContext";
require("./styles.scss");

export class Main {
  private topBar: TopBarController;
  private http: HttpService;
  private giveawaysRetriever: PageGiveawaysRetriever;
  private entererContext: EntererContext;

  constructor() {
  }

  public init(): void {
    this.instantiateObjects();
    this.bindCallbacks();
  }

  private instantiateObjects(): void {
    this.topBar = new TopBarController();
    this.http = new HttpService();
    this.giveawaysRetriever = new PageGiveawaysRetriever(this.http);
    this.entererContext = new EntererContext(
        this.giveawaysRetriever,
        this.topBar);
  }

  private bindCallbacks(): void {

    Observable.fromEvent(this.topBar.getEnterButton(), "click")
        .subscribe((item) => this.entererContext.startEntering());
  }
}

const main: Main = new Main();
main.init();