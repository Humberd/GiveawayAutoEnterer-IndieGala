import { EntererContext } from "./EntererContext";
export interface State {
  start(entererContext: EntererContext): void;
  stop(entererContext: EntererContext): void;
  getName(): string;
}