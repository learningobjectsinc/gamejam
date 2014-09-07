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
gameData["instructions"] = [{
        "levelId": 1,
        "pages": [
			{
				"title": "Level 1: Functions",
				"body": "Functions are self contained modules of code that accomplish a specific task. Functions usually take in data, process it, and return a result. Once a function is written, it can be used over and over and over again. Functions can be called from the inside of other functions."
			},
			{
				"title": "Two",
				"body": "Test 2"
			},
			{
				"title": "Three",
				"body": "Test 3"
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
		"id": 1,
		"name": "Level 1: Functions",
		"description": "Number of Lemmings: 10",
		"icon": "power",
		"completed": "0.8",
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
					"type": "Flag",
					"x": 2,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 4
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 4,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 1,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 1,
					"y": 6
				},
				{
					"type": "Rock",
					"x": 1,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 4,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 5,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 7,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 7
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 5,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 4,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 5,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 1,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 1,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 6
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 5
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 4
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 3
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 8,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 7,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 6,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 5,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 4,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 1,
					"y": 1
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
			"width": 15,
			"height": 10,
			"objects": [
				{
					"type": "Rock",
					"x": 1,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 3
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
					"type": "Rock",
					"x": 1,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 3
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
					"type": "Rock",
					"x": 1,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 2
				},
				{
					"type": "Rock",
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
					"type": "Rock",
					"x": 1,
					"y": 1
				},
				{
					"type": "Rock",
					"x": 2,
					"y": 2
				},
				{
					"type": "Rock",
					"x": 3,
					"y": 3
				}
			]
		}
	}
];