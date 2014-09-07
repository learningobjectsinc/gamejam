angular.module('gamejamApp').constant('libraryFunctions', {
    "Step": {
        "source" : [
            'FUNCTION Step()',
            '  TELL robot : MoveForward(1)',
            'END FUNCTION'
        ],
        "example": "Step()",
        "description" : "Tell the robot to move forwards by one square",
        "parameters" : []
    },
    "Move": {
        "source" : [
            'FUNCTION Move(number)',
            '  TELL robot : MoveForward(number)',
            'END FUNCTION'
        ],
        "example": "Move(5)",
        "description" : "Tell the robot to move forwards by a number of squares",
        "parameters" : [
            {
                "type": "number",
                "description" : "Distance to move"
            }
        ]
    },
    "TurnRight": {
        "source" : [
            'FUNCTION TurnRight()',
            '  TELL robot : Turn(\'right\')',
            'END FUNCTION'
        ],
        "example": "TurnRight()",
        "description" : "Tell the robot to turn right",
        "parameters" : []
    },
    "TurnLeft": {
        "source" : [
            'FUNCTION TurnLeft()',
            '  TELL robot : Turn(\'left\')',
            'END FUNCTION'
        ],
        "example": "TurnLeft()",
        "description" : "Tell the robot to turn left",
        "parameters" : []
    },
    "Say": {
        "source" : [
            'FUNCTION Say(text)',
            '  TELL robot : Talk(text)',
            'END FUNCTION'
        ],
        "example": "Say('Hello World!')",
        "description" : "Make your robot speak",
        "parameters" : [
            {
                "type": "string",
                "description" : "What you want it to say"
            }
        ]
    },
    "Fire": {
        "source" : [
            'FUNCTION Fire()',
            '  TELL robot : FireLaser(\'left\')',
            '  FOR j = 1 TO 50',
            '  NEXT j',
            'END FUNCTION'
        ],
        "example": "Fire()",
        "description" : "Fire your lasers in front of you",
        "parameters" : []
    }
});
