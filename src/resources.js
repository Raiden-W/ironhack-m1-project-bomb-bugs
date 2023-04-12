const bgWallImg = new Image();
const blockImg = new Image();
const bombImg = new Image();
const boomEffectImg = new Image();
const clockImg = new Image();
const bugImgs = [];

bgWallImg.src = "src/images/wall-small.jpg";
blockImg.src = "src/images/wooden-log.png";
bombImg.src = "src/images/bomb.png";
boomEffectImg.src = "src/images/boom.png";
clockImg.src = "src/images/clock.png";

for (let i = 0; i < 6; i++) {
	const bugImg = new Image();
	bugImg.src = `src/images/bug${i + 1}.png`;
	bugImgs.push(bugImg);
}
