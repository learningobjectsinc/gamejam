angular.module('gamejamApp').constant('libraryFunctions', {
    "Step": {
        "source" : [
            'FUNCTION Step()',
            '  TELL robot : MoveForward(1)',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "Step()",
        "description" : "Tell the robot to move forwards by one square",
        "parameters" : []
    },
    "Move": {
        "source" : [
            'FUNCTION Move(distance)',
            '  FOR i = 1 TO distance',
            '    TELL robot : MoveForward(1)',
            '  NEXT i',
            '  Wait()',
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
    "Reverse": {
        "source" : [
            'FUNCTION Reverse()',
            '  TELL robot : Turn()',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "Reverse()",
        "description" : "Tell the robot to turn around",
        "parameters" : []
    },
    "Down": {
        "source" : [
            'FUNCTION Down()',
            "  Say('Wee')",
            '  TELL transporter : Down()',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "Down()",
        "description" : "Tell the transporter to go down",
        "parameters" : []
    },
    "Up": {
        "source" : [
            'FUNCTION Up()',
            "  Say('Woo')",
            '  TELL transporter : Up()',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "Up()",
        "description" : "Tell the transporter to go up",
        "parameters" : []
    },
    "TurnRight": {
        "source" : [
            'FUNCTION TurnRight()',
            '  TELL robot : Turn(\'right\')',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "TurnRight()",
        "description" : "Tell the robot to face right",
        "parameters" : []
    },
    "TurnLeft": {
        "source" : [
            'FUNCTION TurnLeft()',
            '  TELL robot : Turn(\'left\')',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "TurnLeft()",
        "description" : "Tell the robot to face left",
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
            "  Say('Pew pew pew')",
            '  TELL robot : FireLaser()',
            '  Wait()',
            'END FUNCTION'
        ],
        "example": "Fire()",
        "description" : "Fire your lasers in front of you",
        "parameters" : []
    },
    "Wait": {
        "source" : [
            'FUNCTION Wait()',
            '    WHILE ASK(\'Busy\')',
            '        // Do nothing',
            '    END WHILE',
            'END FUNCTION'
        ],
        "example": "Wait()",
        "description" : "Wait for the robot to be idle",
        "parameters" : []
    }
});
