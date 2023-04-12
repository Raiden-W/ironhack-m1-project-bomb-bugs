canvas = document.querySelector("#game-canvas");

const levelParams = [
	{
		level: 1,
		limitedTime: 30,
		limitedBlockNum: 1,
		candyNum: 1,
		candyX: [canvas.width * 0.6],
		targets: [
			{
				x: canvas.width * 0.35,
				y: canvas.height * 0.8,
			},
		],
	},
	{
		level: 2,
		limitedTime: 45,
		limitedBlockNum: 2,
		candyNum: 2,
		candyX: [canvas.width * 0.5, canvas.width * 0.5],
		targets: [
			{
				x: canvas.width * 0.7,
				y: canvas.height * 0.4,
			},
			{
				x: canvas.width * 0.45,
				y: canvas.height * 0.85,
			},
		],
	},
	{
		level: 3,
		limitedTime: 45,
		limitedBlockNum: 3,
		candyNum: 3,
		candyX: [canvas.width * 0.2, canvas.width * 0.5, canvas.width * 0.9],
		targets: [
			{
				x: canvas.width * 0.35,
				y: canvas.height * 0.8,
			},
			{
				x: canvas.width * 0.55,
				y: canvas.height * 0.4,
			},
			{
				x: canvas.width * 0.75,
				y: canvas.height * 0.55,
			},
		],
	},
];

//for quick test ：level 1 is the final level
// levelParams.splice(1, levelParams.length - 1);
