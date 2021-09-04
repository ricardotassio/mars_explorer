const fs = require('fs')
const { exit } = require('process')
const explore = require('./src/explorer')
const MESSAGE_EMPTY_FILE = '\033[31m Arquivo vazio! \x1b[0m'


async function writeOutputFile(output) {
    fs.writeFileSync('./data/data-output.txt', output)
}

async function readInputFile() {
    const data = fs.readFileSync('./data/data-input.txt');
    if (data.length === 0 || /^\s*$/gi.test(data)) {
        console.log(MESSAGE_EMPTY_FILE)
        exit()
    }
    return data.toString()
}

(async () => {
    const inputInstructions =  await readInputFile()
    const output = await explore(inputInstructions)
    writeOutputFile(JSON.stringify(output))
})()