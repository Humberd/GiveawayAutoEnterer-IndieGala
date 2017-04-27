import { Observable } from "rxjs/Observable";
import { DisplayControllable } from "../DisplayControllable";
const rawTemplate = require("./CoinsDisplayView.html");

export class CoinsDisplayController implements DisplayControllable {
  private readonly templateDomSelector = ".libd-right";
  private readonly defaultCoinsDomSelector = ".account-galamoney";

  private readonly template: JQuery = $(rawTemplate);

  constructor() {
    this.cleanDomSpace();
    this.insertDomView();
    this.loadDefaultCoinsValue();
  }

  /*Remove garbage elements*/
  cleanDomSpace(): void {
    Observable.from([1, 2, 3])
        .subscribe(item => {
          $(`${this.templateDomSelector} > *:first-child`).remove();
        })
  }

  loadDefaultCoinsValue(): void {
    Observable.create(() => $(`${this.defaultCoinsDomSelector}`))
        .map((elem: JQuery) => {
          if (elem.length === 0) {
            // return Observable.throw(new Error());
            throw new Error("No default Coins Value!")
          }

          return elem[0];
        })
        .retryWhen(errors => {
          return errors.scan((errorCount, err) => {
            if (errorCount > 5) {
              console.log(err);
              throw err;
            }
            console.log("Getting a default Coins Value failed. Retrying...");
            return errorCount + 1;
          }, 0)
              .delay(500)
        })
        .subscribe(
            success => console.info("Successfully loaded a default Coins Value"),
            error => console.warn("Could not get a default Coins Value")
        );

  }

  insertDomView(): void {
    $(this.templateDomSelector).prepend(this.template);
  }
}