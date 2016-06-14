
var PC = module.exports = {
    eachSeries(tasks, callback) {
        return PC.mapSeries(tasks, callback).then(noop);
    },

    eachLimit(tasks, parallelCount, callback) {
        return PC.mapLimit(tasks, parallelCount, callback).then(noop);
    },

    each(tasks, callback) {
        return PC.map(tasks,callback).then(noop);
    },

    mapSeries(tasks, callback) {
        return PC.mapLimit(tasks, 1, callback);
    },

    mapLimit(tasks, parallelCount, callback) {
        if (!Array.isArray(tasks)) {
            return Promise.reject(new Error('Parameter "tasks" must be type of Array or Number'));
        }
        if (tasks.length === 0) {
            return Promise.resolve([]);

        } else {
            return new Promise(function(resolve, reject) {
                var state = {
                    tasks:         tasks,
                    allCount:      tasks.length,
                    parallelCount: parallelCount,
                    callback:      callback,
                    i:             0,
                    running:       0,
                    result:        [],
                    error:         false,
                    resolve:       resolve,
                    reject:        reject,
                    inWhile:       false
                };

                checkNext(state);
            });
        }
    },
    map(tasks, callback) {
        return Promise.all(tasks.map(callback));
    }
};

function checkNext(state) {
    state.inWhile = true;

    while (state.running < state.parallelCount && state.i < state.allCount && !state.error) {
        checkNextIter(state);
    }
    state.inWhile = false;
}

function checkNextIter(state) {
    var retValue;
    var curI = state.i++;

    state.running++;

    var promiseValue;

    try {
        if (state.tasks) {
            retValue = state.callback(state.tasks[curI], curI);
        } else {
            retValue = state.callback(curI);
        }

        promiseValue = Promise.resolve(retValue);
    } catch(err) {
        promiseValue = Promise.reject(err);
    }

    promiseValue.then(function(data) {
        next(state, curI, null, data);
    }, function(err) {
        next(state, curI, err)
    });
}

function next(state, i, err, res) {
    if (state.result[i] !== undefined) {
        return;
    }

    state.running--;

    if (!state.error) {
        if (err) {
            state.result[i] = null;

            state.error = true;

            err.iterIndex = i;
            state.reject(err);

        } else {
            state.result[i] = res;

            if (state.running === 0 && state.i === state.allCount) {
                state.resolve(state.result);

            } else {
                if (state.inWhile === false) {
                    checkNext(state);
                }
            }
        }
    }
}

function noop() {}
