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
		"name": "Just Dig!",
		"description": "Number of Lemmings: 10",
		"icon": "brain",
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