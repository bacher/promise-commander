# Promise-Commander

Library for limiting parallel work.

### Installation:

```
npm install --save promise-commander
```

### Usage:

PC has 3 groups of method (parallel, limit, series), each group contains **"each"** and **"map"** variant.

#### API:

**each** Perform parallel task execution  
**map** Perform parallel task execution and return results

```javascript
PC.each(tasks, iterationCallback).then(() => ...);
PC.map(tasks, iterationCallback).then(results => ...);
```

* tasks (Array) - Array of arguments for commands;
* iterationCallback: (arg, i) => *|Promise - Function that calls on task;

**eachLimit** Perform parallel task execution with worker limit  
**mapLimit** Perform parallel task execution with worker limit and return results

```javascript
PC.eachLimit(tasks, parallelCount, iterationCallback).then(() => ...);
PC.mapLimit(tasks, parallelCount, iterationCallback).then(results => ...);
```

* tasks (Array) - Array of arguments for commands;
* parallelCount (number) - Count of parallel work tasks;
* iterationCallback (arg, i) => *|Promise - Function that calls on task;

**eachSeries** Perform sequential task execution  
**mapSeries** Perform sequential task execution and return results

```javascript
PC.eachSeries(tasks, iterationCallback).then(() => ...);
PC.mapSeries(tasks, iterationCallback).then(results => ...);
```

* tasks (Array) - Array of arguments for commands;
* iterationCallback (arg, i) => *|Promise - Function that calls on task;


#### Example:
```javascript
const PC = require('promise-commander');

const results = await PC.mapLimit(['john', 'pepe', 'nick', 'mark'], 2, async (value) => {
    await someAsyncAction();
    return `Hello ${value}`;
});

console.log('Processing is done, results:', results);
```
