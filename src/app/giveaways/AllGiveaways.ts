import { TopBarController } from "../views/TopBar/TopBarController";
import { EnteringStorageSave } from "../dto/EnteringStorageSave";
import { AppState } from "../AppState";
import { Observable } from "rxjs/Observable";
import { Giveaway } from "./Giveaway";
import { EnterGiveawayResponse } from "../dto/EnterGiveawayResponse";

export class AllGiveaways {
  private storage: Storage;
  private _state: EnteringStorageSave;

  constructor(private topBarCtrl: TopBarController,
              private appState: AppState) {
    this.storage = sessionStorage;
  }

  get state(): EnteringStorageSave {
    return this._state;
  }

  set state(value: EnteringStorageSave) {
    this._state = value;
    this.storage.setItem("gaeState", JSON.stringify(value));
    this.topBarCtrl.updateCurrentStateValue(value.enteringState);
  }

  public startSequence(): void {
    this.state = {enteringState: "IN_PROGRESS"};
    window.location.href = "https://www.indiegala.com/giveaways/1";
  }

  public stopSequence(): void {
    this.state = {enteringState: "IDLE"};
  }

  public retrieveState(): void {
    let rawStorageSave = this.storage.getItem("gaeState");
    if (rawStorageSave) {
      this.state = JSON.parse(rawStorageSave);
    } else {
      this.state = {enteringState: "IDLE"};
    }
  }

  public initializeState(): void {
    if (this.state.enteringState === "IDLE") {
      this.topBarCtrl.enableEnterButton();
      this.topBarCtrl.disableStopButton();
    } else if (this.state.enteringState === "IN_PROGRESS") {
      this.topBarCtrl.disableEnterButton();
      this.topBarCtrl.enableStopButton();

      this.enterAll()
          .do((response: EnterGiveawayResponse) => {
              if (this.appState.userCoins <=1) {
                throw Error(`User coins reached: ${this.appState.userCoins}`);
              }
          })
          .do(() => {
              if (this.state.enteringState ==="IDLE") {
                throw Error(`Stopping - the status has changed to IDLE`);
              }
          })
          .subscribe(
              (success) => {
                console.log(success);
              },
              (error) => {
                console.warn("Page sequence error: ", error);
                this.state = {enteringState: "IDLE"};
                this.topBarCtrl.enableEnterButton();
                this.topBarCtrl.disableStopButton();
              },
              () => {
                console.info("Page sequence completed");
                console.info("Going to the next page...");
                setTimeout(() => {
                  this.goToNextPage();
                }, 2000);
              }
          )
    }
  }

  public enterAll(): Observable<EnterGiveawayResponse> {
    return Observable.from(this.appState.giveaways)
        .filter((giveaway: Giveaway) => !giveaway.isEntered)
        .concatMap((giveaway: Giveaway) => {
          return Observable.of(giveaway)
              .concatMap((giveawayInner: Giveaway) => giveawayInner.enterGiveaway())
              .delay(300)
        })
  }

  private goToNextPage(): void {
    const currentPathName = window.location.pathname;
    let newPathName = currentPathName.split("/");
    newPathName[2] = (<any>newPathName[2] - (-1)).toString();
    window.location.pathname = newPathName.join("/");
  }
}