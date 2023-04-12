let blocks = [];
let limitedBlockNum = 1;

let candyNum = 1;
let candys = [];
let targets = [];
let candysRemoved = [];
let targetsRemoved = [];

let hitAmount = 0;
let hitGoal = 0;
let winCurrLevel = false;
let currLevel = 1;
let timeOfLevel = 30;
let timeLeft = timeOfLevel;

let animateId;
let intervelId;
let finalWin = false;
let gameOver = false;

let clickAmount = 0;
let mouseX = 0;
let mouseY = 0;

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const gamePanel = document.querySelector("#game-info");
const ctxPanel = gamePanel.getContext("2d");
const buttonsFrameHtml = document.querySelector("#buttons-list");
const gameIntro = document.querySelector(".game-intro");

//responsive mouse position
const getMousePos = (canvas, event) => {
	const rect = canvas.getBoundingClientRect();
	return {
		x: Math.round(event.clientX - rect.left),
		y: Math.round(event.clientY - rect.top),
	};
};

const startGame = () => {
	gameIntro.style.display = "none";
	canvas.style.display = "inline";
	gamePanel.style.display = "inline";
	buttonsFrameHtml.style.display = "flex";

	resetLevel(levelParams[currLevel - 1]);

	animate();
};

const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgWallImg, 0, 0, canvas.width, canvas.height);

	if (candys.length !== 0) {
		candys.forEach((candy) => {
			candy.drawCandy();
			candy.updatePos();
		});
	}

	if (blocks.length !== 0) {
		blocks.forEach((block, index) => {
			if (index !== 0 || clickAmount % 2 === 0) {
				if (!block.removeThis) block.doneLine();
			}

			if (candys.length !== 0) {
				candys.forEach((candy) => {
					if (block.checkCollision(candy)) {
						candy.isCollide = true;
						candy.collide(block);
					}
				});
			}
		});

		if (clickAmount % 2 === 1) blocks[0].updateLine();
	}

	if (targets.length !== 0) {
		targets.forEach((target) => {
			target.drawTargetInAni();

			if (candys.length !== 0) {
				candys.forEach((candy) => {
					const isHit = target.checkHit(candy);

					if (isHit) {
						setTimeout(() => {
							target.isBoomming = false;
						}, 2000);
						const currCandyRemoved = candys.splice(candys.indexOf(candy), 1)[0];
						const currTargetRemoved = targets.splice(
							targets.indexOf(target),
							1
						)[0];
						candysRemoved.unshift(currCandyRemoved);
						targetsRemoved.unshift(currTargetRemoved);

						hitAmount += 1;
					}
				});
			}
		});
	}

	//drawBoom
	if (targetsRemoved.length !== 0) {
		targetsRemoved[0].drawBoom();
	}

	drawInfoBar();

	if (hitAmount === hitGoal) {
		hitAmount = 0;
		clearInterval(intervelId);
		setTimeout(() => {
			winCurrLevel = true;
		}, 2000);
		console.log("You Win This Level");
	}

	if (winCurrLevel) {
		if (currLevel < levelParams.length) {
			currLevel += 1;

			cleanAllAssets();
			resetLevel(levelParams[currLevel - 1]);
		} else {
			finalWin = true;
		}

		winCurrLevel = false;
	}

	if (finalWin) {
		console.log("FINAL WIN!!!");
		cancelAnimationFrame(animateId);
		clearInterval(intervelId);
		cleanAllAssets();
		finalWinText();
		setTimeout(() => {
			canvas.style.display = "none";
			gamePanel.style.display = "none";
			gameIntro.style.display = "block";
			buttonsFrameHtml.style.display = "none";
			finalWin = false;
		}, 3500);
	} else if (gameOver) {
		console.log("TIME OVER!!!");
		cancelAnimationFrame(animateId);
		clearInterval(intervelId);
		cleanAllAssets();
		gameOverText();
		setTimeout(() => {
			canvas.style.display = "none";
			gamePanel.style.display = "none";
			gameIntro.style.display = "block";
			buttonsFrameHtml.style.display = "none";
			gameOver = false;
		}, 3500);
	} else animateId = requestAnimationFrame(animate);
};

const resetLevel = (currlevelParams) => {
	hitGoal = currlevelParams.candyNum;
	hitAmount = 0;

	timeOfLevel = currlevelParams.limitedTime;
	timeLeft = timeOfLevel;
	limitedBlockNum = currlevelParams.limitedBlockNum;
	candyNum = currlevelParams.candyNum;

	for (let i = 0; i < candyNum; i++) {
		setTimeout(() => {
			candys.push(new Candy(currlevelParams.candyX[i]));
		}, i * 1500);
	}

	for (let i = 0; i < candyNum; i++) {
		targets.push(
			new Target(currlevelParams.targets[i].x, currlevelParams.targets[i].y)
		);
	}

	intervelId = setInterval(() => {
		timeLeft -= 0.5;
		if (timeLeft <= 0) gameOver = true;
	}, 500);
};

const cleanAllAssets = () => {
	targetsRemoved = [];
	candysRemoved = [];
	candys = [];
	targets = [];
	blocks.forEach((block) => {
		block.cleanNode();
	});
	blocks = [];
};

const removeEleInBlocks = () => {
	blocks.forEach((block, index) => {
		if (block.removeThis) blocks.splice(blocks.indexOf(block), 1);
	});
	onlyLastBlockRemovable();

	if (hitAmount > 0) {
		targetsRemoved[0].isHit = false;
		targetsRemoved[0].isBoomming = false;
		candysRemoved[0].isCollide = false;
		candysRemoved[0].reset();
		candys.push(candysRemoved[0]);
		targets.push(targetsRemoved[0]);

		candysRemoved.shift();
		targetsRemoved.shift();
		hitAmount -= 1;
	}
};

