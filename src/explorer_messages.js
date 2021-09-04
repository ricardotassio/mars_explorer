const MESSAGE_TOP_RIGHT_STRING = '\033[31m Por favor, insira uma entrada válida para o ponto superior direito! Apenas números são permitidos \x1b[0m'
const MESSAGE_INCOMPLETE_DATA_INPUT = '\033[31m Por favor, verifique o arquivo de entrada se não está faltando nenhuma linha. \x1b[0m'
const MESSAGE_WRONG_COORDINATE = '\033[31m Coordenada inválida, o formato correto deverá conter a seguinte estrutura: [0-9][0-9][N|W|S|E]. Exemplo: 5 5 N \x1b[0m'
const MESSAGE_WRONG_COMMAND = '\033[31m Comando inválida, o formato correto deverá conter a seguinte estrutura: [L|R|M]{1,}. Exemplo: LMRMRLM \x1b[0m'

module.exports={ 
    MESSAGE_TOP_RIGHT_STRING,
    MESSAGE_INCOMPLETE_DATA_INPUT,
    MESSAGE_WRONG_COORDINATE,
    MESSAGE_WRONG_COMMAND
}