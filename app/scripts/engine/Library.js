var libraryFunctions = {
    "MoveForwardOne": {
        "source" : [
            'FUNCTION MoveForwardOne()',
            '  TELL robot : MoveForward(1)',
            'END FUNCTION'
        ]
        "description" : "Tell the robot to move forwards by one square",
        "parameters" : []
    },
    "MoveForward": {
        "source" : [
            'FUNCTION MoveForward(number)',
            '  TELL robot : MoveForward(number)',
            'END FUNCTION'
        ]
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
        ]
        "description" : "Tell the robot to turn right",
        "parameters" : []
    },
    "TurnLeft": {
        "source" : [
            'FUNCTION TurnLeft()',
            '  TELL robot : Turn(\'left\')',
            'END FUNCTION'
        ]
        "description" : "Tell the robot to turn left",
        "parameters" : [
        {
            "type": "number",
            "description" : "Distance to move"
        }]
    }
}