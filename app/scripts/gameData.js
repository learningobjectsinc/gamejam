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
				"title": "Let's Move!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>Solve the epidemic of robot obesity by getting Tobor to move.</p>"
			},
			{
				"title": "Level 0: Let's Move!",
				"body": "Let's start with getting Tobor to move through the maze to the finish."
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see the function execute</dt><dt>View the code that makes it all come alive!</dt></ol>"
			}
		]
	},
	{
        "levelId": 1,
        "pages": [
			{
				"title": "Welcome to I Tobor!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>Tobor's a super cool robot who sometimes forgets how to do things. Help him out with his controls by learning the basics of programming.</p>"
			},
			{
				"title": "Level 1: Functions",
				"body": "<p>Functions are self <em>contained modules</em> of code that accomplish a specific task. Functions usually take in data, process it, and return a result. Once a function is written, it can be used over and over and over again. Functions can be called from the inside of other functions.</p>"
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
					"type": "Robot",
					"x": 1,
					"y": 4,
					"direction": "right"
				},
				{
					"type": "Goal",
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
		}
	},
	{
		"id": 1,
		"name": "Level 1: Functions",
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
			]
		}
	},
	{
		"id": 2,
		"name": "Level 2: Variables",
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
		}
	},
	{
		"id": 3,
		"name": "Level 3: Conditionals",
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
		}
	},
	{
		"id": 4,
		"name": "Level 4: Loops",
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
		"id": 5,
		"name": "Level 5: All the Things!",
		"description": "Number of Lemmings: 10",
		"icon": "rocket",
		"completed": "0",
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
	}
];
gameData["wrapUp"] = [
	{
        "levelId": 0,
        "pages": [
			{
				"title": "Nice work!",
				"body": "<div class='robojam'><img src='/images/robot/robot-down.svg'></div><p>You learned how to move your robot.</p>"
			},
			{
				"title": "Level 0: Let's Move!",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
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
				"title": "Level 1: Functions",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
			}
		]
	}
]
;