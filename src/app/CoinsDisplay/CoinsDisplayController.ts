import { Observable } from "rxjs/Observable";
var temp = require("./CoinsDisplayView.html");

export class CoinsDisplayController {
  private domSelector: string = ".libd-right";

  constructor() {
    this.cleanDomSpace();
    this.insertDomView();
  }

  private cleanDomSpace(): void {
    Observable.from([1, 2, 3])
        .subscribe(item => {
          $(`${this.domSelector} > *:first-child`).remove();
        })
  }

  private insertDomView(): void {
    $(this.domSelector).prepend(temp)
  }

}