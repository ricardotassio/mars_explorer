const {
    MESSAGE_TOP_RIGHT_STRING,
    MESSAGE_INCOMPLETE_DATA_INPUT,
    MESSAGE_WRONG_COORDINATE,
    MESSAGE_WRONG_COMMAND
} = require('./explorer_messages')
const {
    COORD_REGEX,
    COMMANDER_REGEX,
    MATRIX_POSITION
} = require('./exploration_config')
let contentMatrix = ''
let probes = {rightTop:'', registered:[]}

async function spins(amount, initialPoint, direction) {
    let end = initialPoint
    direction = direction.toUpperCase()

    for (i=0 ; i < amount; i++) {
        if (i === 0 ) {
            end = MATRIX_POSITION[initialPoint + direction]
            continue
        }
        end = MATRIX_POSITION[end + direction]
    }
    return end
}

async function probePrepare(dataInput) {
    let orientation = ''
    dataInput.forEach((value, index) => {
        if (index === 0) {
            rightTop = value
        }
        if (index % 2 === 1) {
            probeName =  'Probe ' + index
            start =  value
        }
        if (index % 2 === 0 && index !== 0) {
            probes.registered[index]= {
                rightTop,
                probeName,
                start,
                commands: value,
                orientation
            }
        }
    })
}

async function calculateOrientation(probe) {
    let startPosition = probe.start.match(/[N|S|W|E]+/gi)[0].toUpperCase()
    let orientation = startPosition
    let amountLeftTurns = probe.commands.match(/L/gi)?.length ?? 0
    let amountRightTurns = probe.commands.match(/R/gi)?.length ?? 0
    orientation = await spins(amountLeftTurns, startPosition, 'L')
    orientation = await spins(amountRightTurns, orientation, 'R')
    return orientation
}

async function explore(contentFile) {
    this.contentMatrix = await validateContentStructure(contentFile)
    await validateTopRightPoint(this.contentMatrix[0])
    let probesNumber = await getProbesNumber()
    await validateCoordinatesAndCommands(this.contentMatrix)
    await probePrepare(this.contentMatrix)
    const result = await Promise.all(probes.registered
        .filter(item => item)
        .map(async (probe, index) => {
            probe.orientation = await calculateOrientation(probe)
            return probe
        }))
    console.log(result)
    return result
}

async function validateContentStructure(content) {
    let contentLines = await convertInputDataInArray(content)

    contentLines = await contentLines.filter( item => item !== '')
    if (contentLines.length % 2 === 0) {
        console.log(MESSAGE_INCOMPLETE_DATA_INPUT)
    }
    return contentLines
}

async function convertInputDataInArray(data) {
    return data.trim().split(/\r?\n/)    
}

async function getProbesNumber() {
    let inputProbesNumber = (this.contentMatrix.length -1) 
    if (inputProbesNumber === 2) {
        return 1
    }
    return inputProbesNumber/2
}

async function validateCoordinatesAndCommands(dataInput) {
    dataInput.forEach((value, index) => {
        if (index !== 0) {
            value = value.replace(/\s/g,'')
            if (index % 2 === 1) {
                validateCoordinate(value)
            }
            if (index % 2 === 0) {
                validateCommand(value)
            } 
        }
        
    })
    return dataInput
}

async function validateCoordinate(coordinate) {
    coordinate = coordinate.replace(/\s*/g, '')
    if (!COORD_REGEX.test(coordinate)) {
        console.log(MESSAGE_WRONG_COORDINATE)
        exit()
    }
    return COORD_REGEX.test(coordinate);
}

async function validateCommand(command) {
    if (!COMMANDER_REGEX.test(command)) {
        console.log(MESSAGE_WRONG_COMMAND)
        exit()
    }
    return COMMANDER_REGEX.test(command);
}

async function validateTopRightPoint(point) {
    point = point.split(' ')
    if(!parseInt(point[0]) || !parseInt(point[1])) {
        console.log(MESSAGE_TOP_RIGHT_STRING)
        exit();
    }
    return
}

module.exports = explore