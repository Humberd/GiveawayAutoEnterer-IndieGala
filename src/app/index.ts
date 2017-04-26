require("./styles.scss");
import { CoinsDisplayController } from "./CoinsDisplay/CoinsDisplayController";

export class Main {
  private coinsDisplayController: CoinsDisplayController;

  constructor() {
  }

  public init(): void {
    this.coinsDisplayController = new CoinsDisplayController();
  }
}

const main: Main = new Main();
main.init();


// var port = chrome.runtime.connect({name: "knockknodck"});
// Observable.fromEventPattern((h: any) => {
//   port.onMessage.addListener(h);
// }, (h: any) => {
//   console.log("disconnecting");
//   port.onMessage.removeListener(h);
// }).subscribe(message => {
//   console.log("Client Receiving a message");
//   console.log(message);
// });
