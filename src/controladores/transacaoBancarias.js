const { format } = require('date-fns');
let { contas } = require('./operacoesBancarias');
const {
    filtrarExtrato,
    validacaoContaUrl,
    validacaoContaBody,
    validacaoCampoPreenchido,
    validacaoCampoPreenchidoUrl
} = require('./funcoesValidacao');
let {
    saques,
    depositos,
    transferencias
} = require('../bancodedados');

function depositar(req, res) {
    const { numero_conta, valor } = req.body;

    if (validacaoCampoPreenchido(req, res)) {
        return res.status(400).json({
            mensagem: `Não foi possível prosseguir devido à falta de informações.
            Solicitamos a gentileza de preencher todos os campos obrigatórios.`
        });
    }
    const indiceConta = validacaoContaBody(req, contas);
    if (indiceConta === -1) {
        return res.status(404).json({
            mensagem: "Conta não encontrada"
        });
    };
    if (valor <= 0) {
        return res.status(400).json({
            mensagem: "Valor de depósito inválido"
        });
    }
    contas[indiceConta].saldo += valor;

    const dataDeposito = format(new Date(), 'yyyy-dd-MM HH:mm:ss');
    const deposito = {
        data: dataDeposito,
        numero_conta,
        valor
    }
    depositos.push(deposito);
    return res.status(204).json();
}
function sacar(req, res) {
    const { numero_conta, valor } = req.body;

    if (validacaoCampoPreenchido(req, res)) {
        return res.status(400).json({
            mensagem: `Não foi possível prosseguir devido à falta de informações.
            Solicitamos a gentileza de preencher todos os campos obrigatórios.`
        });
    }
    const indiceConta = validacaoContaBody(req, contas);
    if (indiceConta === -1) {
        return res.status(404).json({
            mensagem: "Conta não encontrada"
        });
    };
    if (contas[indiceConta].usuario.senha !== req.body.senha) {
        return res.status(403).json({
            mensagem: "Senha inválida"
        });
    }
    if (contas[indiceConta].saldo < valor) {
        return res.status(400).json({
            mensagem: "Saldo insuficiente"
        });
    }
    contas[indiceConta].saldo -= valor;

    const dataSaque = format(new Date(), 'yyyy-dd-MM HH:mm:ss');
    const saque = {
        data: dataSaque,
        numero_conta,
        valor
    }
    saques.push(saque);
    return res.status(204).json();
}
function transferir(req, res) {
    const {
        numero_conta_origem,
        numero_conta_destino,
        valor
    } = req.body;

    if (validacaoCampoPreenchido(req, res)) {
        return res.status(400).json({
            mensagem: `Não foi possível prosseguir devido à falta de informações.
            Solicitamos a gentileza de preencher todos os campos obrigatórios.`
        });
    }
    const {
        indiceContaOrigem,
        indiceContaDestino
    } = validacaoContaBody(req, contas);

    if (indiceContaOrigem === -1) {
        return res.status(404).json({
            mensagem: "Conta de origem não encontrada"
        });
    }
    if (indiceContaDestino === -1) {
        return res.status(404).json({
            mensagem: "Conta de destino não encontrada"
        });
    }
    if (contas[indiceContaOrigem].usuario.senha !== req.body.senha) {
        return res.status(403).json({
            mensagem: "Senha inválida"
        });
    }
    if (contas[indiceContaOrigem].saldo < valor) {
        return res.status(400).json({
            mensagem: "Saldo insuficiente"
        });
    }
    contas[indiceContaOrigem].saldo -= valor;
    contas[indiceContaDestino].saldo += valor;

    const dataTrasferencia = format(new Date(), 'yyyy-dd-MM HH:mm:ss');
    const transferencia = {
        data: dataTrasferencia,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(transferencia);
    return res.status(204).json();
}
function verSaldo(req, res) {

    if (validacaoCampoPreenchidoUrl(req)) {
        return res.status(400).json({
            mensagem: `Não foi possível prosseguir devido à falta de informações.
            Solicitamos a gentileza de preencher todos os campos obrigatórios.`
        });
    }
    const indiceConta = validacaoContaUrl(req, contas);
    if (indiceConta === -1) {
        return res.status(404).json({
            mensagem: "Conta não encontrada"
        });
    }
    if (contas[indiceConta].usuario.senha !== req.query.senha) {
        return res.status(403).json({
            mensagem: "Senha inválida"
        });
    }
    return res.status(203).json({
        saldo: contas[indiceConta].saldo
    });
}
function verExtrato(req, res) {

    if (validacaoCampoPreenchido(req)) {
        return res.status(400).json({
            mensagem: `Não foi possível prosseguir devido à falta de informações.
            Solicitamos a gentileza de preencher todos os campos obrigatórios.`
        });
    }
    const indiceConta = validacaoContaUrl(req, contas);
    if (indiceConta === -1) {
        return res.status(404).json({
            mensagem: "Conta não encontrada"
        });
    }
    if (contas[indiceConta].usuario.senha !== req.query.senha) {
        return res.status(403).json({
            mensagem: "Senha inválida"
        });
    }
    filtrarExtrato(req, res);
}
module.exports = {
    depositar,
    sacar,
    transferir,
    verSaldo,
    verExtrato
}