# Promise-Commander

Library for limiting parallel work.

### Installation:

```
npm install --save promise-commanders
```

### Usage:

#### API:

```javascript
pc.map(tasks, callback);
```
Perform parallel task execution.
* tasks (Array) - Array of arguments for commands;
* callback: (arg, i) => *|Promise - Function that calls on task;

```javascript
pc.mapLimit(tasksCount, parallelCount, callback);
```
Perform parallel task execution with worker limit.
* tasks (Array) - Array of arguments for commands;
* parallelCount (number) - Count of parallel work tasks;
* callback (arg, i) => *|Promise - Function that calls on task;

```javascript
pc.mapSeries(tasksCount, callback);
```
Perform sequential task execution.
* tasks (Array) - Array of arguments for commands;
* callback (arg, i) => *|Promise - Function that calls on task;


#### Example:
```javascript
pc.mapLimit([1, 2, 3], value => return new Promise(resolve => setTimeout(resolve, 10).then(() => console.log('OK'));
```
