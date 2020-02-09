import { Component } from '@angular/core';
import { Observable, Subject, interval, of } from 'rxjs';
import { take, map, filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  observable$;
  mySubject$;

  ngOnInit() {
    // Create Observabes
    this.observable$ = new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);

      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    // Subscribe observable
    this.observable$.subscribe({
      next(x) {
        console.log('got value: ' + x);
      },
      error(err) {
        console.log('Got something wrong ' + err);
      },
      complete() {
        console.log('done');
      }
    });
    console.log('just after subscribe');


    // Use Subject
    this.mySubject$ = new Subject();
    this.mySubject$.subscribe(data => {
      console.log('first subscriber : ' + data);
    });
    this.mySubject$.next(1);
    this.mySubject$.next(2);

    // this.mySubject$.complete();
    // this.mySubject$.unsubscribe();  // Should use

    this.mySubject$.subscribe(data => {
      console.log('second subscriber : ' + data);
    });
    this.mySubject$.next(3);

    // Use Operator
      // Interval
      // Take
      // filter
    const numbers$ = interval(1000);
    numbers$
    .pipe(take(5))
    .pipe(map(x => x * 10))
    .pipe(filter(x => x > 20)) 
    .subscribe(x => console.log(x)); 


      // MergeMap
    console.log("Merge Map examples");
    let letters$ = of('a', 'b', 'c', 'd', 'e');

    const result = letters$.pipe(
      mergeMap(x => interval(1000).pipe(map(i => x + i))),
    );

    result.subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
  }

}
