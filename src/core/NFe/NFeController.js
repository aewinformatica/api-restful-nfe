const scope = require('./NFeScope');
const service = require('./NFeService');

module.exports = {
    processar
};

async function processar(req, res) {
    const params = {
        file: req.body.file,
        periodo: req.body.periodo,
        tipoDocumento: req.body.tipoDocumento,
        chave: req.body.chave,
        documentoDestinatario: req.body.documentoDestinatario,
        status: req.body.status
    };

    try {


    }
    catch (error) {

    }
}