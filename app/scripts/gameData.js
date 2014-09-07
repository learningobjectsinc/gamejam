var gameData = gameData || {};
gameData["blocks"] = [
	{
		"shortName": "moveForward",
		"name": "Move Forward",
		"params": [
			{
				"name": "Amount",
				"shortName": "amount",
				"type": "number",
				"units": "steps"
			}
		]
	}, {
		"shortName": "turn",
		"name": "Turn",
		"params": [
			{
				"name": "Angle",
				"shortName": "angle",
				"type": "number",
				"units": "degrees"
			}
		]
	}, {
		"shortName": "ifElse",
		"name": "If/Else",
		"branches": ["if", "else"]
	}
];
gameData["instructions"] = [
	{
        "levelId": 0,
        "pages": [
			{
				"title": "Level 0: Let's Move!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>This is Ms. Roboto. She's fresh off the assembly line and needs training from scratch on the basics of being a robot.</p>"
			},
			{
				"title": "Goal",
				"body": "Let's start with getting Ms. Roboto to move through a maze to the goal."
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see your algorithm execute</dt><dt>See the code that makes Ms. Roboto come alive!</dt></ol>"
			}
		]
	},
	{
        "levelId": 1,
        "pages": [
			{
				"title": "Level 1: You Spin Me Round",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>Teach Ms. Roboto to turn</p>"
			},
			{
				"title": "Goal",
				"body": "<p>You can teach Ms. Roboto to turn left and right. Use turning to get Ms. Roboto to her goal.</p>"
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see your algorithm execute</dt><dt>See the code that makes Ms. Roboto come alive!</dt></ol>"
			}
		]
	},
	{
        "levelId": 2,
        "pages": [
			{
				"title": "Level 2: Zap the contrived obstacle",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>Teach Ms. Roboto to use her laser</p>"
			},
			{
				"title": "Goal",
				"body": "<p>Ms. Roboto will encounter obstacles in her environment. Teach her how to overcome obstacles and continue on to her goal.</p>"
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see the function execute</dt><dt>View the code that makes it all come alive!</dt></ol>"
			}
		]
	}
]
;
gameData["learningOutcomes"] = [
	{
		
	}
];
gameData["levels"] = [
	{
		"id": 0,
		"name": "Level 0: Let's Move!",
		"description": "Solve the epidemic of robot obesity by getting Tobor to move",
		"icon": "rocket",
		"completed": "0",
		"defaultCode": "",
		"map": {
			"width": 8,
			"height": 7,
			"music": "sound/skySanctuary.wav",
			"objects": [
				{
					"type": "Laser",
					"x": 2,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 4
				},
				{
					"type": "Robot",
					"x": 2,
					"y": 4,
					"direction": "right"
				},
				{
					"type": "Goal",
					"x": 7,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 7
				}
			]
		},
		"availableBlocks": {},
		"availableFunctions": {
			"Step": {}
		}
	},
	{
		"id": 1,
		"name": "Level 1: You Spin Me Round",
		"description": "Learn to turn",
		"icon": "rocket",
		"completed": "0",
		"defaultCode": "TELL robot : MoveForward(1)\nTELL robot : Turn('right')\nTELL robot : Turn('right')\nTELL robot : MoveForward(1)",
		"map": {
			"width": 8,
			"height": 7,
			"objects": [
				{
					"type": "Wall",
					"x": 1,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 2
				},
				{
					"type": "Goal",
					"x": 7,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 6
				},
				{
					"type": "Robot",
					"x": 2,
					"y": 6,
					"direction": "up"
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 7
				}
			]
		},
		"availableBlocks": {},
		"availableFunctions": {
			"Step":{},
			"TurnLeft": {},
			"TurnRight": {}
		}
	},
	{
		"id": 2,
		"name": "Level 2: Zap the contrived obstacle",
		"description": "Number of Lemmings: 10",
		"icon": "power",
		"completed": "0.8",
		"map": {
			"width": 8,
			"height": 7,
			"objects": [
				{
					"type": "Goal",
					"x": 2,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 7,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 1
				},
				{
					"type": "Robot",
					"x": 2,
					"y": 6,
					"direction": "right"
				}
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 4
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 4,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 3,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 2,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 1,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 1,
				// 	"y": 6
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 1,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 2,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 3,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 4,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 5,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 7,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 7
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 5,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 4,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 3,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 2,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 5,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 1,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 1,
				// 	"y": 2
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 6
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 5
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 4
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 3
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 2
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 8,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 7,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 6,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 5,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 4,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 3,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 2,
				// 	"y": 1
				// },
				// {
				// 	"type": "Rock",
				// 	"x": 1,
				// 	"y": 1
				// },
				// {
				// 	"type": "Robot",
				// 	"x": 2,
				// 	"y": 6
				// }
			]
		},
		"availableBlocks": {},
		"availableFunctions": {
			"Step":{},
			"TurnLeft": {},
			"TurnRight": {},
			"Fire": {}
		}
	},
	{
		"id": 3,
		"name": "Level 3: Set it to get it",
		"description": "Number of Lemmings: 10",
		"icon": "settings",
		"completed": "0.6",
		"map": {
			"width": 8,
			"height": 7,
			"objects": [
				{
					"type": "Goal",
					"x": 2,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 7
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 6
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 5
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 4
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 3
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 8,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 7,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 6,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 5,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 4,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 1,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 4,
					"y": 6
				},
				{
					"type": "Robot",
					"x": 2,
					"y": 6
				}
			]
		},
		"availableBlocks": {
			"LetStatement": {}
		},
		"availableFunctions": {
			"Step":{},
			"TurnLeft": {},
			"TurnRight": {},
			"Move": {}
		}
	},
	{
		"id": 4,
		"name": "Level 4: What If",
		"description": "Number of Lemmings: 10",
		"icon": "podium",
		"completed": "0.4",
		"map": {
			"width": 15,
			"height": 10,
			"objects": [
				{
					"type": "Robot",
					"x": 2,
					"y": 6
				},
				{
					"type": "Troll",
					"x": 3,
					"y": 6
				}
			]
		},
		"availableBlocks": {
			"if": {},
			"then": {},
			"let": {}
		}
	},
	{
		"id": 5,
		"name": "Level 5: What If",
		"description": "Number of Lemmings: 10",
		"icon": "spinner",
		"completed": "0.2",
		"map": {
			"width": 15,
			"height": 10,
			"objects": [
				{
					"type": "Wall",
					"x": 1,
					"y": 1
				},
				{
					"type": "Wall",
					"x": 2,
					"y": 2
				},
				{
					"type": "Wall",
					"x": 3,
					"y": 3
				}
			]
		}
	},
	{
		"id": 6,
		"name": "Level 6: Begin again, again",
		"description": "Number of Lemmings: 10",
		"icon": "rocket",
		"completed": "0",
		"map": {
			"width": 5,
			"height": 5,
			"objects": [
				{
					"type": "Robot",
					"config": {
						"x": 3,
						"y": 3,
						"direction": "right"
					}
				},
				{
					"type": "Wall",
					"config": {
						"x": 0,
						"y": 0
					}
				},
				{
					"type": "Wall",
					"config": {
						"x": 0,
						"y": 1
					}
				},
				{
					"type": "Wall",
					"config": {
						"x": 1,
						"y": 0
					}
				},
				{
					"type": "Wall",
					"config": {
						"x": 4,
						"y": 3
					}
				},
				{
					"type": "Rock",
					"config": {
						"x": 4,
						"y": 4
					}
				},
				{
					"type": "Goal",
					"config": {
						"x": 3,
						"y": 4
					}
				}
			]
		}
	}
];
gameData["wrapUp"] = [
	{
        "levelId": 0,
        "pages": [
			{
				"title": "Nice work!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>You taught Ms. Roboto how to move.</p>"
			},
			{
				"title": "Level 0: Let's Move!",
				"body": "<p>Here's a little more info about what you learned during this level.</p><dl><dt>Commands allow you to change things in Ms. Roboto's environemnt.</dt><dt>An algorithm is a step-by-step procedure to solve a problem.</dt></dl>"
			}
		]
	},
	{
        "levelId": 1,
        "pages": [
			{
				"title": "Nice work!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>You learned all about some things.</p>"
			},
			{
				"title": "Level 1: You Spin Me Round",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
			}
		]
	},
	{
        "levelId": 2,
        "pages": [
			{
				"title": "Nice work!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>You learned all about some things.</p>"
			},
			{
				"title": "Level 2: Functions",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
			}
		]
	}
]
;