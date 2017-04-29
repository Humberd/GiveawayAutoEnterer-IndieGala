import "rxjs";
import { TopBarController } from "./TopBar/TopBarController";
import { EnterGiveawayRequest } from "./dto/EnterGiveawayRequest";
import { HttpService } from "./http/HttpService";
require("./styles.scss");

export class Main {
  private topBar: TopBarController;
  private http: HttpService;

  constructor() {
  }

  public init(): void {
    this.topBar = new TopBarController();
    this.http = new HttpService();

    const requestBody: EnterGiveawayRequest = {
      giv_id: "235797",
      ticket_price: "5"
    };

    this.http.enterGiveaway(requestBody)
        .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            })
  }
}

const main: Main = new Main();
main.init();