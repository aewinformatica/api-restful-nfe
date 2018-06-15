module.exports = {
    build,
    processar,
    totalPorArquivo,
    buildTran,
    processarTran
};

//Função que monsta o array de objetos contendo cada NFe
async function build(file) {
    let fileTxt = Buffer.from(file, 'base64').toString('utf8');

    let content = [];
    let obj = {};
    let data = fileTxt.split('\n');
    let keys = data[0].split(';');

    data.splice(0, 1);

    let linha = [];
    data.forEach(item => {
        linha.push(item.split(';'));
    });

    for (let j = 0; j < linha.length; j++) {
        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = linha[j][i];
        }
        content.push(JSON.parse(JSON.stringify(obj)));
    }

    return content
}

async function buildTran(file, nfe) {
    let fileTxt = Buffer.from(file, 'base64').toString();

    let content = fileTxt.split('EndTran');
    let data = [];

    let objAux = {};

    content.forEach((item, index) => {
        objAux.chave = content[index].match(/(:.\d+)/) ? content[index].match(/(:.\d+)/)[0].replace(': ', '') : null;
        objAux.orgao = content[index].match(/(SEFAZ-[A-Z].)/) ? content[index].match(/(SEFAZ-[A-Z].)/)[0] : null;
        objAux.erro = content[index].match(/(rejeitou)/) ? content[index].match(/(rejeitou)/)[0] : null;
        objAux.motivo = content[index].match(/(Motivo: \d+)/) ? content[index].match(/(Motivo: \d+)/)[0].split(' ')[1] : null;
        data.push(JSON.parse(JSON.stringify(objAux)))
    });

    if (!nfe) return data;

    nfe.forEach(item => {
        item.transacoes = data.filter(item2 => item2.chave === item.Chave);
        item.transacoes.forEach(item2 => delete item2.chave)
    })
}

//Função que aplica os filtros
async function processar(params) {

    if (params.periodo) {
        params.file = params.file.filter(item => item.Data === params.periodo)
    }
    if (params.tipoDocumento) {
        params.file = params.file.filter(item => item.Tipo === params.tipoDocumento)
    }
    if (params.chave) {
        params.file = params.file.filter(item => item.Chave === params.chave)
    }
    if (params.documentoDestinatario) {
        params.file = params.file.filter(item => item.CnpjCpf === params.documentoDestinatario)
    }
    if (params.status) {
        params.file = params.file.filter(item => {
            return params.status.indexOf(item.Status) !== -1
        })
    }

    return params.file
}

async function totalPorArquivo(params) {
    let content = {
        valorTotal: 0,
        valorProd: 0,
        valorICMS: 0,
        valorIPI: 0
    };

    if (params.periodo) {
        params.file = params.file.filter(item => item.Data === params.periodo)
    }
    if (params.tipoDocumento) {
        params.file = params.file.filter(item => item.Tipo === params.tipoDocumento)
    }

    params.file.forEach(item => {

        content.valorTotal += parseFloat(item.ValorTotal.replace(',', '.'));
        content.valorProd += parseFloat(item.ValorProd.replace(',', '.'));
        content.valorICMS += parseFloat(item.ValorICMS.replace(',', '.'));
        content.valorIPI += parseFloat(item.ValorIPI.replace(',', '.'));
    });

    content.valorTotal = content.valorTotal.toFixed(2);
    content.valorProd = content.valorProd.toFixed(2);
    content.valorICMS = content.valorICMS.toFixed(2);
    content.valorIPI = content.valorIPI.toFixed(2);

    return content
}

async function processarTran(data) {
    let response = {
        erros: [],
        sucesso: 0
    };

    data.forEach((item, index) => {
        if (item.erro) {
            response.erros.total++;

            if (response.erros) {

                let index = response.erros.findIndex((item2, index, array) => {
                    return item.motivo === item2.motivo
                });

                if (index !== -1) {
                    response.erros[index].quantidade++
                } else {
                    response.erros.push({
                        erro: item.erro,
                        motivo: item.motivo,
                        quantidade: 1
                    })
                }
            } else {

                response.erros = [
                    {
                        erro: item.erro,
                        motivo: item.motivo,
                        quantidade: 1
                    }
                ]
            }
        } else {
            response.sucesso++;
        }
    });

    return response
}