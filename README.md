# 3D Model Playground

Control 3D models using hand gestures and voice commands in real-time.

An interactive web app built with threejs, mediapipe computer vision, web speech API, and rosebud AI.

- Say "drag", "rotate", "scale", or "animate" to change the interaction mode
- Pinch fingers to control the 3D model
- Drag/drop or import a new 3D model (.gltf or .glb) onto the page to import it

[Video](https://x.com/measure_plan/status/1929900748235550912) | [Live Demo](https://collidingscopes.github.io/3d-model-playground/)

## Requirements

- Modern web browser with WebGL support
- Camera / microphone access

## Technologies

- **Three.js** for 3D rendering
- **MediaPipe** for hand tracking and gesture recognition
- **Web Speech API** for speech recognition
- **HTML5 Canvas** for visual feedback
- **JavaScript** for real-time interaction

## Setup for Development

```bash
# Clone this repository
git clone https://github.com/collidingScopes/3d-model-playground

# Navigate to the project directory
cd 3d-model-playground

# Install dependencies
npm install

# Start the dev server (uses vite)
npm run dev

# Or serve with your preferred method (example using Python)
python -m http.server
```

Then navigate to `http://localhost:8000` or the port printed by `npm run dev` in your browser.

Vite handles the dev/preview server, so any scripts such as `npm run dev` or `npm run preview` rely on it.

## License

MIT License

## Credits

- Three.js - https://threejs.org/
- MediaPipe - https://mediapipe.dev/
- Rosebud AI - https://rosebud.ai/
- Quaternius 3D models - https://quaternius.com/

## Related Projects

You might also like some of my other open source projects:

- [Threejs hand tracking tutorial](https://collidingScopes.github.io/threejs-handtracking-101) - Basic hand tracking setup with threejs and MediaPipe computer vision
- [Particular Drift](https://collidingScopes.github.io/particular-drift) - Turn photos into flowing particle animations
- [Liquid Logo](https://collidingScopes.github.io/liquid-logo) - Transform logos and icons into liquid metal animations
- [Video-to-ASCII](https://collidingScopes.github.io/ascii) - Convert videos into ASCII pixel art

## Contact

- Instagram: [@stereo.drift](https://www.instagram.com/stereo.drift/)
- Twitter/X: [@measure_plan](https://x.com/measure_plan)
- Email: [stereodriftvisuals@gmail.com](mailto:stereodriftvisuals@gmail.com)
- GitHub: [collidingScopes](https://github.com/collidingScopes)

## Donations

If you found this tool useful, feel free to buy me a coffee. 

My name is Alan, and I enjoy building open source software for computer vision, games, and more. This would be much appreciated during late-night coding sessions!

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/stereoDrift)
