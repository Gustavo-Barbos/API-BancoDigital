function validacaoCampoPreenchido(req) {
    const reqBody = Object.values(req.body);

    for (let i of reqBody) {
        if (i === '' || i === undefined) {
            return true;
        }
    }
}
function validacaoCampoPreenchidoUrl(req) {
    const reqQuery = Object.values(req.query);

    for (let i of reqQuery) {
        if (i === '' || i === undefined) {
            return true;
        }
    }
}
function validacaoCpfEmail(req, contas) {
    const { cpf, email, } = req.body;

    const cpfEncontrado = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });
    const emailEncontrado = contas.find((conta) => {
        return conta.usuario.email === email;
    });
    if (cpfEncontrado || emailEncontrado) {
        return true;
    };
}
function validacaoContaUrl(req, contas) {
    let numeroConta = undefined;

    if (req.params.numeroConta) {
        numeroConta = req.params.numeroConta;
    }
    if (req.query.numero_conta) {
        numeroConta = req.query.numero_conta;
    }
    const indiceConta = contas.findIndex((conta) => {
        return conta.numero === numeroConta;
    });
    return indiceConta;
}
function validacaoContaBody(req, contas) {
    const {
        numero_conta,
        numero_conta_origem,
        numero_conta_destino
    } = req.body;

    if (numero_conta !== "" && numero_conta !== undefined) {

        const indiceConta = contas.findIndex((conta) => {
            return conta.numero === numero_conta;
        });
        return indiceConta;
    }
    if (numero_conta_origem && numero_conta_destino) {

        const indiceContaOrigem = contas.findIndex((conta) => {
            return conta.numero === numero_conta_origem;
        });
        const indiceContaDestino = contas.findIndex((conta) => {
            return conta.numero === numero_conta_destino;
        });
        return { indiceContaOrigem, indiceContaDestino }
    }
}
function filtrarExtrato(req, res) {
    const {
        saques,
        depositos,
        transferencias
    } = require('../bancodedados');

    const { numero_conta } = req.query;

    const depositosDaConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    });
    const saquesDaConta = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    });
    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });
    const transferenciasRecebida = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    return res.status(203).json({
        depositos: depositosDaConta,
        saques: saquesDaConta,
        transferenciasEnviadas,
        transferenciasRecebida
    });
}
module.exports = {
    filtrarExtrato,
    validacaoContaUrl,
    validacaoCpfEmail,
    validacaoContaBody,
    validacaoCampoPreenchido,
    validacaoCampoPreenchidoUrl
}
