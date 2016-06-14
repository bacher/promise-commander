# Promise-Commander

Library for limiting parallel work.

### Installation:

```
npm install --save promise-commander
```

### Usage:

PC has 3 groups of method (parallel, limit, series), each group contains **"each"** and **"map"** variant.

#### API:

**each** Perform parallel task execution.
**map** Perform parallel task execution and return results:
```javascript
pc.each(tasks, iterationCallback).then(() => ...);
pc.map(tasks, iterationCallback).then(results => ...);
```
* tasks (Array) - Array of arguments for commands;
* iterationCallback: (arg, i) => *|Promise - Function that calls on task;

**eachLimit** Perform parallel task execution with worker limit.
**mapLimit** Perform parallel task execution with worker limit and return results:
```javascript
pc.eachLimit(tasks, parallelCount, iterationCallback).then(() => ...);
pc.mapLimit(tasks, parallelCount, iterationCallback).then(results => ...);
```
* tasks (Array) - Array of arguments for commands;
* parallelCount (number) - Count of parallel work tasks;
* iterationCallback (arg, i) => *|Promise - Function that calls on task;

**eachSeries** Perform sequential task execution.
**mapSeries** Perform sequential task execution and return results:
```javascript
pc.eachSeries(tasks, iterationCallback).then(() => ...);
pc.mapSeries(tasks, iterationCallback).then(results => ...);
```
* tasks (Array) - Array of arguments for commands;
* iterationCallback (arg, i) => *|Promise - Function that calls on task;


#### Example:
```javascript
var PC = require('promise-commander');

PC.mapLimit([1, 2, 3], 2, value => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(value);
            resolve();
        }, 10);
    });
}).then(() => console.log('OK'));
```
