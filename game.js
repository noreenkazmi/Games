// PixiJS App Initialization
const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x000000 // Black background

});
document.body.appendChild(app.view);

let score = 0; // Initialize score
let gameOverFlag = false; // Flag to track if the game is over

// Score Text
const scoreText = new PIXI.Text('Score: 0', {
  fontFamily: 'Arial',
  fontSize: 36,
  fill: 0xffffff
});
scoreText.x = 20;
scoreText.y = 20;
app.stage.addChild(scoreText);

// Game Over Text
let gameOverText = new PIXI.Text('Game Over!', {
  fontFamily: 'Arial',
  fontSize: 60,
  fill: 0xff0000,
  align: 'center'
});
gameOverText.x = app.screen.width / 2 - gameOverText.width / 2;
gameOverText.y = app.screen.height / 2 - gameOverText.height / 2;
gameOverText.visible = false; // Initially hidden
app.stage.addChild(gameOverText);

// Balloon Container
const balloonContainer = new PIXI.Container();
app.stage.addChild(balloonContainer);

// Function to Create Balloons
function createBalloon() {
  if (gameOverFlag) return; // Stop creating balloons if game over

  const balloon = new PIXI.Graphics();
  balloon.beginFill(PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]));
  balloon.drawEllipse(0, 0, 30, 50);
  balloon.endFill();

  balloon.x = Math.random() * app.screen.width; // Random horizontal position
  balloon.y = app.screen.height + 50; // Start from the bottom of the screen

  balloon.interactive = true; // Make the balloon interactive
  balloon.buttonMode = true; // Set it as a clickable button

  // Balloon Click Event
  balloon.on('pointerdown', () => {
    balloonContainer.removeChild(balloon); // Remove balloon on click
    score += 10; // Increase score by 10
    scoreText.text = `Score: ${score}`; // Update score text
  });

  balloonContainer.addChild(balloon); // Add balloon to the container
}

// Create Balloons Every Second
setInterval(createBalloon, 1000);

// Game Loop
app.ticker.add(() => {
  if (gameOverFlag) return; // If game over, stop the game loop

  // Move each balloon upwards
  for (let balloon of balloonContainer.children) {
    balloon.y -= 1; // Slow down balloon movement

    // Remove balloon if it goes off-screen
    if (balloon.y < -50) {
      balloonContainer.removeChild(balloon); // Remove balloon if it's off-screen
      gameOver(); // Trigger game over if balloon goes off-screen
    }
  }
});

// Game Over Function
function gameOver() {
  if (gameOverFlag) return; // Prevent multiple game over triggers

  gameOverFlag = true; // Set game over flag to true
  gameOverText.visible = true; // Show the game over text

  // Optionally stop the ticker if you want to completely freeze the game
  app.ticker.stop();

  // Optional: Add code here to reset or restart the game after some time
  // setTimeout(resetGame, 3000); // Restart after 3 seconds (example)
}

// Reset the Game (Optional)
function resetGame() {
  score = 0;
  scoreText.text = 'Score: 0';
  balloonContainer.removeChildren(); // Remove all balloons
  gameOverText.visible = false; // Hide game over text
  gameOverFlag = false; // Reset game over flag
  app.ticker.start(); // Start the game loop again
}
