// create observable

console.log('RxJS Observables Example of(');
//1. of()
import { of } from 'rxjs';
const observable = of(1, 2, 3, 4, 5);
// subscribe to observable
observable.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (err) => console.error(`Error: ${err}`),
  complete: () => console.log('Completed')
});

console.log('RxJS Observables Example from()');

//2. from()
import { from } from 'rxjs';
const array = [1, 2, 3, 4, 5]; 
const observableFromArray = from(array);//convert itrable to observable
observableFromArray.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (err) => console.error(`Error: ${err}`),
  complete: () => console.log('Completed')
});


console.log('RxJS Observables Example interval()');
//3. interval()
import { interval } from 'rxjs';
const observableInterval = interval(1000); // emits value every second
const subscribe =observableInterval.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (err) => console.error(`Error: ${err}`),
  complete: () => console.log('Completed')
});

setTimeout(() => {
    subscribe.unsubscribe(); // Unsubscribe after 5 seconds
  console.log('Unsubscribed from interval observable');
}, 5000);


console.log('RxJS Observables Example timer()');

//4. timer()
import { timer } from 'rxjs';
const observableTimer = timer(2000, 1000); // starts after 2 seconds
const timerSubscription = observableTimer.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (err) => console.error(`Error: ${err}`),
  complete: () => console.log('Completed')
}); 
timerSubscription.unsubscribe(); // Unsubscribe immediately
console.log('Unsubscribed from timer observable');