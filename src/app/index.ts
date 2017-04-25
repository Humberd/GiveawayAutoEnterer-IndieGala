import "rxjs";
import { Observable } from "rxjs";

export class Foo {
  foo: string = "baa";
}
Observable.timer(0, 2000)
    .subscribe(index => console.log(index));

console.log("dupa");
Observable.interval(3000)
    .subscribe(item => console.log($));