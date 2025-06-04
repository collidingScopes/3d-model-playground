function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
export var SpeechManager = /*#__PURE__*/ function() {
    "use strict";
    function SpeechManager(onTranscript, onRecognitionActive, onCommandRecognized) {
        var _this = this;
        _class_call_check(this, SpeechManager);
        this.onTranscript = onTranscript;
        this.onRecognitionActive = onRecognitionActive; // Callback for recognition state
        this.onCommandRecognized = onCommandRecognized; // Callback for recognized commands
        this.recognition = null;
        this.isRecognizing = false;
        this.finalTranscript = '';
        this.interimTranscript = '';
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true; // Keep listening even after a pause
            this.recognition.interimResults = true; // Get results while speaking
            this.recognition.onstart = function() {
                _this.isRecognizing = true;
                console.log('Speech recognition started.');
                if (_this.onRecognitionActive) _this.onRecognitionActive(true);
            };
            this.recognition.onresult = function(event) {
                _this.interimTranscript = '';
                for(var i = event.resultIndex; i < event.results.length; ++i){
                    if (event.results[i].isFinal) {
                        // Append to finalTranscript and then clear it for the next utterance
                        // This way, `finalTranscript` holds the *current complete* utterance.
                        var currentFinalTranscript = event.results[i][0].transcript.trim().toLowerCase();
                        _this.finalTranscript += currentFinalTranscript; // Append to potentially longer session transcript if needed, though we process per utterance
                        if (_this.onTranscript) {
                            // Display the raw transcript before processing as command
                            _this.onTranscript(event.results[i][0].transcript, ''); // Send final, clear interim
                        }
                        // Check for commands
                        var commandMap = {
                            'drag': 'drag',
                            'rotate': 'rotate',
                            'rotation': 'rotate',
                            'scale': 'scale',
                            'size': 'scale',
                            'zoom': 'scale',
                            'animate': 'animate',
                            'anime': 'animate',
                            'animation': 'animate' // Alias for animate
                        };
                        var spokenCommands = Object.keys(commandMap);
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(var _iterator = spokenCommands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                var spokenCmd = _step.value;
                                if (currentFinalTranscript.includes(spokenCmd)) {
                                    var actualCommand = commandMap[spokenCmd];
                                    if (_this.onCommandRecognized) {
                                        _this.onCommandRecognized(actualCommand);
                                    }
                                    break; // Process the first command found (and its alias)
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        // Reset finalTranscript for the next full utterance if you are processing utterance by utterance
                        // If you want to accumulate, then don't reset here.
                        // For command processing, resetting per utterance is usually best.
                        _this.finalTranscript = '';
                    } else {
                        _this.interimTranscript += event.results[i][0].transcript;
                        if (_this.onTranscript) {
                            _this.onTranscript(null, _this.interimTranscript);
                        }
                    }
                }
                // If only interim results were processed in this event batch, ensure onTranscript is called
                if (_this.interimTranscript && !event.results[event.results.length - 1].isFinal) {
                    if (_this.onTranscript) {
                        _this.onTranscript(null, _this.interimTranscript);
                    }
                }
            };
            this.recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                var oldIsRecognizing = _this.isRecognizing;
                _this.isRecognizing = false;
                _this.finalTranscript = ''; // Clear transcript on error
                _this.interimTranscript = '';
                if (_this.onTranscript) _this.onTranscript('', ''); // Clear display
                if (oldIsRecognizing && _this.onRecognitionActive) _this.onRecognitionActive(false);
                // Automatically restart if it's an 'aborted' or 'no-speech' error
                if (event.error === 'aborted' || event.error === 'no-speech') {
                    console.log('Restarting speech recognition due to inactivity or abort.');
                // Don't call startRecognition directly, let onend handle it if continuous
                }
            };
            this.recognition.onend = function() {
                var oldIsRecognizing = _this.isRecognizing;
                _this.isRecognizing = false;
                console.log('Speech recognition ended.');
                _this.finalTranscript = ''; // Clear transcript on end
                _this.interimTranscript = '';
                if (_this.onTranscript) _this.onTranscript('', ''); // Clear display
                if (oldIsRecognizing && _this.onRecognitionActive) _this.onRecognitionActive(false);
                // If it ended and continuous is true, restart it.
                // This handles cases where the browser might stop it.
                if (_this.recognition.continuous) {
                    console.log('Continuous mode: Restarting speech recognition.');
                    _this.startRecognition(); // startRecognition already resets transcripts
                }
            };
        } else {
            console.warn('Web Speech API is not supported in this browser.');
        }
    }
    _create_class(SpeechManager, [
        {
            key: "startRecognition",
            value: function startRecognition() {
                var _this = this;
                if (this.recognition && !this.isRecognizing) {
                    try {
                        this.finalTranscript = ''; // Reset transcript
                        this.interimTranscript = '';
                        this.recognition.start();
                    } catch (e) {
                        console.error("Error starting speech recognition:", e);
                        // This can happen if it's already started or due to permissions
                        if (e.name === 'InvalidStateError' && this.isRecognizing) {
                        // Already started, do nothing
                        } else {
                            // Attempt to restart if it fails for other reasons (e.g. after an error)
                            setTimeout(function() {
                                return _this.startRecognition();
                            }, 500);
                        }
                    }
                }
            }
        },
        {
            key: "stopRecognition",
            value: function stopRecognition() {
                if (this.recognition && this.isRecognizing) {
                    this.recognition.stop();
                }
            }
        },
        {
            key: "requestPermissionAndStart",
            value: // Call this on user interaction to request microphone permission
            function requestPermissionAndStart() {
                var _this = this;
                return _async_to_generator(function() {
                    var err;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (!_this.recognition) {
                                    console.log("Speech recognition not supported.");
                                    return [
                                        2
                                    ];
                                }
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                // Attempt to get microphone access (this might prompt the user)
                                return [
                                    4,
                                    navigator.mediaDevices.getUserMedia({
                                        audio: true
                                    })
                                ];
                            case 2:
                                _state.sent();
                                console.log("Microphone permission granted.");
                                _this.startRecognition();
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                err = _state.sent();
                                console.error("Microphone permission denied or error:", err);
                                if (_this.onTranscript) {
                                    _this.onTranscript("Microphone access denied. Please allow microphone access in your browser settings.", "");
                                }
                                return [
                                    3,
                                    4
                                ];
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return SpeechManager;
}();