const onlyLastBlockRemovable = () => {
	blocks.forEach((block, index) => {
		if (index === 0) {
			block.node.disabled = false;
			block.node.style.backgroundColor = "#5c2911";
		} else {
			block.node.disabled = true;
			block.node.style.backgroundColor = "#361c1b";
		}
	});
};

const finalWinText = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgWallImg, 0, 0, canvas.width, canvas.height);
	ctx.textAlign = "center";
	ctx.font = "bold 50px sans-serif";
	ctx.fillStyle = "yellow";
	ctx.fillText(`All Bugs Cleaned!`, canvas.width / 2, canvas.height / 2 - 70);
	ctx.fillStyle = "white";
	ctx.fillText(
		`Your have nailed this game`,
		canvas.width / 2,
		canvas.height / 2
	);
	ctx.fillText(
		`and passed all ${currLevel} levels`,
		canvas.width / 2,
		canvas.height / 2 + 70
	);
};

const gameOverText = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgWallImg, 0, 0, canvas.width, canvas.height);
	ctx.textAlign = "center";
	ctx.font = "bold 50px sans-serif";
	ctx.fillStyle = "yellow";
	ctx.fillText(`Time Is Up!`, canvas.width / 2, canvas.height / 2 - 70);
	ctx.fillStyle = "white";
	ctx.fillText(
		`You failed to clean all the bugs of level ${currLevel}.`,
		canvas.width / 2,
		canvas.height / 2
	);
};

const gradient1 = ctxPanel.createLinearGradient(50, 0, 100, 0);
gradient1.addColorStop(0.3, "#7d4523");
gradient1.addColorStop(1, "white");
const gradient2 = ctxPanel.createLinearGradient(0, 0, 50, 0);
gradient2.addColorStop(0.4, "#6666A3");
gradient2.addColorStop(1, "white");

const drawInfoBar = () => {
	const offsetHeight = 50;
	const offsetSide = 5;
	const barHeight = gamePanel.height - offsetHeight * 2;

	const currBarTimeHeight = (timeLeft / timeOfLevel) * barHeight;

	ctxPanel.clearRect(0, 0, gamePanel.width, gamePanel.height);

	ctxPanel.beginPath();
	ctxPanel.roundRect(
		gamePanel.width / 2 + offsetSide,
		offsetHeight,
		gamePanel.width / 2 - offsetSide * 2,
		barHeight,
		[10]
	);
	ctxPanel.lineWidth = "5";
	ctxPanel.stroke();
	ctxPanel.fillStyle = "#151414";
	ctxPanel.fill();
	ctxPanel.closePath();

	ctxPanel.beginPath();
	ctxPanel.roundRect(
		gamePanel.width / 2 + offsetSide,
		offsetHeight + (barHeight - currBarTimeHeight),
		gamePanel.width / 2 - offsetSide * 2,
		currBarTimeHeight,
		[10]
	);

	ctxPanel.lineWidth = "5";
	ctxPanel.stroke();
	ctxPanel.fillStyle = gradient1;
	ctxPanel.fill();
	ctxPanel.closePath();

	const currBarTargetHeight =
		((hitGoal - targetsRemoved.length) / hitGoal) * barHeight;

	ctxPanel.beginPath();
	ctxPanel.roundRect(
		offsetSide,
		offsetHeight,
		gamePanel.width / 2 - offsetSide * 2,
		barHeight,
		[10]
	);
	ctxPanel.lineWidth = "5";
	ctxPanel.stroke();
	ctxPanel.fillStyle = "#151414";
	ctxPanel.fill();
	ctxPanel.closePath();

	ctxPanel.beginPath();
	ctxPanel.roundRect(
		offsetSide,
		offsetHeight + (barHeight - currBarTargetHeight),
		gamePanel.width / 2 - offsetSide * 2,
		currBarTargetHeight,
		[10]
	);
	ctxPanel.lineWidth = "5";
	ctxPanel.stroke();
	ctxPanel.fillStyle = gradient2;
	ctxPanel.fill();
	ctxPanel.closePath();

	if (targets.length !== 0) {
		ctxPanel.drawImage(
			targets[0].bugImg,
			offsetSide,
			gamePanel.height - offsetHeight + offsetSide,
			gamePanel.width / 2 - offsetSide * 2,
			offsetHeight - offsetSide * 2
		);
	}

	ctxPanel.drawImage(
		clockImg,
		gamePanel.width / 2 + offsetSide,
		gamePanel.height - offsetHeight + offsetSide,
		gamePanel.width / 2 - offsetSide * 2,
		offsetHeight - offsetSide * 2
	);

	ctxPanel.textAlign = "center";
	ctxPanel.font = "bold 20px sans-serif";
	ctxPanel.fillStyle = "#ddad81";
	ctxPanel.fillText(
		`LEVEL ${currLevel}`,
		gamePanel.width / 2,
		offsetHeight / 2 + offsetSide
	);
};

document.getElementById("start-button").onclick = () => {
	currLevel = Number(document.querySelector("#level-choice").value);
	startGame();
};

//responsive mouse position
canvas.addEventListener("mousemove", (event) => {
	mouseX = getMousePos(canvas, event).x;
	mouseY = getMousePos(canvas, event).y;
});

canvas.addEventListener("click", () => {
	if (blocks.length < limitedBlockNum) {
		if (clickAmount % 2 === 0) {
			blocks.unshift(new Block(mouseX, mouseY));
			blocks[0].drawLine();
		}
	}
	onlyLastBlockRemovable();

	clickAmount += 1;
});
