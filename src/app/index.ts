import "rxjs";
import { Observable } from "rxjs";

export class Foo {
  foo: string = "baa";
}

var port = chrome.runtime.connect({name: "knockknodck"});
Observable.fromEventPattern((h: any) => {
  port.onMessage.addListener(h);
}, (h: any) => {
  console.log("disconnecting");
  port.onMessage.removeListener(h);
}).subscribe(message => {
  console.log("Client Receiving a message");
  console.log(message);
});
