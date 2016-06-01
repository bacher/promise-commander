# Promise-Commander

Library for limiting parallel work.

### Installation:

```
npm install --save promise-commanders
```

### Usage:

#### API:

**map** Perform parallel task execution:
```javascript
pc.map(tasks, callback);
```
* tasks (Array) - Array of arguments for commands;
* callback: (arg, i) => *|Promise - Function that calls on task;

**mapLimit** Perform parallel task execution with worker limit:
```javascript
pc.mapLimit(tasksCount, parallelCount, callback);
```
* tasks (Array) - Array of arguments for commands;
* parallelCount (number) - Count of parallel work tasks;
* callback (arg, i) => *|Promise - Function that calls on task;

**mapSeries** Perform sequential task execution:
```javascript
pc.mapSeries(tasksCount, callback);
```
* tasks (Array) - Array of arguments for commands;
* callback (arg, i) => *|Promise - Function that calls on task;


#### Example:
```javascript
pc.mapLimit([1, 2, 3], 2, value => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(value);
            resolve();
        }, 10);
    });
}).then(() => console.log('OK'));
```
