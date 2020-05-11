import { Injectable, OnInit } from '@angular/core';
import { Observable, defer, isObservable, of } from 'rxjs';
import { shareReplay, first, mergeMap, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  returnObs$: Observable<any>;
  createReturnObs = (obs: Observable<any>, time: number, bufferReplays: number) =>
    (this.returnObs$ = obs.pipe(shareReplay(bufferReplays, time)));
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  renewAfterTimer(obs: Observable<any>, time: number, bufferReplays: number = 1) {
    return this.createReturnObs(obs, time, bufferReplays).pipe(
      first(null, defer(() => this.createReturnObs(obs, time, bufferReplays))),
      mergeMap(d => (isObservable(d) ? d : of(d))),
    );
  }

  getCall() {
    return this.http.get(`https://reqres.in/api/users?page=2`);
  }
}
