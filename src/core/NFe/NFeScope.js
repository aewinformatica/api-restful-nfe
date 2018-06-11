const validate = require('../../helpers/validacao');

module.exports = {
    processar,
    totalPorArquivo
};

async function processar(params) {
    let data = new validate.ValidationContract(params);

    try {
        data.start('file')
            .isString()
            .isRequired()
            .isNotNull()

            .start('periodo')
            .isString()

            .start('tipoDocumento')
            .isString()

            .start('chave')
            .isString()

            .start('documentoDestinatario')
            .isString()

            .end()

    }
    catch (error) {
        error.httpCode = 400;
        throw error
    }
}

async function totalPorArquivo(params) {
    let data = new validate.ValidationContract(params);

    try {
        data.start('file')
            .isString()
            .isRequired()
            .isNotNull()

            .start('periodo')
            .isString()

            .start('tipoDocumento')
            .isString()

            .end()

    }
    catch (error) {
        error.httpCode = 400;
        throw error
    }
}