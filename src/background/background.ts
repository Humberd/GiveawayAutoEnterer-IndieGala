import { Observable } from "rxjs";
import Port = chrome.runtime.Port;
chrome.runtime.onConnect.addListener(function (port: Port) {
  console.log(`Background - adding an onConnectListener:`);
  console.log(port);
  port.onMessage.addListener(function (msg: any) {
    console.log(`Background receiving a message:`);
    console.log(msg);
  });

  port.
  Observable.timer(0, 1000)
      .subscribe(item => port.postMessage({index: item}));
});
