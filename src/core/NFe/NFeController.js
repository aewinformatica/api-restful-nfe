const scope = require('./NFeScope');
const service = require('./NFeService');

module.exports = {
    processar,
    totalPorArquivo,
    processarTran
};

async function processar(req, res) {
    const params = {
        file: req.body.file,
        fileTran: req.body.fileTran,
        periodo: req.body.periodo,
        tipoDocumento: req.body.tipoDocumento,
        chave: req.body.chave,
        documentoDestinatario: req.body.documentoDestinatario,
        status: req.body.status
    };

    try {
        await scope.processar(params);

        params.file = await service.build(params.file);

        let content = await service.processar(params);

        if (params.fileTran) await service.buildTran(params.fileTran, content);

        return res
            .status(200)
            .json({
                content
            })

    }
    catch (error) {
        return res
            .status(error.httpCode)
            .json({
                httpCode: error.httpCode || 500,
                error: error.message || error.list
            })
    }
}

async function totalPorArquivo(req, res) {
    const params = {
        file: req.body.file,
        periodo: req.body.periodo,
        tipoDocumento: req.body.tipoDocumento
    };

    try {
        await scope.totalPorArquivo(params);

        params.file = await service.build(params.file);

        let content = await service.totalPorArquivo(params);

        return res
            .status(200)
            .json({
                content
            })
    }
    catch (error) {
        return res
            .status(error.httpCode)
            .json({
                httpCode: error.httpCode || 500,
                error: error.message || error.list
            })
    }
}

async function processarTran(req, res) {
    const params = {
        file: req.body.file
    };

    try {
        let data = await service.buildTran(params.file);

        let content = await service.processarTran(data);

        return res
            .status(200)
            .json({
                content
            })
    }
    catch (error) {
        return res
            .status(error.httpCode)
            .json({
                httpCode: error.httpCode || 500,
                error: error.message || error.list
            })
    }
}