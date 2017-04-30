import { TopBarController } from "../views/TopBar/TopBarController";
import { Observable } from "rxjs/Observable";
import { EnteringStorageSave } from "../dto/EnteringStorageSave";

export class AllGiveaways {
  private storage: Storage;
  public state: EnteringStorageSave;

  constructor(private topBarCtrl: TopBarController) {
    this.storage = sessionStorage;
  }

  public startSequence(): void {
    const newState: EnteringStorageSave = {
      enteringState: "IN_PROGRESS",
      currentPage: "1"
    };
    this.storage.setItem("gaeState", JSON.stringify(newState));
    window.location.href = "https://www.indiegala.com/giveaways/1";
  }

  public endSequence(): void {
    const newState: EnteringStorageSave = {
      enteringState: "IDLE",
      currentPage: "1"
    };
    this.state = newState;
    this.storage.setItem("gaeState", JSON.stringify(newState));
  }

  public verifyEnteringState(): void {
    this.topBarCtrl.disableEnterButton();
    /*Wait 0.5 sec for the rest application to bind all callbacks*/
    Observable.timer(500)
        .subscribe(() => {
          this.retrieveStorageState();

        });
  }

  private retrieveStorageState(): void {
    let rawStorageSave = this.storage.getItem("gaeState");
    if (!rawStorageSave) {
      const newState: EnteringStorageSave = {
        enteringState: "IDLE",
        currentPage: "1"
      };
      this.storage.setItem("gaeState", JSON.stringify(newState));
    }
    rawStorageSave = this.storage.getItem("gaeState");

    this.state = JSON.parse(rawStorageSave);
    switch (this.state.enteringState) {
      case "IDLE":
        this.topBarCtrl.enableEnterButton();
        break;
      case "IN_PROGRESS":
        this.topBarCtrl.disableEnterButton();

        break;
    }

  }
}