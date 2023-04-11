//test

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
let currLevel = git1;

let animateId;
let finalWin = false;
let gameOver = false;

let clickAmount = 0;
let mouseX = 0;
let mouseY = 0;

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const gamePanel = document.querySelector("#game-info");
const ctxPanel = canvas.getContext("2d");
canvas.style.display = "none";
gamePanel.style.display = "none";

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

	if (hitAmount === hitGoal) {
		hitAmount = 0;
		setTimeout(() => {
			winCurrLevel = true;
		}, 2000);
		console.log("You Win This Level");
	}

	if (winCurrLevel) {
		if (currLevel < levelParams.length) {
			currLevel += 1;
			resetLevel(levelParams[currLevel - 1]);
			winCurrLevel = false;
		} else {
			finalWin = true;
		}
	}

	if (finalWin) {
		console.log("FINAL WIN!!!");
		cancelAnimationFrame(animateId);
	} else if (gameOver) {
		console.log("TIME OVER!!!");
		cancelAnimationFrame(animateId);
	} else animateId = requestAnimationFrame(animate);
};

const resetLevel = (currlevelParams) => {
	hitGoal = currlevelParams.candyNum;
	hitAmount = 0;

	limitedBlockNum = currlevelParams.limitedBlockNum;
	candyNum = currlevelParams.candyNum;

	targetsRemoved = [];
	candysRemoved = [];
	candys = [];
	blocks.forEach((block) => {
		block.cleanNode();
	});
	blocks = [];

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

		// console.log(hitAmount, targetsRemoved);
		candysRemoved.shift();
		targetsRemoved.shift();
		hitAmount -= 1;
	}
};

const onlyLastBlockRemovable = () => {
	blocks.forEach((block, index) => {
		if (index === 0) block.node.disabled = false;
		else block.node.disabled = true;
	});
};

document.getElementById("start-button").onclick = () => {
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
