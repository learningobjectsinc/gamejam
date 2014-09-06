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
        "levelId": 123,
        "pages": [
			{
				"title": "One",
				"body": "Test 1"
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
		"id": 123,
		"name": "Level 1: Functions",
		"description": "Number of Lemmings: 10",
		"icon": "power",
		"completed": "0.8",
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
					"type": "Owl",
					"x": 3,
					"y": 3
				}
			]
		}
	},
	{
		"id": 123,
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
					"type": "Owl",
					"x": 3,
					"y": 3
				}
			]
		}
	},
	{
		"id": 123,
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
					"type": "Owl",
					"x": 3,
					"y": 3
				}
			]
		}
	},
	{
		"id": 123,
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
					"type": "Owl",
					"x": 3,
					"y": 3
				}
			]
		}
	},
	{
		"id": 123,
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
					"type": "Owl",
					"x": 3,
					"y": 3
				}
			]
		}
	}
];