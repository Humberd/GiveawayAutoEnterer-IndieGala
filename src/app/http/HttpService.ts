import { EnterGiveawayRequest } from "../dto/EnterGiveawayRequest";
import { Observable } from "rxjs/Observable";
import { EnterGiveawayResponse } from "../dto/EnterGiveawayResponse";
export class HttpService {
  constructor() {

  }

  public enterGiveaway(body: EnterGiveawayRequest): Observable<EnterGiveawayResponse> {
    if (!body) {
      throw Error(`enterGiveaway() - Body must be an object, but instead is: ${body}`);
    }

    const promise = $.ajax({
      url: "https://www.indiegala.com/giveaways/new_entry",
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(body)
    }).promise();

    //status: duplicate, server_error, not_available, unauthorized, ok
    return Observable.fromPromise(<any> promise);
  }
}