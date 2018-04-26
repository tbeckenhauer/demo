angular.module('demoApp')
    .config(['carStateMachineProvider', function(carStateMachineProvider) {

        carStateMachineProvider.registerState('parked', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'accelerate':
                            this.warn(command);
                            break;
                        case 'decelerate':
                            this.warn(command);
                            break;
                        case 'removeKeys':
                            this.info();
                            break;
                        case 'insertKeys':
                            this.set('idling');
                            break;
                    }
                }
            }
        }, true);

        carStateMachineProvider.registerState('reverse', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.info();
                            break;
                        case 'accelerate':
                            this.set('idling');
                            break;
                        case 'removeKeys':
                            this.warn(command);
                            break;
                        case 'insertKeys':
                            this.warn(command);
                            break;
                    }
                }
            }
        });

        carStateMachineProvider.registerState('idling', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.set('reverse');
                            break;
                        case 'accelerate':
                            this.set('1stGear');
                            break;
                        case 'removeKeys':
                            this.set('parked');
                            break;
                        case 'insertKeys':
                            this.info();
                            break;
                    }
                }
            }
        });

        carStateMachineProvider.registerState('1stGear', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.set('idling');
                            break;
                        case 'accelerate':
                            this.set('2ndGear');
                            break;
                        case 'removeKeys':
                            this.warn(command);
                            break;
                        case 'insertKeys':
                            this.warn(command);
                            break;
                    }
                }
            }
        });

        carStateMachineProvider.registerState('2ndGear', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.set('1stGear');
                            break;
                        case 'accelerate':
                            this.set('3rdGear');
                            break;
                        case 'removeKeys':
                            this.warn(command);
                            break;
                        case 'insertKeys':
                            this.warn(command);
                            break;
                    }
                }
            }
        });

        carStateMachineProvider.registerState('3rdGear', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.set('2ndGear');
                            break;
                        case 'accelerate':
                            this.set('4thGear');
                            break;
                        case 'removeKeys':
                            this.warn(command);
                            break;
                        case 'insertKeys':
                            this.warn(command);
                            break;
                    }
                }
            }
        });

        carStateMachineProvider.registerState('4thGear', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.set('3rdGear');
                            break;
                        case 'accelerate':
                            this.set('warp9');
                            break;
                        case 'removeKeys':
                            this.warn(command);
                            break;
                        case 'insertKeys':
                            this.warn(command);
                            break;
                    }
                }
            }
        });

        carStateMachineProvider.registerState('warp9', {
            handleInput: {
                value: function(command) {
                    switch (command) {
                        case 'decelerate':
                            this.set('4thGear');
                            break;
                        case 'accelerate':
                            this.log({
                                level: 'error',
                                item: 'I am givin \'er all shes got Captian!'
                            });
                            break;
                        case 'removeKeys':
                            this.warn(command);
                            break;
                        case 'insertKeys':
                            this.warn(command);
                            break;
                    }
                }
            }
        });
    }])

    .provider('carStateMachine', [function() {

        var protoVehicle = function() {};
        var carLog = [];
        var vehicleStates = {};
        var currentState;
        var getCurrentState = function() {
            return vehicleStates[currentState];
        };
        var setCurrentState = function(state) {
            currentState = state;

        };
        var handlers = [];

        protoVehicle.prototype.set = function(newState) {
            var newMessage = 'setting vehicle to state:' + newState;
            setCurrentState(newState);
            this.log({
                level: 'info',
                item: newMessage
            });
        };

        protoVehicle.prototype.warn = function(cmd) {
            var newMessage = 'command: ' + cmd + ' in state: ' + currentState + ' is not allowed';
            this.log({
                level: 'warn',
                item: newMessage
            });
        };

        protoVehicle.prototype.info = function() {
            var newMessage = 'remaining in state:' + currentState;
            this.log({
                level: 'info',
                item: newMessage
            });
        };

        protoVehicle.prototype.log = function(newMessage) {
            carLog.unshift(newMessage);
            handlers.forEach(function(handler) {
                handler(carLog);
            });
        };

        protoVehicle.prototype.addHandler = function(newHandler) {
            handlers.push(newHandler);
        };

        this.registerState = function(state, stateConfig, isDefault) {
            vehicleStates[state] = Object.create(protoVehicle.prototype, stateConfig);
            if (isDefault) setCurrentState(state);
        };

        this.$get = [function() {
            return getCurrentState;
        }];
    }]);
