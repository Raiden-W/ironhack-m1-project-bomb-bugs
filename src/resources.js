const bgWallImg = new Image();
const blockImg = new Image();
const bombImg = new Image();
const boomEffectImg = new Image();
const clockImg = new Image();
const pipeImg = new Image();
const bugImgs = [];

bgWallImg.src = "src/images/wall-small.jpg";
blockImg.src = "src/images/wooden-log.png";
bombImg.src = "src/images/bomb.png";
boomEffectImg.src = "src/images/boom.png";
clockImg.src = "src/images/clock.png";
pipeImg.src = "src/images/pipe.png";

for (let i = 0; i < 6; i++) {
	const bugImg = new Image();
	bugImg.src = `src/images/bug${i + 1}.png`;
	bugImgs.push(bugImg);
}

const bgAudio = new Audio("src/audio/bg-audio.mp3");
const gameOverSound = new Audio("src/audio/game-over.mp3");
const finalWinSound = new Audio("src/audio/final-win.mp3");
const bounceSound = new Audio("src/audio/bounce.mp3");
const explosionSound = new Audio("src/audio/explosion.mp3");
const regretSound = new Audio("src/audio/regret.mp3");
const whooshSound = new Audio("src/audio/whoosh.mp3");

bgAudio.autoplay = true;
bgAudio.loop = true;

bgAudio.volume = 0.17;
bounceSound.volume = 0.4;
explosionSound.volume = 0.4;
regretSound.volume = 0.3;
whooshSound.volume = 0.4;
gameOverSound.volume = 0.4;
finalWinSound.volume = 0.6;
