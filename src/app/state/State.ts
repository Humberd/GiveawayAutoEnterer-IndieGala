import { EntererContext } from "./EntererContext";
import { Giveaway } from "../models/Giveaway";

export interface State {
  start(giveaways: Giveaway[], entererContext: EntererContext): void;
  stop(entererContext: EntererContext): void;
  getName(): string;
}