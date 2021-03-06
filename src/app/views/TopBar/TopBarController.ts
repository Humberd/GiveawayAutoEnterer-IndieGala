import { Observable } from "rxjs/Observable";
const rawTemplate = require("./TopBarView.html");

export class TopBarController {
  private readonly appendDomSelector = ".libd-right";

  private readonly template: JQuery;

  constructor() {
    this.template = $(rawTemplate);

    this.init();
  }

  private init(): void {
    console.info("Initializing a TopBar...");
    this.cleanDomSpace();
    this.insertDomView();
    console.info("TopBar initialized.")
  }

  /*
    Prepares a place in a DOM to insert a template.
    Removes unneccessary element a the top of the page.
   */
  private cleanDomSpace(): void {
    Observable.from([1, 2, 3])
        .subscribe(item => {
          $(`${this.appendDomSelector} > *:first-child`).remove();
        })
  }

  /*
    Inserts a template to a desired place
   */
  private insertDomView(): void {
    $(this.appendDomSelector).prepend(this.template);
  }

  /*
    Updates GalaSilver coins value
   */
  public updateCoinsValue(value: number | string): void {
    const elem = this.template.find(".gae-coins .gae-value");
    if (!elem.length) {
      throw Error("updateCoinsValue() - Cannot find .gae-coins .gae-value");
    }

    elem.text(value);
  }


  /*
    Gets an enter button
   */
  public getEnterButton(): JQuery {
    const button = this.template.find(".gae-enter-button");
    if (!button.length) {
      throw Error("getEnterButton() - Cannot find .gae-enter-button");
    }

    return button;
  }

  public enableEnterButton(): void {
    this.getEnterButton().prop("disabled", false);
  }

  public disableEnterButton(): void {
    this.getEnterButton().prop("disabled", true);
  }

  /*
    Get stop button
   */
  public getStopButton(): JQuery {
    const button = this.template.find(".gae-stop-button");
    if (!button.length) {
      throw Error("getEnterButton() - Cannot find .gae-stop-button");
    }

    return button;
  }

  public enableStopButton(): void {
    this.getStopButton().prop("disabled", false);
  }

  public disableStopButton(): void {
    this.getStopButton().prop("disabled", true);
  }
  /*
    Updates current state name
   */
  public updateCurrentStateValue(value: string): void {
    const elem = this.template.find(".gae-state .gae-value");
    if (!elem.length) {
      throw Error("updateCurrentStateValue() - Cannot find .gae-state .gae-value");
    }

    elem.text(value);
  }
}