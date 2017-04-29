import { HttpService } from "../http/HttpService";
import { EnterGiveawayRequest } from "../dto/EnterGiveawayRequest";
import { EnterGiveawayResponse } from "../dto/EnterGiveawayResponse";
import { Observable } from "rxjs/Observable";

export class Giveaway {
  id: number;
  minLevel: number;
  coinsPrice: number;
  isEntered: boolean;
  element: JQuery;

  constructor(private httpService: HttpService) {
  }

  public sendEnter(): Observable<EnterGiveawayResponse> {
    const body: EnterGiveawayRequest = {
      ticket_price: this.coinsPrice.toString(),
      giv_id: this.id.toString()
    };

    return this.httpService.enterGiveaway(body);
  }
}