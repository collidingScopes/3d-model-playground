import { Game } from './game.js';

// Get the render target div
const renderDiv = document.getElementById('renderDiv');

// Check if renderDiv exists
if (!renderDiv) {
    console.error('Fatal Error: renderDiv element not found.');
} else {
    // Initialize the game with the render target
    const game = new Game(renderDiv);
}
