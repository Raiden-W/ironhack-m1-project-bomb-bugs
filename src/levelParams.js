canvas = document.querySelector("#game-canvas");
//original canvas width 1200 height 800

const levelParams = [
	{
		level: 1,
		limitedTime: 5,
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
	{
		level: 4,
		limitedTime: 50,
		limitedBlockNum: 3,
		candyNum: 4,
		candyX: [
			canvas.width * 0.05,
			canvas.width * 0.05,
			canvas.width * 0.45,
			canvas.width * 0.8,
		],
		targets: [
			{
				x: 210,
				y: 265,
			},
			{
				x: 365,
				y: 661,
			},
			{
				x: 724,
				y: 511,
			},
			{
				x: 665,
				y: 638,
			},
		],
	},
	{
		level: 5,
		limitedTime: 60,
		limitedBlockNum: 4,
		candyNum: 5,
		candyX: [
			canvas.width * 0.1,
			canvas.width * 0.3,
			canvas.width * 0.65,
			canvas.width * 0.9,
			canvas.width * 0.9,
		],
		targets: [
			{
				x: 932,
				y: 274,
			},
			{
				x: 423,
				y: 567,
			},
			{
				x: 499,
				y: 701,
			},
			{
				x: 491,
				y: 180,
			},
			{
				x: 246,
				y: 326,
			},
		],
	},
];

//for quick test ：level 1 is the final level
// levelParams.splice(1, levelParams.length - 1);
