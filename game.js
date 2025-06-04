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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
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
import * as THREE from 'three';
import { GLTFLoader } from 'three/loaders/GLTFLoader.js';
import { HandLandmarker, FilesetResolver } from 'https://esm.sh/@mediapipe/tasks-vision@0.10.14';
import { AudioManager } from './audioManager.js'; // Import the AudioManager
import { SpeechManager } from './SpeechManager.js'; // Import SpeechManager
export var Game = /*#__PURE__*/ function() {
    "use strict";
    function Game(renderDiv) {
        var _this = this;
        _class_call_check(this, Game);
        this.renderDiv = renderDiv;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.videoElement = null;
        this.handLandmarker = null;
        this.lastVideoTime = -1;
        this.hands = []; // Stores data about detected hands (landmarks, anchor position, line group)
        this.handLineMaterial = null; // Material for hand lines
        this.fingertipMaterialHand1 = null; // Material for first hand's fingertip circles (blue)
        this.fingertipMaterialHand2 = null; // Material for second hand's fingertip circles (green)
        this.fingertipLandmarkIndices = [
            0,
            4,
            8,
            12,
            16,
            20
        ]; // WRIST + TIP landmarks
        this.handConnections = null; // Landmark connection definitions
        // this.handCollisionRadius = 30; // Conceptual radius for hand collision, was 25 (sphere radius) - Not needed for template
        this.gameState = 'loading'; // loading, ready, tracking, error
        this.gameOverText = null; // Will be repurposed or simplified
        this.clock = new THREE.Clock();
        this.audioManager = new AudioManager(); // Create an instance of AudioManager
        this.lastLandmarkPositions = [
            [],
            []
        ]; // Store last known smoothed positions for each hand's landmarks
        this.smoothingFactor = 0.4; // Alpha for exponential smoothing (0 < alpha <= 1). Smaller = more smoothing.
        this.loadedModels = {};
        this.pandaModel = null; // Add reference for the Panda model
        this.animationMixer = null; // For Stan model animations
        this.animationClips = []; // To store all animation clips from the model
        this.animationActions = {}; // To store animation actions by name or index
        this.currentAction = null; // To keep track of the currently playing animation action
        this.speechManager = null;
        this.speechBubble = null;
        this.speechBubbleTimeout = null;
        this.openAIApiKey = window.OPENAI_API_KEY || null;
        this.importInput = null;
        this.importButton = null;
        this.isSpeechActive = false; // Track if speech recognition is active for styling
        this.grabbingHandIndex = -1; // -1: no hand, 0: first hand, 1: second hand grabbing
        this.pickedUpModel = null; // Reference to the model being dragged
        this.modelDragOffset = new THREE.Vector3(); // Offset between model and pinch point in 3D
        this.modelGrabStartDepth = 0; // To store the model's Z depth when grabbed
        this.interactionMode = 'drag'; // 'drag', 'rotate', 'scale', 'animate' - Default to drag
        this.interactionModeButtons = {}; // To store references to mode buttons
        this.loadedDroppedModelData = null; // To temporarily store parsed GLTF data
        this.interactionModeColors = {
            drag: {
                base: '#00FFFF',
                text: '#000000',
                hand: new THREE.Color('#00FFFF')
            },
            rotate: {
                base: '#FF00FF',
                text: '#FFFFFF',
                hand: new THREE.Color('#FF00FF')
            },
            scale: {
                base: '#FFFF00',
                text: '#000000',
                hand: new THREE.Color('#FFFF00')
            },
            animate: {
                base: '#FFA500',
                text: '#000000',
                hand: new THREE.Color('#FFA500')
            } // Orange
        };
        this.rotateLastHandX = null; // Stores the last hand X position for rotation calculation
        this.rotateSensitivity = 0.02; // Adjust for faster/slower rotation
        this.scaleInitialPinchDistance = null; // Stores the initial distance between two pinching hands
        this.scaleInitialModelScale = null; // Stores the model's scale when scaling starts
        this.scaleSensitivity = 0.05; // Adjust for faster/slower scaling - Increased from 0.02 to 0.05
        this.grabbingPulseSpeed = 8; // Speed of the grab pulse animation
        this.grabbingPulseAmplitude = 0.5; // How much the scale increases (e.g., 0.5 means 50% bigger at peak)
        this.pulseBaseScale = 1.0; // Base scale for non-pulsing and start of pulse
        this.fingertipDefaultOpacity = 0.3; // Default opacity for hand landmarks (Reduced from 0.6)
        this.fingertipGrabOpacity = 1.0; // Opacity when hand is actively grabbing/interacting
        this.instructionTextElement = document.querySelector("#instruction-text"); // DOM element for instruction text
        this.interactionModeInstructions = {
            drag: "Pinch to grab and move the model",
            rotate: "Pinch and move hand left/right to rotate",
            scale: "Use two hands. Pinch with both and move hands closer/farther",
            animate: "Pinch and move hand up/down to cycle animations" // Updated instruction
        };
        this.animationControlHandIndex = -1; // Index of the hand controlling animation scrolling
        this.animationControlInitialPinchY = null; // Initial Y position of the pinch for animation scrolling
        this.animationScrollThreshold = 40; // Pixels of vertical movement to trigger an animation change (Reduced from 50)
        // Initialize asynchronously
        this._init().catch(function(error) {
            console.error("Initialization failed:", error);
            _this._showError("Initialization failed. Check console.");
        });
    }
    _create_class(Game, [
        {
            key: "_init",
            value: function _init() {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _this._setupDOM(); // Sets up basic DOM, including speech bubble container
                                _this._setupThree();
                                _this._setupSpeechRecognition(); // Initialize SpeechManager
                                return [
                                    4,
                                    _this._loadAssets()
                                ];
                            case 1:
                                _state.sent(); // Add asset loading step
                                return [
                                    4,
                                    _this._setupHandTracking()
                                ];
                            case 2:
                                _state.sent(); // This needs to complete before we can proceed
                                // Ensure webcam is playing before starting game logic dependent on it
                                return [
                                    4,
                                    _this.videoElement.play()
                                ];
                            case 3:
                                _state.sent();
                                _this.audioManager.resumeContext(); // Resume audio context as game starts automatically
                                _this.speechManager.requestPermissionAndStart(); // Start speech recognition
                                _this.clock.start(); // Start the main clock as game starts automatically
                                window.addEventListener('resize', _this._onResize.bind(_this));
                                _this.gameState = 'tracking'; // Change state to tracking to start immediately
                                _this._animate(); // Start the animation loop (it will check state)
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_setupDOM",
            value: function _setupDOM() {
                var _this = this;
                this.renderDiv.style.position = 'relative';
                this.renderDiv.style.width = '100vw'; // Use viewport units for fullscreen
                this.renderDiv.style.height = '100vh';
                this.renderDiv.style.overflow = 'hidden';
                this.renderDiv.style.background = '#111'; // Fallback background
                // Start Screen Overlay and related DOM elements (title, instructions, loading text) removed.
                // --- End Start Screen Overlay ---
                this.videoElement = document.createElement('video');
                this.videoElement.style.position = 'absolute';
                this.videoElement.style.top = '0';
                this.videoElement.style.left = '0';
                this.videoElement.style.width = '100%';
                this.videoElement.style.height = '100%';
                this.videoElement.style.objectFit = 'cover';
                this.videoElement.style.transform = 'scaleX(-1)'; // Mirror view for intuitive control
                this.videoElement.autoplay = true;
                this.videoElement.muted = true; // Mute video to avoid feedback loops if audio was captured
                this.videoElement.playsInline = true;
                this.videoElement.style.zIndex = '0'; // Ensure video is behind THREE canvas
                this.renderDiv.appendChild(this.videoElement);
                // Container for Status text (formerly Game Over) and restart hint
                this.gameOverContainer = document.createElement('div');
                this.gameOverContainer.style.position = 'absolute';
                this.gameOverContainer.style.top = '50%';
                this.gameOverContainer.style.left = '50%';
                this.gameOverContainer.style.transform = 'translate(-50%, -50%)';
                this.gameOverContainer.style.zIndex = '10';
                this.gameOverContainer.style.display = 'none'; // Hidden initially
                this.gameOverContainer.style.pointerEvents = 'none'; // Don't block clicks
                this.gameOverContainer.style.textAlign = 'center'; // Center text elements within
                this.gameOverContainer.style.color = 'white'; // Default color, can be changed by _showError
                // this.gameOverContainer.style.textShadow = '2px 2px 4px black'; // Removed for flatter look
                this.gameOverContainer.style.fontFamily = '"Arial", "Helvetica Neue", Helvetica, sans-serif'; // Cleaner, modern sans-serif
                // Main Status Text (formerly Game Over Text)
                this.gameOverText = document.createElement('div'); // Will be 'gameOverText' internally
                this.gameOverText.innerText = 'STATUS'; // Generic placeholder
                this.gameOverText.style.fontSize = 'clamp(36px, 10vw, 72px)'; // Responsive font size
                this.gameOverText.style.fontWeight = 'bold';
                this.gameOverText.style.marginBottom = '10px'; // Space below main text
                this.gameOverContainer.appendChild(this.gameOverText);
                // Restart Hint Text (may or may not be shown depending on context)
                this.restartHintText = document.createElement('div');
                this.restartHintText.innerText = '(click to restart tracking)';
                this.restartHintText.style.fontSize = 'clamp(16px, 3vw, 24px)';
                this.restartHintText.style.fontWeight = 'normal';
                this.restartHintText.style.opacity = '0.8'; // Slightly faded
                this.gameOverContainer.appendChild(this.restartHintText);
                this.renderDiv.appendChild(this.gameOverContainer);
                // --- Speech Bubble ---
                this.speechBubble = document.createElement('div');
                this.speechBubble.id = 'speech-bubble';
                this.speechBubble.style.position = 'absolute';
                this.speechBubble.style.top = '10px'; // Changed from 20px to 10px
                this.speechBubble.style.left = '50%';
                this.speechBubble.style.transform = 'translateX(-50%)';
                this.speechBubble.style.padding = '15px 25px';
                this.speechBubble.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                this.speechBubble.style.border = '2px solid black'; // Solid black border
                this.speechBubble.style.borderRadius = '4px'; // Sharper corners
                this.speechBubble.style.boxShadow = '4px 4px 0px rgba(0,0,0,1)'; // Hard shadow
                this.speechBubble.style.color = '#333';
                this.speechBubble.style.fontFamily = '"Arial", "Helvetica Neue", Helvetica, sans-serif'; // Consistent modern sans-serif
                this.speechBubble.style.fontSize = 'clamp(16px, 3vw, 22px)';
                this.speechBubble.style.maxWidth = '80%';
                this.speechBubble.style.textAlign = 'center';
                this.speechBubble.style.zIndex = '25'; // Above most things but below modal popups if any
                this.speechBubble.style.opacity = '0'; // Hidden initially, fade in
                // Added boxShadow, border, padding, fontSize, top to transition for smooth active state changes
                this.speechBubble.style.transition = 'opacity 0.5s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border 0.3s ease-in-out, padding 0.3s ease-in-out, font-size 0.3s ease-in-out, top 0.3s ease-in-out';
                this.speechBubble.style.pointerEvents = 'none'; // Not interactive
                this.speechBubble.innerHTML = "..."; // Default text
                this.renderDiv.appendChild(this.speechBubble);
                // Import button and file input
                this.importInput = document.createElement("input");
                this.importInput.type = "file";
                this.importInput.accept = ".gltf,.glb,model/gltf+json,model/gltf-binary";
                this.importInput.style.display = "none";
                this.importInput.addEventListener("change", function(event) {
                    if (event.target.files && event.target.files[0]) {
                        _this._loadDroppedModel(event.target.files[0]);
                        event.target.value = "";
                    }
                });
                this.importButton = document.createElement("button");
                this.importButton.innerText = "Import Model";
                this.importButton.style.position = "absolute";
                this.importButton.style.top = "60px";
                this.importButton.style.left = "50%";
                this.importButton.style.transform = "translateX(-50%)";
                this.importButton.style.zIndex = "30";
                this.importButton.style.padding = "12px 24px";
                this.importButton.style.fontSize = "20px";
                this.importButton.style.border = "2px solid black";
                this.importButton.style.borderRadius = "4px";
                this.importButton.style.cursor = "pointer";
                this.importButton.style.background = "white";
                this.importButton.style.boxShadow = "2px 2px 0px black";
                this.importButton.addEventListener("click", function() {
                    return _this.importInput.click();
                });
                this.renderDiv.appendChild(this.importButton);
                this.renderDiv.appendChild(this.importInput);
                // Animation buttons container
                this.animationButtonsContainer = document.createElement('div');
                this.animationButtonsContainer.id = 'animation-buttons-container';
                this.animationButtonsContainer.style.position = 'absolute';
                this.animationButtonsContainer.style.bottom = 'auto'; // Remove bottom positioning
                this.animationButtonsContainer.style.top = '10px'; // Position from the top, changed from 20px
                this.animationButtonsContainer.style.left = '10px'; // Position from the left, changed from 20px
                this.animationButtonsContainer.style.transform = 'none'; // Remove centering transform
                this.animationButtonsContainer.style.zIndex = '30'; // Above speech bubble
                this.animationButtonsContainer.style.display = 'flex';
                this.animationButtonsContainer.style.flexDirection = 'column'; // Arrange buttons in a column
                this.animationButtonsContainer.style.gap = '4px'; // Reduced gap for tighter vertical layout
                this.animationButtonsContainer.style.opacity = '0'; // Start fully transparent for fade-in
                this.animationButtonsContainer.style.transition = 'opacity 0.3s ease-in-out'; // Smooth fade transition
                this.animationButtonsContainer.style.display = 'none'; // Initially hidden (will be set to flex by logic)
                this.renderDiv.appendChild(this.animationButtonsContainer);
                // Interaction Mode UI Container
                this.interactionModeContainer = document.createElement('div');
                this.interactionModeContainer.id = 'interaction-mode-container';
                this.interactionModeContainer.style.position = 'absolute';
                this.interactionModeContainer.style.top = '10px'; // Changed from 20px
                this.interactionModeContainer.style.right = '10px'; // Changed from 20px
                this.interactionModeContainer.style.zIndex = '30';
                this.interactionModeContainer.style.display = 'flex';
                this.interactionModeContainer.style.flexDirection = 'column';
                this.interactionModeContainer.style.gap = '4px';
                this.renderDiv.appendChild(this.interactionModeContainer);
                // Create interaction mode buttons
                [
                    'Drag',
                    'Rotate',
                    'Scale',
                    'Animate'
                ].forEach(function(mode) {
                    var button = document.createElement('button');
                    button.innerText = mode;
                    button.id = "interaction-mode-".concat(mode.toLowerCase());
                    button.style.padding = '16px 28px'; // Increased padding
                    button.style.fontSize = 'clamp(22px, 4vw, 32px)'; // Increased font size further
                    button.style.border = '2px solid black'; // Consistent black border
                    button.style.borderRadius = '4px'; // Sharper corners
                    button.style.cursor = 'pointer';
                    button.style.fontWeight = 'bold'; // Always bold
                    button.style.transition = 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'; // Faster transition, added shadow
                    button.style.boxShadow = '2px 2px 0px black'; // Default shadow for inactive
                    button.addEventListener('click', function() {
                        return _this._setInteractionMode(mode.toLowerCase());
                    });
                    _this.interactionModeContainer.appendChild(button);
                    _this.interactionModeButtons[mode.toLowerCase()] = button; // Store button reference
                });
                this._updateInteractionModeButtonStyles(); // Apply initial styles
                this._updateInstructionText(); // Set initial instruction text
                this._setupDragAndDrop(); // Add drag and drop listeners
            }
        },
        {
            key: "_setupThree",
            value: function _setupThree() {
                var _this_interactionModeColors_this_interactionMode;
                var width = this.renderDiv.clientWidth;
                var height = this.renderDiv.clientHeight;
                this.scene = new THREE.Scene();
                // Using OrthographicCamera for a 2D-like overlay effect
                this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 2000); // Increased far plane
                this.camera.position.z = 100; // Position along Z doesn't change scale in Ortho
                this.renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true
                });
                this.renderer.setSize(width, height);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.domElement.style.position = 'absolute';
                this.renderer.domElement.style.top = '0';
                this.renderer.domElement.style.left = '0';
                this.renderer.domElement.style.zIndex = '1'; // Canvas on top of video
                this.renderDiv.appendChild(this.renderer.domElement);
                var ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increased intensity
                this.scene.add(ambientLight);
                var directionalLight = new THREE.DirectionalLight(0xffffff, 1.8); // Increased intensity
                directionalLight.position.set(0, 0, 100); // Pointing from behind camera
                this.scene.add(directionalLight);
                // Setup hand visualization (palm circles removed, lines will be added later)
                for(var i = 0; i < 2; i++){
                    var lineGroup = new THREE.Group();
                    lineGroup.visible = false;
                    this.scene.add(lineGroup);
                    this.hands.push({
                        landmarks: null,
                        anchorPos: new THREE.Vector3(),
                        lineGroup: lineGroup,
                        isPinching: false,
                        pinchPointScreen: new THREE.Vector2(),
                        isFist: false // True if hand is detected as a fist
                    });
                }
                this.handLineMaterial = new THREE.LineBasicMaterial({
                    color: 0x00ccff,
                    linewidth: 8
                }); // Kept line material default for now
                var initialModeHandColor = ((_this_interactionModeColors_this_interactionMode = this.interactionModeColors[this.interactionMode]) === null || _this_interactionModeColors_this_interactionMode === void 0 ? void 0 : _this_interactionModeColors_this_interactionMode.hand) || new THREE.Color(0x00ccff);
                this.fingertipMaterialHand1 = new THREE.MeshBasicMaterial({
                    color: initialModeHandColor.clone(),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: this.fingertipDefaultOpacity
                });
                this.fingertipMaterialHand2 = new THREE.MeshBasicMaterial({
                    color: initialModeHandColor.clone(),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: this.fingertipDefaultOpacity
                });
                // Define connections for MediaPipe hand landmarks
                // See: https://developers.google.com/mediapipe/solutions/vision/hand_landmarker#hand_landmarks
                this.handConnections = [
                    // Thumb
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    // Index finger
                    [
                        0,
                        5
                    ],
                    [
                        5,
                        6
                    ],
                    [
                        6,
                        7
                    ],
                    [
                        7,
                        8
                    ],
                    // Middle finger
                    [
                        0,
                        9
                    ],
                    [
                        9,
                        10
                    ],
                    [
                        10,
                        11
                    ],
                    [
                        11,
                        12
                    ],
                    // Ring finger
                    [
                        0,
                        13
                    ],
                    [
                        13,
                        14
                    ],
                    [
                        14,
                        15
                    ],
                    [
                        15,
                        16
                    ],
                    // Pinky
                    [
                        0,
                        17
                    ],
                    [
                        17,
                        18
                    ],
                    [
                        18,
                        19
                    ],
                    [
                        19,
                        20
                    ],
                    // Palm
                    [
                        5,
                        9
                    ],
                    [
                        9,
                        13
                    ],
                    [
                        13,
                        17
                    ] // Connect base of fingers
                ];
            }
        },
        {
            key: "_loadAssets",
            value: function _loadAssets() {
                var _this = this;
                return _async_to_generator(function() {
                    var gltfLoader, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                console.log("Loading assets...");
                                gltfLoader = new GLTFLoader(); // Changed from FBXLoader
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    new Promise(function(resolve, reject) {
                                        gltfLoader.load('assets/Stan.gltf', function(gltf) {
                                            _this.pandaModel = gltf.scene; // GLTFLoader returns an object with a 'scene' property
                                            _this.animationMixer = new THREE.AnimationMixer(_this.pandaModel);
                                            _this.animationClips = gltf.animations;
                                            if (_this.animationClips && _this.animationClips.length) {
                                                _this.animationClips.forEach(function(clip, index) {
                                                    var action = _this.animationMixer.clipAction(clip);
                                                    var actionName = clip.name || "Animation ".concat(index + 1);
                                                    _this.animationActions[actionName] = action;
                                                    // Create a button for this animation
                                                    var button = document.createElement('button');
                                                    button.innerText = actionName;
                                                    button.style.padding = '5px 10px'; // Adjusted padding
                                                    button.style.fontSize = '13px'; // Consistent font size
                                                    button.style.backgroundColor = '#f0f0f0'; // Light grey default
                                                    button.style.color = 'black';
                                                    button.style.border = '2px solid black'; // Black border
                                                    button.style.borderRadius = '4px'; // Sharper corners
                                                    button.style.cursor = 'pointer';
                                                    button.style.transition = 'background-color 0.2s ease, box-shadow 0.2s ease';
                                                    button.style.boxShadow = '2px 2px 0px black'; // Default shadow
                                                    button.addEventListener('click', function() {
                                                        return _this._playAnimation(actionName);
                                                    });
                                                    _this.animationButtonsContainer.appendChild(button);
                                                    console.log("Loaded animation and created button for: ".concat(actionName));
                                                });
                                                // Play the first animation by default
                                                // Try to find and play an "idle" animation by default
                                                var defaultActionName = Object.keys(_this.animationActions)[0]; // Fallback to the first animation
                                                var idleActionKey = Object.keys(_this.animationActions).find(function(name) {
                                                    return name.toLowerCase().includes('idle');
                                                });
                                                if (idleActionKey) {
                                                    defaultActionName = idleActionKey;
                                                    console.log("Found idle animation: ".concat(defaultActionName));
                                                } else if (defaultActionName) {
                                                    console.log("No specific idle animation found, defaulting to first animation: ".concat(defaultActionName));
                                                }
                                                if (defaultActionName && _this.animationActions[defaultActionName]) {
                                                    _this.currentAction = _this.animationActions[defaultActionName];
                                                    _this.currentAction.play();
                                                    console.log("Playing default animation: ".concat(defaultActionName));
                                                    _this._updateButtonStyles(defaultActionName);
                                                } else {
                                                    console.log("No animations found or default animation could not be played.");
                                                }
                                            } else {
                                                console.log("Stan model has no embedded animations.");
                                            }
                                            // Scale and position the model
                                            // These values might need adjustment based on the model's original size and pivot
                                            var scale = 80; // This scale might need adjustment for Stan model
                                            _this.pandaModel.scale.set(scale, scale, scale);
                                            // Position the model: X=center, Y=roughly bottom, Z=in front of hands
                                            var sceneHeight = _this.renderDiv.clientHeight;
                                            _this.pandaModel.position.set(0, sceneHeight * -0.45, -1000); // Updated Z to -1000
                                            _this.scene.add(_this.pandaModel);
                                            console.log("Stan GLTF model loaded and added to scene.");
                                            resolve();
                                        }, undefined, function(error) {
                                            console.error('An error occurred while loading the Stan GLTF model:', error); // Updated log
                                            reject(error);
                                        });
                                    })
                                ];
                            case 2:
                                _state.sent();
                                console.log("All specified assets loaded.");
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                error = _state.sent();
                                console.error("Error loading assets:", error);
                                _this._showError("Failed to load 3D model.");
                                throw error; // Stop initialization
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_setupHandTracking",
            value: function _setupHandTracking() {
                var _this = this;
                return _async_to_generator(function() {
                    var vision, stream, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    4,
                                    ,
                                    5
                                ]);
                                console.log("Setting up Hand Tracking...");
                                return [
                                    4,
                                    FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm')
                                ];
                            case 1:
                                vision = _state.sent();
                                return [
                                    4,
                                    HandLandmarker.createFromOptions(vision, {
                                        baseOptions: {
                                            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                                            delegate: 'GPU'
                                        },
                                        numHands: 2,
                                        runningMode: 'VIDEO'
                                    })
                                ];
                            case 2:
                                _this.handLandmarker = _state.sent();
                                console.log("HandLandmarker created.");
                                console.log("Requesting webcam access...");
                                return [
                                    4,
                                    navigator.mediaDevices.getUserMedia({
                                        video: {
                                            facingMode: 'user',
                                            width: {
                                                ideal: 1920
                                            },
                                            height: {
                                                ideal: 1080
                                            } // Request Full HD height
                                        },
                                        audio: false
                                    })
                                ];
                            case 3:
                                stream = _state.sent();
                                _this.videoElement.srcObject = stream;
                                console.log("Webcam stream obtained.");
                                // Wait for video metadata to load to ensure dimensions are available
                                return [
                                    2,
                                    new Promise(function(resolve) {
                                        _this.videoElement.onloadedmetadata = function() {
                                            console.log("Webcam metadata loaded.");
                                            // Adjust video size slightly after metadata is loaded if needed, but CSS handles most
                                            _this.videoElement.style.width = _this.renderDiv.clientWidth + 'px';
                                            _this.videoElement.style.height = _this.renderDiv.clientHeight + 'px';
                                            resolve();
                                        };
                                    })
                                ];
                            case 4:
                                error = _state.sent();
                                console.error('Error setting up Hand Tracking or Webcam:', error);
                                _this._showError("Webcam/Hand Tracking Error: ".concat(error.message, ". Please allow camera access."));
                                throw error; // Re-throw to stop initialization
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_updateHands",
            value: function _updateHands() {
                var _this = this;
                if (!this.handLandmarker || !this.videoElement.srcObject || this.videoElement.readyState < 2 || this.videoElement.videoWidth === 0) return;
                // this.isAnyHandHovering = false; // Reset hover state each frame - REMOVED
                var videoTime = this.videoElement.currentTime;
                if (videoTime > this.lastVideoTime) {
                    this.lastVideoTime = videoTime;
                    try {
                        var _this1, _loop = function(i) {
                            var hand = _this1.hands[i];
                            if (results.landmarks && results.landmarks[i]) {
                                var currentRawLandmarks = results.landmarks[i];
                                if (!_this1.lastLandmarkPositions[i] || _this1.lastLandmarkPositions[i].length !== currentRawLandmarks.length) {
                                    _this1.lastLandmarkPositions[i] = currentRawLandmarks.map(function(lm) {
                                        return _object_spread({}, lm);
                                    });
                                }
                                var smoothedLandmarks = currentRawLandmarks.map(function(lm, lmIndex) {
                                    var prevLm = _this.lastLandmarkPositions[i][lmIndex];
                                    return {
                                        x: _this.smoothingFactor * lm.x + (1 - _this.smoothingFactor) * prevLm.x,
                                        y: _this.smoothingFactor * lm.y + (1 - _this.smoothingFactor) * prevLm.y,
                                        z: _this.smoothingFactor * lm.z + (1 - _this.smoothingFactor) * prevLm.z
                                    };
                                });
                                _this1.lastLandmarkPositions[i] = smoothedLandmarks.map(function(lm) {
                                    return _object_spread({}, lm);
                                }); // Update last positions with new smoothed ones
                                hand.landmarks = smoothedLandmarks;
                                var palm = smoothedLandmarks[9]; // MIDDLE_FINGER_MCP
                                var lmOriginalX = palm.x * videoParams.videoNaturalWidth;
                                var lmOriginalY = palm.y * videoParams.videoNaturalHeight;
                                var normX_visible = (lmOriginalX - videoParams.offsetX) / videoParams.visibleWidth;
                                var normY_visible = (lmOriginalY - videoParams.offsetY) / videoParams.visibleHeight;
                                var handX = (1 - normX_visible) * canvasWidth - canvasWidth / 2;
                                var handY = (1 - normY_visible) * canvasHeight - canvasHeight / 2;
                                hand.anchorPos.set(handX, handY, 1);
                                // Hover detection logic REMOVED
                                var prevIsPinching = hand.isPinching; // Store previous pinch state
                                // Pinch detection logic
                                var thumbTipLm = smoothedLandmarks[4]; // THUMB_TIP landmark index
                                var indexTipLm = smoothedLandmarks[8]; // INDEX_FINGER_TIP landmark index
                                if (thumbTipLm && indexTipLm) {
                                    // Convert landmark coordinates to screen space for pinch detection
                                    var convertToScreenSpace = function(lm) {
                                        var originalX = lm.x * videoParams.videoNaturalWidth;
                                        var originalY = lm.y * videoParams.videoNaturalHeight;
                                        var normX_visible = (originalX - videoParams.offsetX) / videoParams.visibleWidth;
                                        var normY_visible = (originalY - videoParams.offsetY) / videoParams.visibleHeight;
                                        return {
                                            x: (1 - normX_visible) * canvasWidth - canvasWidth / 2,
                                            y: (1 - normY_visible) * canvasHeight - canvasHeight / 2
                                        };
                                    };
                                    var thumbTipScreen = convertToScreenSpace(thumbTipLm);
                                    var indexTipScreen = convertToScreenSpace(indexTipLm);
                                    var distanceX = thumbTipScreen.x - indexTipScreen.x;
                                    var distanceY = thumbTipScreen.y - indexTipScreen.y;
                                    var pinchDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                                    var pinchThreshold = 45; // Increased from 35. Distance in screen pixels to consider a pinch.
                                    if (pinchDistance < pinchThreshold) {
                                        hand.isPinching = true;
                                        hand.pinchPointScreen.set((thumbTipScreen.x + indexTipScreen.x) / 2, (thumbTipScreen.y + indexTipScreen.y) / 2);
                                    } else {
                                        hand.isPinching = false;
                                    }
                                } else {
                                    hand.isPinching = false;
                                }
                                // Fist detection logic (simple version based on finger curl)
                                // This is a basic fist detection. More robust methods might involve checking distances
                                // of all fingertips to the palm or wrist.
                                var isTipNearMCP = function(tipLandmark, mcpLandmark) {
                                    var threshold = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.1;
                                    if (!tipLandmark || !mcpLandmark) return false;
                                    // Using 3D distance, but could simplify to 2D if performance is an issue
                                    // and Z-depth isn't significantly varying for this gesture.
                                    var dx = tipLandmark.x - mcpLandmark.x;
                                    var dy = tipLandmark.y - mcpLandmark.y;
                                    // const dz = tipLandmark.z - mcpLandmark.z; // Can include Z if needed
                                    var distance = Math.sqrt(dx * dx + dy * dy /* + dz*dz */ );
                                    return distance < threshold;
                                };
                                var indexFingerTip = smoothedLandmarks[8];
                                var indexFingerMcp = smoothedLandmarks[5];
                                var middleFingerTip = smoothedLandmarks[12];
                                var middleFingerMcp = smoothedLandmarks[9];
                                var ringFingerTip = smoothedLandmarks[16];
                                var ringFingerMcp = smoothedLandmarks[13];
                                var pinkyTip = smoothedLandmarks[20];
                                var pinkyMcp = smoothedLandmarks[17];
                                // Check if at least 3 fingers are curled (tip near MCP joint)
                                var curledFingers = 0;
                                if (isTipNearMCP(indexFingerTip, indexFingerMcp, 0.08)) curledFingers++;
                                if (isTipNearMCP(middleFingerTip, middleFingerMcp, 0.08)) curledFingers++;
                                if (isTipNearMCP(ringFingerTip, ringFingerMcp, 0.08)) curledFingers++;
                                if (isTipNearMCP(pinkyTip, pinkyMcp, 0.08)) curledFingers++;
                                var prevIsFist = hand.isFist;
                                hand.isFist = curledFingers >= 3; // Requires at least 3 fingers to be curled
                                // Interaction Logic
                                if (_this1.interactionMode === 'animate') {
                                    // Release any model grab from other modes
                                    if (_this1.grabbingHandIndex !== -1 && _this1.pickedUpModel) {
                                        // console.log(`Switched to Animate mode or model grab was active. Releasing.`);
                                        _this1.grabbingHandIndex = -1;
                                        _this1.pickedUpModel = null;
                                        // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                        // Reset other mode-specific states
                                        _this1.rotateLastHandX = null;
                                        _this1.scaleInitialPinchDistance = null;
                                        _this1.scaleInitialModelScale = null;
                                    }
                                    if (hand.isPinching) {
                                        if (!prevIsPinching && _this1.animationControlHandIndex === -1) {
                                            _this1.animationControlHandIndex = i;
                                            _this1.animationControlInitialPinchY = hand.pinchPointScreen.y;
                                            console.log("Hand ".concat(i, " started pinch for animation control at Y: ").concat(_this1.animationControlInitialPinchY));
                                        } else if (_this1.animationControlHandIndex === i && _this1.animationControlInitialPinchY !== null) {
                                            // Pinch continues with the controlling hand
                                            var deltaY = hand.pinchPointScreen.y - _this1.animationControlInitialPinchY;
                                            if (Math.abs(deltaY) > _this1.animationScrollThreshold) {
                                                var animationNames = Object.keys(_this1.animationActions);
                                                if (animationNames.length > 0) {
                                                    var currentIndex = -1;
                                                    // Find the index of the currently playing animation action
                                                    if (_this1.currentAction) {
                                                        for(var j = 0; j < animationNames.length; j++){
                                                            if (_this1.animationActions[animationNames[j]] === _this1.currentAction) {
                                                                currentIndex = j;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    var nextIndex = currentIndex;
                                                    if (deltaY < 0) {
                                                        nextIndex = (currentIndex + 1) % animationNames.length; // Now scrolls to next
                                                        console.log("Scrolling animation UP (to next)");
                                                    } else {
                                                        nextIndex = (currentIndex - 1 + animationNames.length) % animationNames.length; // Now scrolls to previous
                                                        console.log("Scrolling animation DOWN (to previous)");
                                                    }
                                                    if (nextIndex !== currentIndex) {
                                                        _this1._playAnimation(animationNames[nextIndex]);
                                                    }
                                                }
                                                // Reset initial Y to require another full threshold movement
                                                _this1.animationControlInitialPinchY = hand.pinchPointScreen.y;
                                            }
                                        }
                                    } else {
                                        if (prevIsPinching && _this1.animationControlHandIndex === i) {
                                            console.log("Hand ".concat(i, " ended pinch for animation control."));
                                            _this1.animationControlHandIndex = -1;
                                            _this1.animationControlInitialPinchY = null;
                                        }
                                    }
                                } else if (_this1.interactionMode === 'drag') {
                                    if (hand.isPinching) {
                                        if (!prevIsPinching && _this1.grabbingHandIndex === -1 && _this1.pandaModel) {
                                            // REMOVED: Bounding box check - drag can be initiated from anywhere if not scaling
                                            _this1.grabbingHandIndex = i;
                                            _this1.pickedUpModel = _this1.pandaModel;
                                            // Convert 2D screen pinch point to 3D world point on a plane
                                            // The plane is at the model's current Z depth
                                            _this1.modelGrabStartDepth = _this1.pickedUpModel.position.z; // Store initial depth
                                            var pinchX = hand.pinchPointScreen.x;
                                            var pinchY = hand.pinchPointScreen.y;
                                            // Convert 2D screen pinch point (origin center) to NDC (Normalized Device Coords, -1 to 1)
                                            var ndcX = pinchX / (_this1.renderDiv.clientWidth / 2);
                                            var ndcY = pinchY / (_this1.renderDiv.clientHeight / 2);
                                            var pinchPoint3DWorld = new THREE.Vector3(ndcX, ndcY, 0.5); // Start with a neutral NDC Z
                                            pinchPoint3DWorld.unproject(_this1.camera);
                                            pinchPoint3DWorld.z = _this1.modelGrabStartDepth; // Force Z to the grab depth
                                            console.log("Grab screen: (".concat(pinchX.toFixed(2), ", ").concat(pinchY.toFixed(2), "), NDC: (").concat(ndcX.toFixed(2), ", ").concat(ndcY.toFixed(2), ")"));
                                            console.log("Grab 3D World (pre-offset): ".concat(pinchPoint3DWorld.x.toFixed(2), ", ").concat(pinchPoint3DWorld.y.toFixed(2), ", ").concat(pinchPoint3DWorld.z.toFixed(2)));
                                            _this1.modelDragOffset.subVectors(_this1.pickedUpModel.position, pinchPoint3DWorld);
                                            console.log("Hand ".concat(i, " GRABBED model for DRAG at depth ").concat(_this1.modelGrabStartDepth, ". Offset:"), _this1.modelDragOffset.x.toFixed(2), _this1.modelDragOffset.y.toFixed(2), _this1.modelDragOffset.z.toFixed(2));
                                        } else if (_this1.grabbingHandIndex === i && _this1.pickedUpModel) {
                                            // Update model position based on pinch
                                            var currentPinchX = hand.pinchPointScreen.x;
                                            var currentPinchY = hand.pinchPointScreen.y;
                                            var currentNdcX = currentPinchX / (_this1.renderDiv.clientWidth / 2);
                                            var currentNdcY = currentPinchY / (_this1.renderDiv.clientHeight / 2);
                                            var newPinchPoint3DWorld = new THREE.Vector3(currentNdcX, currentNdcY, 0.5);
                                            newPinchPoint3DWorld.unproject(_this1.camera);
                                            newPinchPoint3DWorld.z = _this1.modelGrabStartDepth; // Force Z to the original grab depth plane
                                            _this1.pickedUpModel.position.addVectors(newPinchPoint3DWorld, _this1.modelDragOffset);
                                            var minZ = -200;
                                            var maxZ = 50;
                                            _this1.pickedUpModel.position.z = Math.max(minZ, Math.min(maxZ, _this1.pickedUpModel.position.z));
                                        }
                                    } else {
                                        if (prevIsPinching && _this1.grabbingHandIndex === i) {
                                            console.log("Hand ".concat(i, " RELEASED Stan model (Drag mode) at position:"), _this1.pickedUpModel.position);
                                            _this1.grabbingHandIndex = -1;
                                            _this1.pickedUpModel = null;
                                        // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Show marker when released - Grab marker removed
                                        }
                                    }
                                } else if (_this1.interactionMode === 'rotate') {
                                    if (hand.isPinching) {
                                        if (!prevIsPinching && _this1.grabbingHandIndex === -1 && _this1.pandaModel) {
                                            // REMOVED: Bounding box check - rotate can be initiated from anywhere if not scaling
                                            _this1.grabbingHandIndex = i;
                                            _this1.pickedUpModel = _this1.pandaModel;
                                            _this1.rotateLastHandX = hand.pinchPointScreen.x; // Store initial pinch X for delta calculation
                                            console.log("Hand ".concat(i, " INITIATED ROTATION on model via pinch from anywhere."));
                                        } else if (_this1.grabbingHandIndex === i && _this1.pickedUpModel && _this1.rotateLastHandX !== null) {
                                            var currentHandX = hand.pinchPointScreen.x; // Use pinch point X for delta
                                            var deltaX = currentHandX - _this1.rotateLastHandX;
                                            if (_this1.pickedUpModel && Math.abs(deltaX) > 0.5) {
                                                _this1.pickedUpModel.rotation.y -= deltaX * _this1.rotateSensitivity;
                                            }
                                            _this1.rotateLastHandX = currentHandX;
                                        }
                                    } else {
                                        if (prevIsPinching && _this1.grabbingHandIndex === i) {
                                            console.log("Hand ".concat(i, " RELEASED ROTATION on model (pinch ended)."));
                                            _this1.grabbingHandIndex = -1;
                                            _this1.pickedUpModel = null;
                                            _this1.rotateLastHandX = null;
                                        // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                        }
                                    }
                                } else if (_this1.interactionMode === 'scale') {
                                    var hand0 = _this1.hands[0];
                                    var hand1 = _this1.hands[1];
                                    if (hand0 && hand1 && hand0.landmarks && hand1.landmarks && hand0.isPinching && hand1.isPinching) {
                                        // Both hands are visible and pinching
                                        var dist = hand0.pinchPointScreen.distanceTo(hand1.pinchPointScreen);
                                        if (_this1.scaleInitialPinchDistance === null || _this1.scaleInitialModelScale === null) {
                                            // Start of scaling gesture
                                            _this1.scaleInitialPinchDistance = dist;
                                            _this1.scaleInitialModelScale = _this1.pandaModel.scale.clone(); // Store initial scale vector
                                            _this1.grabbingHandIndex = 0; // Mark as "grabbing" for scaling (using hand 0 as primary)
                                            _this1.pickedUpModel = _this1.pandaModel; // Indicate model is being interacted with
                                            // if(this.grabMarker) this.grabMarker.visible = false; // Grab marker removed
                                            console.log("Scaling initiated. Initial pinch dist: ".concat(dist.toFixed(2), ", Initial scale: ").concat(_this1.scaleInitialModelScale.x.toFixed(2)));
                                        } else {
                                            // Continue scaling
                                            var deltaDistance = dist - _this1.scaleInitialPinchDistance;
                                            var scaleFactorChange = deltaDistance * _this1.scaleSensitivity;
                                            var newScaleValue = _this1.scaleInitialModelScale.x + scaleFactorChange;
                                            // Clamp scale to prevent extreme sizes or inversion
                                            var minScale = 10; // Example min scale (adjust based on model's base size)
                                            var maxScale = 300; // Example max scale
                                            newScaleValue = Math.max(minScale, Math.min(maxScale, newScaleValue));
                                            _this1.pandaModel.scale.set(newScaleValue, newScaleValue, newScaleValue);
                                        // console.log(`Scaling: Current pinch dist: ${dist.toFixed(2)}, Scale change: ${scaleFactorChange.toFixed(3)}, New scale value: ${newScaleValue.toFixed(2)}`);
                                        }
                                    } else {
                                        // One or both hands are not pinching or not visible, or scaling was active
                                        if (_this1.scaleInitialPinchDistance !== null) {
                                            console.log("Scaling gesture ended.");
                                            _this1.scaleInitialPinchDistance = null;
                                            _this1.scaleInitialModelScale = null;
                                            _this1.grabbingHandIndex = -1;
                                            _this1.pickedUpModel = null;
                                        // if(this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                        }
                                    }
                                }
                                _this1._updateHandLines(i, smoothedLandmarks, videoParams, canvasWidth, canvasHeight);
                            } else {
                                if (hand.isPinching && _this1.grabbingHandIndex === i && _this1.interactionMode === 'drag') {
                                    console.log("Hand ".concat(i, " (which was grabbing for drag) disappeared. Releasing model."));
                                    _this1.grabbingHandIndex = -1;
                                    _this1.pickedUpModel = null;
                                // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                } else if (_this1.hands[i].isPinching && _this1.grabbingHandIndex === i && _this1.interactionMode === 'rotate') {
                                    console.log("Hand ".concat(i, " (which was pinching for rotate) disappeared. Releasing model."));
                                    _this1.grabbingHandIndex = -1;
                                    _this1.pickedUpModel = null;
                                    _this1.rotateLastHandX = null;
                                // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                } else if (_this1.interactionMode === 'scale' && _this1.scaleInitialPinchDistance !== null && (i === 0 || i === 1)) {
                                    var _this_hands_, _this_hands_1;
                                    var hand0Exists = (_this_hands_ = _this1.hands[0]) === null || _this_hands_ === void 0 ? void 0 : _this_hands_.landmarks;
                                    var hand1Exists = (_this_hands_1 = _this1.hands[1]) === null || _this_hands_1 === void 0 ? void 0 : _this_hands_1.landmarks;
                                    if (!hand0Exists || !hand1Exists) {
                                        console.log("Scaling gesture ended due to hand disappearance.");
                                        _this1.scaleInitialPinchDistance = null;
                                        _this1.scaleInitialModelScale = null;
                                        _this1.grabbingHandIndex = -1;
                                        _this1.pickedUpModel = null;
                                    // if(this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                    }
                                }
                                hand.landmarks = null;
                                hand.isPinching = false;
                                hand.isFist = false;
                                if (hand.lineGroup) hand.lineGroup.visible = false;
                            }
                            // Play interaction click sound for this hand if applicable (not for scale, handled after loop)
                            var isThisHandActivelyInteractingForSound = false;
                            if (_this1.interactionMode === 'drag' || _this1.interactionMode === 'rotate') {
                                isThisHandActivelyInteractingForSound = _this1.grabbingHandIndex === i && _this1.pickedUpModel === _this1.pandaModel;
                            } else if (_this1.interactionMode === 'animate') {
                                isThisHandActivelyInteractingForSound = _this1.animationControlHandIndex === i;
                            }
                            if (hand.isPinching && isThisHandActivelyInteractingForSound && _this1.interactionMode !== 'scale') {
                                _this1.audioManager.playInteractionClickSound();
                            }
                        };
                        var results = this.handLandmarker.detectForVideo(this.videoElement, performance.now());
                        var videoParams = this._getVisibleVideoParameters();
                        if (!videoParams) return;
                        var canvasWidth = this.renderDiv.clientWidth;
                        var canvasHeight = this.renderDiv.clientHeight;
                        for(var i = 0; i < this.hands.length; i++)_this1 = this, _loop(i);
                         // End of hand loop
                        // After processing both hands, if in scale mode and one hand stops pinching, explicitly stop scaling.
                        if (this.interactionMode === 'scale' && this.scaleInitialPinchDistance !== null) {
                            var hand0 = this.hands[0];
                            var hand1 = this.hands[1];
                            var hand0PinchingAndVisible = hand0 && hand0.landmarks && hand0.isPinching;
                            var hand1PinchingAndVisible = hand1 && hand1.landmarks && hand1.isPinching;
                            if (hand0PinchingAndVisible && hand1PinchingAndVisible) {
                                // If scaling is active and both hands are pinching, play sound
                                this.audioManager.playInteractionClickSound();
                            } else {
                                // If scaling was active but one hand stopped pinching or disappeared
                                if (this.scaleInitialPinchDistance !== null) {
                                    console.log("Scaling gesture ended (one hand stopped pinching/disappeared - post-loop check).");
                                    this.scaleInitialPinchDistance = null;
                                    this.scaleInitialModelScale = null;
                                    this.grabbingHandIndex = -1;
                                    this.pickedUpModel = null;
                                // if(this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                                }
                            }
                        }
                    } catch (error) {
                        console.error("Error during hand detection:", error);
                    }
                }
            }
        },
        {
            key: "_getModelScreenBoundingBox",
            value: function _getModelScreenBoundingBox() {
                var _this = this;
                if (!this.pandaModel || !this.camera || !this.renderer) {
                    return null;
                }
                // Ensure the model's world matrix is up to date
                this.pandaModel.updateMatrixWorld(true);
                var box = new THREE.Box3().setFromObject(this.pandaModel);
                if (box.isEmpty()) {
                    return null; // Model might not be loaded or has no geometry
                }
                var corners = [
                    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
                    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
                    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
                    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
                    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
                    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
                    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
                    new THREE.Vector3(box.max.x, box.max.y, box.max.z)
                ];
                var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                var canvasWidth = this.renderDiv.clientWidth;
                var canvasHeight = this.renderDiv.clientHeight;
                corners.forEach(function(corner) {
                    // Apply model's world transformation to the local bounding box corners
                    corner.applyMatrix4(_this.pandaModel.matrixWorld);
                    // Project to Normalized Device Coordinates (NDC)
                    corner.project(_this.camera);
                    // Convert NDC to screen coordinates (origin at center of screen)
                    // This matches the coordinate system of pinchPointScreen
                    var screenX = corner.x * (canvasWidth / 2);
                    var screenY = corner.y * (canvasHeight / 2); // In Three.js NDC, +Y is up
                    minX = Math.min(minX, screenX);
                    maxX = Math.max(maxX, screenX);
                    minY = Math.min(minY, screenY);
                    maxY = Math.max(maxY, screenY);
                });
                if (minX === Infinity) return null; // All points were behind camera or some other issue
                return {
                    minX: minX,
                    minY: minY,
                    maxX: maxX,
                    maxY: maxY
                };
            }
        },
        {
            key: "_getVisibleVideoParameters",
            value: function _getVisibleVideoParameters() {
                if (!this.videoElement || this.videoElement.videoWidth === 0 || this.videoElement.videoHeight === 0) {
                    return null;
                }
                var vNatW = this.videoElement.videoWidth;
                var vNatH = this.videoElement.videoHeight;
                var rW = this.renderDiv.clientWidth;
                var rH = this.renderDiv.clientHeight;
                if (vNatW === 0 || vNatH === 0 || rW === 0 || rH === 0) return null;
                var videoAR = vNatW / vNatH;
                var renderDivAR = rW / rH;
                var finalVideoPixelX, finalVideoPixelY;
                var visibleVideoPixelWidth, visibleVideoPixelHeight;
                if (videoAR > renderDivAR) {
                    // Video is wider than renderDiv, scaled to fit renderDiv height, cropped horizontally.
                    var scale = rH / vNatH; // Scale factor based on height.
                    var scaledVideoWidth = vNatW * scale; // Width of video if scaled to fit renderDiv height.
                    // Total original video pixels cropped horizontally (from both sides combined).
                    var totalCroppedPixelsX = (scaledVideoWidth - rW) / scale;
                    finalVideoPixelX = totalCroppedPixelsX / 2; // Pixels cropped from the left of original video.
                    finalVideoPixelY = 0; // No vertical cropping.
                    visibleVideoPixelWidth = vNatW - totalCroppedPixelsX; // Width of the visible part in original video pixels.
                    visibleVideoPixelHeight = vNatH; // Full height is visible.
                } else {
                    // Video is taller than renderDiv (or same AR), scaled to fit renderDiv width, cropped vertically.
                    var scale1 = rW / vNatW; // Scale factor based on width.
                    var scaledVideoHeight = vNatH * scale1; // Height of video if scaled to fit renderDiv width.
                    // Total original video pixels cropped vertically (from top and bottom combined).
                    var totalCroppedPixelsY = (scaledVideoHeight - rH) / scale1;
                    finalVideoPixelX = 0; // No horizontal cropping.
                    finalVideoPixelY = totalCroppedPixelsY / 2; // Pixels cropped from the top of original video.
                    visibleVideoPixelWidth = vNatW; // Full width is visible.
                    visibleVideoPixelHeight = vNatH - totalCroppedPixelsY; // Height of the visible part in original video pixels.
                }
                // Safety check for degenerate cases (e.g., extreme aspect ratios leading to zero visible dimension)
                if (visibleVideoPixelWidth <= 0 || visibleVideoPixelHeight <= 0) {
                    // Fallback or log error, this shouldn't happen in normal scenarios
                    console.warn("Calculated visible video dimension is zero or negative.", {
                        visibleVideoPixelWidth: visibleVideoPixelWidth,
                        visibleVideoPixelHeight: visibleVideoPixelHeight
                    });
                    return {
                        offsetX: 0,
                        offsetY: 0,
                        visibleWidth: vNatW,
                        visibleHeight: vNatH,
                        videoNaturalWidth: vNatW,
                        videoNaturalHeight: vNatH
                    };
                }
                return {
                    offsetX: finalVideoPixelX,
                    offsetY: finalVideoPixelY,
                    visibleWidth: visibleVideoPixelWidth,
                    visibleHeight: visibleVideoPixelHeight,
                    videoNaturalWidth: vNatW,
                    videoNaturalHeight: vNatH
                };
            }
        },
        {
            // _updateGhosts method removed.
            key: "_showStatusScreen",
            value: function _showStatusScreen(message) {
                var color = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'white', showRestartHint = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                this.gameOverContainer.style.display = 'block';
                this.gameOverText.innerText = message;
                this.gameOverText.style.color = color;
                this.restartHintText.style.display = showRestartHint ? 'block' : 'none';
            // No spawning to stop for template
            }
        },
        {
            key: "_showError",
            value: function _showError(message) {
                this.gameOverContainer.style.display = 'block';
                this.gameOverText.innerText = "ERROR: ".concat(message);
                this.gameOverText.style.color = 'orange';
                this.restartHintText.style.display = 'true'; // Show restart hint on error
                this.gameState = 'error';
                // No spawning to stop
                this.hands.forEach(function(hand) {
                    if (hand.lineGroup) hand.lineGroup.visible = false;
                });
            }
        },
        {
            key: "_restartGame",
            value: function _restartGame() {
                console.log("Restarting tracking...");
                this.gameOverContainer.style.display = 'none';
                this.hands.forEach(function(hand) {
                    if (hand.lineGroup) {
                        hand.lineGroup.visible = false;
                    }
                });
                // Ghost removal removed
                // Score reset removed
                // Visibility of game elements removed
                this.gameState = 'tracking'; // Changed from 'playing'
                this.lastVideoTime = -1;
                this.clock.start();
            // Removed _startSpawning()
            }
        },
        {
            // _updateScoreDisplay method removed.
            key: "_onResize",
            value: function _onResize() {
                var width = this.renderDiv.clientWidth;
                var height = this.renderDiv.clientHeight;
                // Update camera perspective
                this.camera.left = width / -2;
                this.camera.right = width / 2;
                this.camera.top = height / 2;
                this.camera.bottom = height / -2;
                this.camera.updateProjectionMatrix();
                // Update renderer size
                this.renderer.setSize(width, height);
                // Update video element size
                this.videoElement.style.width = width + 'px';
                this.videoElement.style.height = height + 'px';
            // Watermelon, Chad, GroundLine updates removed.
            }
        },
        {
            key: "_updateHandLines",
            value: function _updateHandLines(handIndex, landmarks, videoParams, canvasWidth, canvasHeight) {
                var _this = this;
                var hand = this.hands[handIndex];
                var lineGroup = hand.lineGroup;
                // Determine if this specific hand is currently involved in a grab/scale interaction
                var isThisHandActivelyInteracting = false;
                if (this.interactionMode === 'drag' || this.interactionMode === 'rotate') {
                    isThisHandActivelyInteracting = this.grabbingHandIndex === handIndex && this.pickedUpModel === this.pandaModel;
                } else if (this.interactionMode === 'scale') {
                    // For scale, both hands involved show the effect if scaling is active
                    isThisHandActivelyInteracting = this.scaleInitialPinchDistance !== null && (handIndex === 0 || handIndex === 1);
                } else if (this.interactionMode === 'animate') {
                    // For animate, the hand controlling animation scrolling (via pinch) shows the effect
                    isThisHandActivelyInteracting = this.animationControlHandIndex === handIndex;
                }
                var currentHandMaterial = handIndex === 0 ? this.fingertipMaterialHand1 : this.fingertipMaterialHand2;
                if (currentHandMaterial) {
                    currentHandMaterial.opacity = isThisHandActivelyInteracting ? this.fingertipGrabOpacity : this.fingertipDefaultOpacity;
                }
                while(lineGroup.children.length){
                    var child = lineGroup.children[0];
                    lineGroup.remove(child);
                    if (child.geometry) child.geometry.dispose();
                // Materials are shared, no need to dispose them here unless they are unique per line/circle
                }
                if (!landmarks || landmarks.length === 0 || !videoParams) {
                    lineGroup.visible = false;
                    return;
                }
                var isAnyLandmarkOffScreen = false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // First, check if any landmark is off-screen based on unclamped normalized coordinates
                    for(var _iterator = landmarks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var lm = _step.value;
                        var lmOriginalX = lm.x * videoParams.videoNaturalWidth;
                        var lmOriginalY = lm.y * videoParams.videoNaturalHeight;
                        var normX_visible = (lmOriginalX - videoParams.offsetX) / videoParams.visibleWidth;
                        var normY_visible = (lmOriginalY - videoParams.offsetY) / videoParams.visibleHeight;
                        if (normX_visible < 0 || normX_visible > 1 || normY_visible < 0 || normY_visible > 1) {
                            isAnyLandmarkOffScreen = true;
                            break;
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
                if (isAnyLandmarkOffScreen) {
                    lineGroup.visible = false;
                    return;
                }
                // If all landmarks are on-screen (or would be, before clamping), proceed to calculate points3D for drawing.
                // These points will use clamped coordinates to ensure they are drawn within canvas bounds if very close to edge.
                var points3D = landmarks.map(function(lm) {
                    var lmOriginalX = lm.x * videoParams.videoNaturalWidth;
                    var lmOriginalY = lm.y * videoParams.videoNaturalHeight;
                    var normX_visible = (lmOriginalX - videoParams.offsetX) / videoParams.visibleWidth;
                    var normY_visible = (lmOriginalY - videoParams.offsetY) / videoParams.visibleHeight;
                    // Clamp values FOR DRAWING purposes
                    normX_visible = Math.max(0, Math.min(1, normX_visible));
                    normY_visible = Math.max(0, Math.min(1, normY_visible));
                    var x = (1 - normX_visible) * canvasWidth - canvasWidth / 2;
                    var y = (1 - normY_visible) * canvasHeight - canvasHeight / 2;
                    return new THREE.Vector3(x, y, 1.1); // Z for fingertip circles, slightly in front of lines
                });
                var lineZ = 1; // Z for connection lines
                this.handConnections.forEach(function(conn) {
                    var p1 = points3D[conn[0]];
                    var p2 = points3D[conn[1]];
                    if (p1 && p2) {
                        // Create points for the line with the correct Z
                        var lineP1 = p1.clone().setZ(lineZ);
                        var lineP2 = p2.clone().setZ(lineZ);
                        var geometry = new THREE.BufferGeometry().setFromPoints([
                            lineP1,
                            lineP2
                        ]);
                        var line = new THREE.Line(geometry, _this.handLineMaterial);
                        lineGroup.add(line);
                    }
                });
                // Draw fingertip circles
                var fingertipRadius = 8; // Radius of the circle for fingertips
                var wristRadius = 12; // Larger radius for the wrist
                var circleSegments = 16; // Smoothness of the circle
                this.fingertipLandmarkIndices.forEach(function(index) {
                    var landmarkPosition = points3D[index];
                    if (landmarkPosition) {
                        var radius = index === 0 ? wristRadius : fingertipRadius; // Use wristRadius for landmark 0
                        var circleGeometry = new THREE.CircleGeometry(radius, circleSegments);
                        // The 'currentHandMaterial' (fetched and opacity-updated above) is used here.
                        var landmarkCircle = new THREE.Mesh(circleGeometry, currentHandMaterial);
                        landmarkCircle.position.copy(landmarkPosition); // Already has Z=1.1
                        // Pulse scaling also depends on 'isThisHandActivelyInteracting'
                        if (isThisHandActivelyInteracting) {
                            // Apply pulsing effect to scale
                            // (1 + sin) / 2 gives a 0-1 range, perfect for modulating amplitude
                            var currentPulseProgress = (1 + Math.sin(_this.clock.elapsedTime * _this.grabbingPulseSpeed)) / 2;
                            var scaleValue = _this.pulseBaseScale + currentPulseProgress * _this.grabbingPulseAmplitude;
                            landmarkCircle.scale.set(scaleValue, scaleValue, 1);
                        } else {
                            landmarkCircle.scale.set(_this.pulseBaseScale, _this.pulseBaseScale, 1); // Reset scale
                        }
                        lineGroup.add(landmarkCircle);
                    }
                });
                lineGroup.visible = true;
            }
        },
        {
            key: "_animate",
            value: function _animate() {
                requestAnimationFrame(this._animate.bind(this));
                var deltaTime = this.clock.getDelta();
                // Update hands if tracking
                if (this.gameState === 'tracking') {
                    this._updateHands();
                }
                // Update animation mixer
                if (this.animationMixer) {
                    this.animationMixer.update(deltaTime);
                }
                // Bounding box helper visibility logic REMOVED
                // _updateGhosts and _updateParticles calls removed.
                // Always render the scene
                this.renderer.render(this.scene, this.camera);
            }
        },
        {
            key: "start",
            value: function start() {
                var _this = this;
                // Add click listener for resuming audio context and potentially restarting on error
                this.renderDiv.addEventListener('click', function() {
                    _this.audioManager.resumeContext();
                    if (_this.gameState === 'error' || _this.gameState === 'paused') {
                        _this._restartGame(); // Restart tracking
                    }
                });
                console.log('Game setup initiated. Waiting for async operations...');
            // Note: Game interaction now starts automatically after _init completes.
            }
        },
        {
            key: "_updateSpeechBubbleAppearance",
            value: function _updateSpeechBubbleAppearance() {
                if (!this.speechBubble) return;
                var isPlaceholder = this.speechBubble.innerHTML === "..." || this.speechBubble.innerText === "...";
                // Apply active styling only if recognition is generally active AND we are not displaying the placeholder.
                // This means interim/final text will get the active style, but the "..." placeholder will not,
                // even if the recognition service itself is still running in the background.
                var showActiveStyling = this.isSpeechActive && !isPlaceholder;
                var translateY = isPlaceholder ? '-5px' : '0px';
                var scale = showActiveStyling ? '1.15' : '1.0';
                this.speechBubble.style.transform = "translateX(-50%) translateY(".concat(translateY, ") scale(").concat(scale, ")");
                if (showActiveStyling) {
                    // Cyan glow, blue drop shadow, enhanced original shadow
                    // Active speech bubble: brighter color, stronger shadow
                    this.speechBubble.style.boxShadow = '5px 5px 0px #007bff'; // Active blue shadow
                    this.speechBubble.style.border = '2px solid black'; // Keep black border
                    this.speechBubble.style.padding = '18px 28px'; // Slightly larger padding
                    this.speechBubble.style.fontSize = 'clamp(20px, 3.5vw, 26px)'; // Larger font when active
                    this.speechBubble.style.top = '15px'; // Increased top margin when active, reduced from 30px to complement base 10px
                } else {
                    // Default/inactive styling
                    // Default/inactive speech bubble styling
                    this.speechBubble.style.boxShadow = '4px 4px 0px rgba(0,0,0,1)'; // Hard black shadow
                    this.speechBubble.style.border = '2px solid black'; // Black border
                    this.speechBubble.style.padding = '15px 25px';
                    this.speechBubble.style.fontSize = 'clamp(16px, 3vw, 22px)'; // Original font size
                    this.speechBubble.style.top = '10px'; // Original top margin, changed from 20px
                }
            }
        },
        {
            key: "_setupSpeechRecognition",
            value: function _setupSpeechRecognition() {
                var _this = this;
                this.speechManager = new SpeechManager(function(finalTranscript, interimTranscript) {
                    if (_this.speechBubble) {
                        clearTimeout(_this.speechBubbleTimeout);
                        if (finalTranscript) {
                            _this.speechBubble.innerHTML = finalTranscript;
                            _this.speechBubble.style.opacity = '1';
                            _this._sendAIMessage(finalTranscript).then(function(reply){
                                _this.speechBubble.innerHTML = reply;
                            }).catch(function(err){ console.error("AI error", err); });
                            _this.speechBubbleTimeout = setTimeout(function() {
                                _this.speechBubble.innerHTML = "...";
                                _this.speechBubble.style.opacity = '0.7';
                                _this._updateSpeechBubbleAppearance(); // Update appearance for "..."
                            }, 2000);
                        } else if (interimTranscript) {
                            _this.speechBubble.innerHTML = '<i style="color: #888;">'.concat(interimTranscript, "</i>");
                            _this.speechBubble.style.opacity = '1';
                        } else {
                            _this.speechBubbleTimeout = setTimeout(function() {
                                if (_this.speechBubble.innerHTML !== "...") {
                                    _this.speechBubble.innerHTML = "...";
                                }
                                _this.speechBubble.style.opacity = '0.7';
                                _this._updateSpeechBubbleAppearance(); // Update appearance for "..."
                            }, 500);
                        }
                        _this._updateSpeechBubbleAppearance();
                    }
                }, function(isActive) {
                    _this.isSpeechActive = isActive;
                    _this._updateSpeechBubbleAppearance();
                }, function(command) {
                    console.log("Game received command: ".concat(command));
                    var validCommands = [
                        'drag',
                        'rotate',
                        'scale',
                        'animate'
                    ];
                    if (validCommands.includes(command.toLowerCase())) {
                        _this._setInteractionMode(command.toLowerCase());
                    } else {
                        console.warn("Unrecognized command via speech: ".concat(command));
                    }
                });
                // Initialize speech bubble with "..." and apply initial appearance
                if (this.speechBubble) {
                    this.speechBubble.innerHTML = "...";
                    this.speechBubble.style.opacity = '0.7';
                    this._updateSpeechBubbleAppearance(); // Apply initial styles (isSpeechActive will be false)
                }
            // We will call requestPermissionAndStart() on user interaction (e.g., start button)
            }
        },
        {
            key: "_playAnimation",
            value: function _playAnimation(name) {
                if (!this.animationActions[name]) {
                    console.warn('Animation "'.concat(name, '" not found.'));
                    return;
                }
                var newAction = this.animationActions[name];
                if (this.currentAction === newAction && newAction.isRunning()) {
                    console.log('Animation "'.concat(name, '" is already playing.'));
                    return; // Already playing this animation
                }
                if (this.currentAction) {
                    this.currentAction.fadeOut(0.5); // Fade out current animation over 0.5 seconds
                }
                newAction.reset().fadeIn(0.5).play(); // Reset, fade in and play new animation
                this.currentAction = newAction;
                console.log("Playing animation: ".concat(name));
                this._updateButtonStyles(name);
            }
        },
        {
            key: "_updateButtonStyles",
            value: function _updateButtonStyles(activeAnimationName) {
                var buttons = this.animationButtonsContainer.children;
                for(var i = 0; i < buttons.length; i++){
                    var button = buttons[i];
                    var isActive = button.innerText === activeAnimationName;
                    button.style.backgroundColor = isActive ? '#007bff' : '#f0f0f0'; // Blue if active, light grey if not
                    button.style.color = isActive ? 'white' : 'black';
                    button.style.fontWeight = isActive ? 'bold' : 'normal';
                    // Active button has its shadow "pressed"
                    button.style.boxShadow = isActive ? '1px 1px 0px black' : '2px 2px 0px black';
                }
            }
        },
        {
            key: "_sendAIMessage",
            value: function _sendAIMessage(message) {
                if (!this.openAIApiKey) {
                    return Promise.resolve("(AI API key not set)");
                }
                return fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.openAIApiKey
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: message }]
                    })
                }).then(function(res){ return res.json(); }).then(function(data){
                    if (data && data.choices && data.choices[0] && data.choices[0].message) {
                        return data.choices[0].message.content.trim();
                    } else {
                        throw new Error("Invalid AI response");
                    }
                });
            }
        },
        {
            key: "_setInteractionMode",
            value: function _setInteractionMode(mode) {
                var _this = this;
                if (this.interactionMode === mode) return; // No change
                console.log("Setting interaction mode to: ".concat(mode));
                this.interactionMode = mode;
                // If currently grabbing, release the model
                if (this.grabbingHandIndex !== -1 && this.pickedUpModel) {
                    console.log("Interaction mode changed while grabbing. Releasing model from hand ".concat(this.grabbingHandIndex, "."));
                    this.grabbingHandIndex = -1;
                    this.pickedUpModel = null;
                    this.rotateLastHandX = null;
                    this.scaleInitialPinchDistance = null; // Reset scaling variables
                    this.scaleInitialModelScale = null;
                // if (this.grabMarker && this.pandaModel) this.grabMarker.visible = true; // Grab marker removed
                }
                this._updateHandMaterialsForMode(mode); // Update hand colors for new mode
                this._updateInteractionModeButtonStyles();
                // Show/hide animation buttons container based on mode
                if (this.animationButtonsContainer) {
                    if (mode === 'animate') {
                        this.animationButtonsContainer.style.display = 'flex';
                        requestAnimationFrame(function() {
                            _this.animationButtonsContainer.style.opacity = '1';
                        });
                    } else {
                        this.animationButtonsContainer.style.opacity = '0';
                        // Wait for transition to complete before setting display to none
                        setTimeout(function() {
                            if (_this.interactionMode !== 'animate') {
                                _this.animationButtonsContainer.style.display = 'none';
                            }
                        }, 300); // Corresponds to transition duration
                    }
                }
                this._updateInstructionText(); // Update instruction text when mode changes
            }
        },
        {
            key: "_updateInstructionText",
            value: function _updateInstructionText() {
                if (this.instructionTextElement) {
                    var instruction = this.interactionModeInstructions[this.interactionMode] || "Use hand gestures to interact.";
                    this.instructionTextElement.innerText = instruction;
                    // The instruction text should always be 10px from the bottom.
                    // The animation buttons are positioned from the top-left and should not affect this.
                    this.instructionTextElement.style.bottom = '10px'; // Decreased bottom margin
                }
            }
        },
        {
            key: "_updateHandMaterialsForMode",
            value: function _updateHandMaterialsForMode(mode) {
                var modeConfig = this.interactionModeColors[mode];
                var colorToSet = modeConfig ? modeConfig.hand : new THREE.Color(0x00ccff); // Fallback color
                if (this.fingertipMaterialHand1) {
                    this.fingertipMaterialHand1.color.set(colorToSet);
                }
                if (this.fingertipMaterialHand2) {
                    this.fingertipMaterialHand2.color.set(colorToSet);
                }
            }
        },
        {
            key: "_updateInteractionModeButtonStyles",
            value: function _updateInteractionModeButtonStyles() {
                var _this = this;
                for(var modeKey in this.interactionModeButtons){
                    var button = this.interactionModeButtons[modeKey];
                    var modeConfig = this.interactionModeColors[modeKey];
                    var fallbackColor = '#6c757d';
                    var fallbackTextColor = 'white';
                    if (modeKey === this.interactionMode) {
                        button.style.border = '2px solid black'; // All buttons have black border
                        if (modeConfig) {
                            button.style.backgroundColor = modeConfig.base;
                            button.style.color = modeConfig.text;
                        } else {
                            button.style.backgroundColor = fallbackColor;
                            button.style.color = fallbackTextColor;
                        }
                        button.style.fontWeight = 'bold'; // Already bold from initial setup, but ensure it stays
                        button.style.boxShadow = '1px 1px 0px black'; // "Pressed" shadow for active button
                    } else {
                        button.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // More opaque transparent white background
                        button.style.border = '2px solid black'; // Black border for inactive
                        if (modeConfig) {
                            button.style.color = modeConfig.base; // Neon text color
                        } else {
                            button.style.color = fallbackColor; // Fallback text color for inactive
                        }
                        button.style.fontWeight = 'bold'; // Always bold
                        button.style.boxShadow = '2px 2px 0px black'; // Default shadow for inactive
                    }
                }
                // Explicitly set display for animationButtonsContainer based on current mode
                // This ensures it's correct even on initial load if default mode isn't 'animate'
                if (this.animationButtonsContainer) {
                    if (this.interactionMode === 'animate') {
                        this.animationButtonsContainer.style.display = 'flex';
                        requestAnimationFrame(function() {
                            _this.animationButtonsContainer.style.opacity = '1';
                        });
                    } else {
                        this.animationButtonsContainer.style.opacity = '0';
                        this.animationButtonsContainer.style.display = 'none'; // Set display none immediately if not animate
                    }
                }
                this._updateInstructionText(); // Also call here to adjust position if animation buttons are shown/hidden
            }
        },
        {
            key: "_setupDragAndDrop",
            value: function _setupDragAndDrop() {
                var _this = this;
                this.renderDiv.addEventListener('dragover', function(event) {
                    event.preventDefault(); // Prevent default behavior to allow drop
                    event.dataTransfer.dropEffect = 'copy'; // Show a copy icon
                    _this.renderDiv.style.border = '2px dashed #007bff'; // Visual feedback
                });
                this.renderDiv.addEventListener('dragleave', function(event) {
                    _this.renderDiv.style.border = 'none'; // Remove visual feedback
                });
                this.renderDiv.addEventListener('drop', function(event) {
                    event.preventDefault();
                    _this.renderDiv.style.border = 'none'; // Remove visual feedback
                    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                        var file = event.dataTransfer.files[0];
                        var fileName = file.name.toLowerCase();
                        var fileType = file.type.toLowerCase();
                        if (fileName.endsWith('.gltf') || fileName.endsWith('.glb') || fileType === 'model/gltf+json' || fileType === 'model/gltf-binary') {
                            console.log("GLTF file dropped: ".concat(file.name), file);
                            // Next step: Process and load this file.
                            _this._loadDroppedModel(file);
                        } else {
                            console.warn('Dropped file is not a recognized GLTF format:', file.name, file.type);
                            _this._showStatusScreen('"'.concat(file.name, '" is not a GLTF model.'), 'orange', false);
                            setTimeout(function() {
                                if (_this.gameOverContainer.style.display === 'block' && _this.gameOverText.innerText.includes(file.name)) {
                                    _this.gameOverContainer.style.display = 'none';
                                }
                            }, 3000);
                        }
                        event.dataTransfer.clearData();
                    }
                });
            }
        },
        {
            key: "_loadDroppedModel",
            value: function _loadDroppedModel(file) {
                var _this = this;
                console.log("Processing dropped model:", file.name, file.type);
                var reader = new FileReader();
                reader.onload = function(e) {
                    // Pass file.type as well, it might be useful for _parseAndLoadGltf context
                    _this._parseAndLoadGltf(e.target.result, file.name, file.type);
                };
                reader.onerror = function(error) {
                    console.error("FileReader error for ".concat(file.name, ":"), error);
                    _this._showError("Error reading file ".concat(file.name, "."));
                    // Ensure loading message is hidden if it was shown by this function
                    if (_this.gameOverContainer.style.display === 'block' && _this.gameOverText.innerText.startsWith('Loading "'.concat(file.name, '"'))) {
                        _this.gameOverContainer.style.display = 'none';
                    }
                };
                var fileNameLower = file.name.toLowerCase();
                var fileTypeLower = file.type ? file.type.toLowerCase() : '';
                if (fileNameLower.endsWith('.glb') || fileTypeLower === 'model/gltf-binary') {
                    console.log("Reading ".concat(file.name, " as ArrayBuffer."));
                    reader.readAsArrayBuffer(file);
                } else if (fileNameLower.endsWith('.gltf') || fileTypeLower === 'model/gltf+json') {
                    console.log("Reading ".concat(file.name, " as text."));
                    reader.readAsText(file);
                } else {
                    var message = file.type ? "Unsupported file type: ".concat(file.type) : 'Cannot determine file type.';
                    console.warn("Unknown file format for GLTF loader: ".concat(file.name, ", Type: ").concat(file.type));
                    this._showError("".concat(message, " for ").concat(file.name, ". Please drop a .gltf or .glb file."));
                    // Ensure loading message is hidden
                    if (this.gameOverContainer.style.display === 'block' && this.gameOverText.innerText.startsWith('Loading "'.concat(file.name, '"'))) {
                        this.gameOverContainer.style.display = 'none';
                    }
                }
            }
        },
        {
            key: "_parseAndLoadGltf",
            value: function _parseAndLoadGltf(content, fileName, fileType) {
                var _this = this;
                var loader = new GLTFLoader(); // GLTFLoader is already imported at the top
                try {
                    // The 'path' argument is for resolving relative paths for external resources like .bin or textures.
                    // For a single file drop, this is typically empty. If it's a .gltf with external files,
                    // those files would need to be handled separately (e.g., by being dropped together and identified).
                    // This setup works best for self-contained .glb files or .gltf files using data URIs.
                    loader.parse(content, '', function(gltf) {
                        console.log("Successfully parsed GLTF model: ".concat(fileName), gltf);
                        // 1. If a previous model exists, remove it and clean up its animations
                        if (_this.pandaModel) {
                            _this.scene.remove(_this.pandaModel);
                            // Consider disposing geometry/materials of this.pandaModel here for memory management in a larger app
                            console.log("Removed previous model from scene.");
                            if (_this.animationMixer) {
                                _this.animationMixer.stopAllAction();
                                _this.currentAction = null;
                            }
                            // Clear out old animation buttons
                            while(_this.animationButtonsContainer.firstChild){
                                _this.animationButtonsContainer.removeChild(_this.animationButtonsContainer.firstChild);
                            }
                            _this.animationActions = {};
                            _this.animationClips = [];
                        }
                        // 2. Set the new model as the current model
                        _this.pandaModel = gltf.scene;
                        // 3. Scale and position the new model
                        var scale = 80;
                        _this.pandaModel.scale.set(scale, scale, scale);
                        var sceneHeight = _this.renderDiv.clientHeight;
                        _this.pandaModel.position.set(0, sceneHeight * -0.45, -1000);
                        // 4. Add the new model to the scene
                        _this.scene.add(_this.pandaModel);
                        console.log('Added new model "'.concat(fileName, '" to scene.'));
                        // 5. Setup animations for the new model
                        _this.animationMixer = new THREE.AnimationMixer(_this.pandaModel);
                        _this.animationClips = gltf.animations;
                        _this.animationActions = {}; // Ensure it's clean for new actions
                        if (_this.animationClips && _this.animationClips.length) {
                            _this.animationClips.forEach(function(clip, index) {
                                var action = _this.animationMixer.clipAction(clip);
                                var actionName = clip.name || "Animation ".concat(index + 1);
                                _this.animationActions[actionName] = action;
                                var button = document.createElement('button');
                                button.innerText = actionName;
                                button.style.padding = '5px 10px';
                                button.style.fontSize = '13px';
                                button.style.backgroundColor = '#f0f0f0';
                                button.style.color = 'black';
                                button.style.border = '2px solid black';
                                button.style.borderRadius = '4px';
                                button.style.cursor = 'pointer';
                                button.style.transition = 'background-color 0.2s ease, box-shadow 0.2s ease';
                                button.style.boxShadow = '2px 2px 0px black';
                                button.addEventListener('click', function() {
                                    return _this._playAnimation(actionName);
                                });
                                _this.animationButtonsContainer.appendChild(button);
                            });
                            var defaultActionName = Object.keys(_this.animationActions)[0];
                            var idleActionKey = Object.keys(_this.animationActions).find(function(name) {
                                return name.toLowerCase().includes('idle');
                            });
                            if (idleActionKey) {
                                defaultActionName = idleActionKey;
                            }
                            if (defaultActionName && _this.animationActions[defaultActionName]) {
                                _this.currentAction = _this.animationActions[defaultActionName];
                                _this.currentAction.reset().play();
                                _this._updateButtonStyles(defaultActionName);
                            } else {
                                _this.currentAction = null;
                            }
                        } else {
                            console.log('New model "'.concat(fileName, '" has no embedded animations.'));
                            _this.currentAction = null;
                        }
                        // 6. Reset interaction states
                        _this.grabbingHandIndex = -1;
                        _this.pickedUpModel = null;
                        _this.rotateLastHandX = null;
                        _this.scaleInitialPinchDistance = null;
                        _this.scaleInitialModelScale = null;
                        _this.animationControlHandIndex = -1;
                        _this.animationControlInitialPinchY = null;
                        // This will ensure animation buttons are shown/hidden correctly based on current mode
                        _this._updateInteractionModeButtonStyles();
                        _this.loadedDroppedModelData = null; // Clear the temp storage
                    }, function(error) {
                        console.error("Error parsing GLTF model ".concat(fileName, ":"), error);
                        _this._showError('Failed to parse "'.concat(fileName, '". Model might be corrupt or unsupported. Check console.'));
                    });
                } catch (e) {
                    // This catch is for synchronous errors during loader.parse() setup, though most errors are async.
                    console.error("Critical error during GLTF parsing setup for ".concat(fileName, ":"), e);
                    this._showError('Error setting up parser for "'.concat(fileName, '".'));
                }
            }
        }
    ]);
    return Game;
}();
