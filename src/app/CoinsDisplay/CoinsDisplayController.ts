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

  insertDomView(): void {
    $(this.templateDomSelector).prepend(this.template);
  }

  private loadDefaultCoinsValue(): void {
    Observable.of(5)
        .delay(2000)
        .map(() => $(`${this.defaultCoinsDomSelector}`))
        .subscribe((elem: JQuery) => {
          if (elem.length !== 0) {
            this.updateValue(elem.text())
          }
        });
  }

  public updateValue(value: number | string): void {
    this.template.children(".gae-value").text(value);
  }
}