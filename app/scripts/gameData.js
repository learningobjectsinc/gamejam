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
gameData["levels"] = [
	{
		"id": 123,
		"name": "Just Dig!",
		"description": "Number of Lemmings: 10"
	}
];