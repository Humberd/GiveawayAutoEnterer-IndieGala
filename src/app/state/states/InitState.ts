import { State } from "../State";
import { EntererContext } from "../EntererContext";
import { Giveaway } from "../../models/Giveaway";

export class InitState implements State {
  start(giveaways: Giveaway[], entererContext: EntererContext): void {
    throw Error("InitState - cannot start");
  }

  stop(entererContext: EntererContext): void {
    throw Error("InitState -cannot stop");
  }

  getName(): string {
    return "Init";
  }

}