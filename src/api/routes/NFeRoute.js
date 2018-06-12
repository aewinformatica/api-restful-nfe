module.exports = (app) => {
    const NFe = require('../../core/NFe/NFeController');

    app.route('/nfe').post(NFe.processar);
    app.route('/nfe/total').post(NFe.totalPorArquivo);
    app.route('/nfe/transacao').post(NFe.processarTran)
};