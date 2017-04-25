import { Observable } from "rxjs";
Observable.timer(0, 1000)
    .switchMap(index => Observable.of(index))
    .subscribe(index => console.log(index));