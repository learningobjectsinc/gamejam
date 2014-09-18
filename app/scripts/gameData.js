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
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>This is Ms. Roboto. She's fresh off the assembly line and needs training from scratch on the basics of being a robot.</p>"
			},
			{
				"title": "Goal",
				"body": "Let's start with getting Ms. Roboto to move across to a teleporter."
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see your algorithm execute</dt><dt>See the code that makes Ms. Roboto come alive!</dt></ol>"
			}
		]
	}, {
        "levelId": 1,
        "pages": [
			{
				"title": "Heading down",
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>Teach Ms. Roboto to use a transport pad</p>"
			},
			{
				"title": "Goal",
				"body": "<p>You can teach Ms. Roboto to get to her goal.</p>"
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see your algorithm execute</dt><dt>See the code that makes Ms. Roboto come alive!</dt></ol>"
			}
		]
	}, {
        "levelId": 2,
        "pages": [
			{
				"title": "Short and sweet",
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>Teach Ms. Roboto to iterate</p>"
			},
			{
				"title": "Goal",
				"body": "<p>Reach your goal using only 5 instructions.</p>"
			},
			{
				"title": "Instructions",
				"body": "<dl><dt>Drag and drop the functions to complete the action</dt><dt>Hit 'Run' to see your algorithm execute</dt><dt>See the code that makes Ms. Roboto come alive!</dt></ol>"
			}
		]
	}, {
        "levelId": 3,
        "pages": [
			{
				"title": "Level 3: Zap the contrived obstacle",
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>Teach Ms. Roboto to use her laser</p>"
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
                "objects": [
                    {
                        "type": "Girder",
                        "x": 0,
                        "y": 300,
                        "width": 6
                    }, {
                        "type": "Roboto",
                        "x": -50,
                        "targetX": 100,
                        "y": 300
                    }, {
                        "type": "Transport",
                        "x": 500,
                        "y": 300
                    }
                ],
		"map": {
			"width": 6,
			"height": 5,
			"music": "sound/skySanctuary.wav"
		},
		"availableBlocks": {
                },
		"availableFunctions": {
			"Step": {}
		}
	},
	{
		"id": 1,
		"name": "Level 1: Heading down",
		"description": "Learn to use transport pads",
		"icon": "rocket",
		"completed": "0",
		"defaultCode": "Move(6)\nDown()\nReverse()\nMove(5)",
                "objects": [
                    {
                        "type": "Elevator",
                        "x": 700,
                        "y0": 300,
                        "y1": 700
                    }, {
                        "type": "Girder",
                        "x": 0,
                        "y": 300,
                        "width": 6
                    }, {
                        "type": "Girder",
                        "x": 800,
                        "y": 300,
                        "width": 2
                    }, {
                        "type": "Girder",
                        "x": 0,
                        "y": 700,
                        "width": 6
                    }, {
                        "type": "Girder",
                        "x": 800,
                        "y": 700,
                        "width": 2
                    }, {
                        "type": "Roboto",
                        "x": -50,
                        "targetX": 100,
                        "y": 300
                    }, {
                        "type": "Transport",
                        "x": 200,
                        "y": 700
                    }
                ],
		"map": {
			"width": 10,
			"height": 9
		},
		"availableBlocks": {},
		"availableFunctions": {
			"Move":{},
			"Reverse": {},
			"Down":{}
		}
	},
	{
		"id": 2,
		"name": "Level 2: Short and sweet",
		"description": "Learn to iterate",
		"icon": "rocket",
		"completed": "0",
		"defaultCode": "Move(2)\nFOR i = 1 TO 4\nDown()\nMove(4)\nNEXT i",
                "objects": [
                    {
                        "type": "Girder",
                        "x": 0,
                        "y": 300,
                        "width": 2
                    }, {
                        "type": "Elevator",
                        "x": 300,
                        "y0": 300,
                        "y1": 500
                    }, {
                        "type": "Girder",
                        "x": 400,
                        "y": 500,
                        "width": 2
                    }, {
                        "type": "Elevator",
                        "x": 700,
                        "y0": 500,
                        "y1": 700
                    }, {
                        "type": "Girder",
                        "x": 800,
                        "y": 700,
                        "width": 2
                    }, {
                        "type": "Elevator",
                        "x": 1100,
                        "y0": 700,
                        "y1": 900
                    }, {
                        "type": "Girder",
                        "x": 1200,
                        "y": 900,
                        "width": 2
                    }, {
                        "type": "Elevator",
                        "x": 1500,
                        "y0": 900,
                        "y1": 1100
                    }, {
                        "type": "Girder",
                        "x": 1600,
                        "y": 1100,
                        "width": 4
                    }, {
                        "type": "Roboto",
                        "x": -50,
                        "targetX": 100,
                        "y": 300
                    }, {
                        "type": "Transport",
                        "x": 1900,
                        "y": 1100
                    }
                ],
		"map": {
			"width": 20,
			"height": 13
		},
		"availableBlocks": {
                    "ForStatement": {
                        "src": "FOR i = 1 TO 10"
                    },
                    "NextStatement": {
                        "src": "NEXT i"
                    }
                },
		"availableFunctions": {
			"Move":{},
			"Reverse": {},
			"Down":{}
		}
	},
	{
		"id": 3,
		"name": "Level 3: Zap the contrived obstacle",
		"description": "Space! Crates!",
		"icon": "power",
		"completed": "0.8",
		"defaultCode": "Fire()\nMove(7)\nUp()\nReverse()\nFire()\nMove(6)",
                "objects": [
                    {
                        "type": "Elevator",
                        "x": 800,
                        "y0": 700,
                        "y1": 300
                    }, {
                        "type": "Girder",
                        "x": 0,
                        "y": 300,
                        "width": 7
                    }, {
                        "type": "Girder",
                        "x": 900,
                        "y": 300,
                        "width": 1
                    }, {
                        "type": "Girder",
                        "x": 0,
                        "y": 700,
                        "width": 7
                    }, {
                        "type": "Girder",
                        "x": 900,
                        "y": 700,
                        "width": 1
                    }, {
                        "type": "Crate",
                        "x": 500,
                        "y": 700,
                        "width": 1
                    }, {
                        "type": "Crate",
                        "x": 350,
                        "y": 300,
                        "width": 1
                    }, {
                        "type": "Roboto",
                        "x": -50,
                        "targetX": 100,
                        "y": 700
                    }, {
                        "type": "Transport",
                        "x": 200,
                        "y": 300
                    }
                ],
		"map": {
			"width": 10,
			"height": 9
		},
		"availableBlocks": {},
		"availableFunctions": {
			"Move":{},
			"Reverse": {},
			"Down":{},
			"Fire":{}
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
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>You taught Ms. Roboto how to move.</p>"
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
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>You taught Ms. Roboto how to compose different statements to achieve  a goal.</p>"
			},
			{
				"title": "Level 1: Heading Down",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
			}
		]
	},
	{
        "levelId": 2,
        "pages": [
			{
				"title": "Nice work!",
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>You taught Ms. Roboto how to use iteration to easily solve repetitive problems.</p>"
			},
			{
				"title": "Level 2: Short and sweet",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
			}
		]
	},
	{
        "levelId": 3,
        "pages": [
			{
				"title": "Nice work!",
				"body": "<div class='robojam'><img src='/images/tobor.svg'></div><p>You taught Ms. Roboto how to shoot lasers from her eye.</p>"
			},
			{
				"title": "Level 3: Zap",
				"body": "<p>Here's a little more info about what you did during this level.</p>"
			}
		]
	}
]
;
