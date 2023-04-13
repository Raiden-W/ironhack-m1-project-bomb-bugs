class Block {
	constructor(initMouseX, initMouseY) {
		this.initMouseX = initMouseX;
		this.initMouseY = initMouseY;
		this.line = new Path2D();
		this.rotateAngle = 0;
		this.readyToCheck = false;
		this.removeThis = false;
		this.node = document.createElement("button");
		this.addNode();
	}

	drawLine() {
		this.line.moveTo(this.initMouseX - 75, this.initMouseY);
		this.line.lineTo(this.initMouseX + 75, this.initMouseY);
		ctx.lineWidth = 5;
		ctx.strokeStyle = "rgb(200, 200, 200, 0.5)";
		ctx.stroke(this.line);
		this.readyToCheck = false;
	}

	updateLine() {
		this.rotateAngle =
			Math.atan((this.initMouseY - mouseY) / (mouseX - this.initMouseX)) || 0;
		if (this.rotateAngle < 0)
			this.rotateAngle = Math.max(this.rotateAngle, -0.6);
		else this.rotateAngle = Math.min(this.rotateAngle, 0.6);

		ctx.translate(this.initMouseX, this.initMouseY);
		ctx.rotate(-this.rotateAngle);
		ctx.translate(-this.initMouseX, -this.initMouseY);
		ctx.lineWidth = 5;
		ctx.lineCap = "round";
		ctx.strokeStyle = "rgb(200, 200, 200, 0.5)";
		ctx.setLineDash([8, 16]);
		ctx.stroke(this.line);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.readyToCheck = false;
	}

	doneLine() {
		ctx.translate(this.initMouseX, this.initMouseY);
		ctx.rotate(-this.rotateAngle);
		//draw wooden log
		ctx.drawImage(blockImg, -75, -10, 150, 20);
		ctx.translate(-this.initMouseX, -this.initMouseY);
		ctx.lineWidth = 20;
		ctx.lineCap = "butt";
		ctx.strokeStyle = "rgb(80, 150, 200, 0)";
		ctx.setLineDash([]);
		ctx.stroke(this.line);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.readyToCheck = true;
	}

	checkCollision(candy) {
		if (this.readyToCheck) {
			const isPointInStroke = ctx.isPointInStroke(
				this.line,
				candy.pos.x,
				candy.pos.y
			);
			return isPointInStroke;
		}
	}

	addNode() {
		document.querySelector("#buttons-list").appendChild(this.node);
		this.node.innerText = "Log X";
		this.node.style.width = "100px";
		this.node.style.height = "50px";
		this.node.style.font = "bold 22px 'Crete Round'";
		this.node.style.backgroundColor = "#5c2911";
		this.node.style.color = "#ddad81";
		this.node.style.border = "solid 1px #ddad81";
		this.node.addEventListener("click", () => {
			this.removeThis = true;
			this.line = new Path2D();
			this.cleanNode();
			removeEleInBlocks();
		});
	}

	cleanNode() {
		this.node.remove();
	}
}

class Candy {
	constructor(candyX) {
		this.force = { x: 0, y: 0 };
		this.acc = { x: 0, y: 0 };
		this.vel = { x: 0, y: 0 };
		this.gravity = 0.001;
		this.radius = 20;
		this.x = candyX;
		this.pos = {
			x: this.x,
			y: -this.radius,
		};
		this.isCollide = false;
		this.hasPlayedSound = false;
		this.angle = 0;
	}

	drawCandy() {
		// ctx.beginPath();
		// ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
		// ctx.fillStyle = "rgb(200, 150, 80)";
		// ctx.fill();
		// ctx.closePath;

		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(-this.angle);
		this.angle += 0.1;
		ctx.drawImage(
			bombImg,
			-this.radius * 2,
			-this.radius * 2,
			this.radius * 4,
			this.radius * 4
		);
		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		const pipeSize = 100;
		ctx.drawImage(
			pipeImg,
			this.x - pipeSize / 2,
			-pipeSize / 2,
			pipeSize,
			pipeSize
		);

		if (this.pos.y > canvas.height * 0.6 && !this.hasPlayedSound) {
			whooshSound.play();
			this.hasPlayedSound = true;
		}
	}

	updatePos() {
		this.acc.y += this.gravity;
		this.acc.y += this.force.y;
		this.acc.x += this.force.x;
		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		if (this.vel.x < 0) this.vel.x = Math.max(this.vel.x, -6);
		else this.vel.x = Math.min(this.vel.x, 6);
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		if (this.pos.y - this.radius > canvas.height) {
			this.reset();
		}

		if (this.isCollide) {
			this.force = { x: 0, y: 0 };
			this.acc.x = 0;
			this.isCollide = false;
		}
	}

	reset() {
		this.pos = {
			x: this.x,
			y: -this.radius,
		};
		this.force = { x: 0, y: 0 };
		this.acc = { x: 0, y: 0 };
		this.vel = { x: 0, y: 0 };
		this.hasPlayedSound = false;
	}

	collide(block) {
		if (this.isCollide) {
			this.force.x = -Math.sin(block.rotateAngle) * this.acc.y * 50;
			this.vel.y = -this.vel.y * Math.cos(block.rotateAngle) * 0.8;

			if (this.force.x < 0) this.force.x = Math.max(this.force.x, -4);
			else this.force.x = Math.min(this.force.x, 4);

			this.vel.y = Math.max(this.vel.y, -8);

			this.pos.x += this.force.x;
			this.pos.y += this.vel.y * 0.5;
		}
	}
}

class Target {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 40;
		this.isHit = false;
		this.isBoomming = false;
		this.t = Math.random() * Math.PI * 2;

		this.bugImg = bugImgs[Math.floor(bugImgs.length * Math.random())];
	}

	drawTargetInAni() {
		// ctx.beginPath();
		// ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		// ctx.lineWidth = 5;
		// ctx.strokeStyle = "rgb(150, 220, 80)";
		// ctx.stroke();
		// ctx.closePath;

		const yOffset = Math.cos(this.t) * 1.5;
		this.t += 0.5;

		ctx.drawImage(
			this.bugImg,
			this.x - this.radius,
			this.y - this.radius + yOffset,
			this.radius * 2,
			this.radius * 2
		);
	}

	checkHit(candy) {
		if (!this.isHit) {
			const a = candy.pos.x - this.x;
			const b = candy.pos.y - this.y;
			const c = Math.sqrt(a * a + b * b);

			if (c < this.radius) {
				this.isHit = true;
				this.isBoomming = true;
			}

			return this.isHit;
		}
	}

	drawBoom() {
		const sizeW = this.radius * 2.5;
		const sizeH = this.radius * 2;
		if (this.isBoomming) {
			ctx.drawImage(
				boomEffectImg,
				this.x - sizeW,
				this.y - sizeH,
				sizeW * 2,
				sizeH * 2
			);
		}
	}
}
