import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Stack {
  name: string;
  image: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StacksService {
  private stackOne$ = new BehaviorSubject<Stack[]>([]);
  private stackTwo$ = new BehaviorSubject<Stack[]>([]);
  private stackThree$ = new BehaviorSubject<Stack[]>([]);
  private stackFour$ = new BehaviorSubject<Stack[]>([]);

  constructor(private http: HttpClient) {}

  public init(): void {
    const url = "https://raw.githubusercontent.com/lin8231/Stack-Provider/master"
    this.http.get<Stack[]>(url+'/stack1.json').subscribe(stacks => {
      this.stackOne$.next(stacks);
    })

    this.http.get<Stack[]>(url+'/stack2.json').subscribe(stacks => {
      this.stackTwo$.next(stacks);
    })

    this.http.get<Stack[]>(url+'/stack3.json').subscribe(stacks => {
      this.stackThree$.next(stacks);
    })

    this.http.get<Stack[]>(url+'/stack4.json').subscribe(stacks => {
      this.stackFour$.next(stacks);
    })
  }

  public getStackOne(): Observable<Stack[]> {
    return this.stackOne$
  }

  public getStackTwo(): Observable<Stack[]> {
    return this.stackTwo$
  }

  public getStackThree(): Observable<Stack[]> {
    return this.stackThree$
  }

  public getStackFour(): Observable<Stack[]> {
    return this.stackFour$
  }
}
