const FS = require('fs')
const { exit } = require('process')

const MESSAGE_EMPTY_FILE = '\033[31m Arquivo vazio!'
const MESSAGE_TOP_RIGHT_STRING = '\033[31m Por favor, insira uma entrada válida para o ponto superior direito! Apenas números são permitidos'
const MESSAGE_INCOMPLETE_DATA_INPUT = '\033[31m Por favor, verifique o arquivo de entrada se não está faltando nenhuma linha.'
const MESSAGE_WRONG_COORDINATE = '\033[31m Coordenada inválida, o formato correto deverá conter a seguinte estrutura: [0-9][0-9][N|W|S|E]. Exemplo: 5 5 N'
const MESSAGE_WRONG_COMMAND = '\033[31m Comando inválida, o formato correto deverá conter a seguinte estrutura: [L|R|M]{1,}. Exemplo: LMRMRLM'
let contentMatrix = ''
let probes = {}

async function init() {
    let contentFile = await readInputFile();
    this.contentMatrix = await validateContentStructure(contentFile)
    await validateTopRightPoint(this.contentMatrix[0])
    let probesNumber = await getProbesNumber()
    validateCoordinatesAndCommands(this.contentMatrix)
    console.log(probesNumber, this.contentMatrix)
}

async function readInputFile() {
    return new Promise(function (resolve, reject) {
        FS.readFile('data/data-input.txt', (err, data) => {
            if (data.length === 0 || /^\s*$/gi.test(data)) {
                console.log(MESSAGE_EMPTY_FILE)
                exit()
            }

            if (err) {
                reject(err)
                exit()
            }
            resolve(data.toString())
                
        });
    })
}

async function validateContentStructure(content) {
    let contentLines = await convertInputDataInArray(content)
    contentLines = await removeWhiteSpace(contentLines)

    if (contentLines.length % 2 === 0) {
        console.log(MESSAGE_INCOMPLETE_DATA_INPUT)
    }
    return contentLines
}

async function removeWhiteSpace(data) {
    if (data.indexOf('') !== -1) {
        data.splice(data.indexOf(''), 1)
    }
    return data
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

async function validateCoordinate(coordinate) {
    const COORD_REGEX = /^\d\d[N|E|S|W]+$/gi
    coordinate = coordinate.replace(/\s*/g, '')
    if (!COORD_REGEX.test(coordinate)) {
        console.log(MESSAGE_WRONG_COORDINATE)
        exit()
    }
    return COORD_REGEX.test(coordinate);
}

async function validateCommand(command) {
    const COMMANDER_REGEX = /^[L|M|R]{1,}$/gi
    command = command.replace(/\s*/g, '')
    console.log(command)
    if (!COMMANDER_REGEX.test(command)) {
        console.log(MESSAGE_WRONG_COMMAND)
        exit()
    }
    return COMMANDER_REGEX.test(command);
}

async function validateCoordinatesAndCommands(dataInput) {
    dataInput.forEach(function(value, index) {
        if (index !== 0) {
            console.log(value[index])
            validateCoordinate(value[index])
            validateCommand(value[index+1])    
        }
    })
    
}

async function validateTopRightPoint(point) {
    point = point.split(' ')
    if(!parseInt(point[0]) || !parseInt(point[1])) {
        console.log(MESSAGE_TOP_RIGHT_STRING)
        exit;
    }
    return
}

init();
