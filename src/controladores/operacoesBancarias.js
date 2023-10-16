const { banco } = require('../bancodedados');
let { contas } = require('../bancodedados');
let { idConta } = require('../bancodedados');
const {
    validacaoCampoPreenchido,
    validacaoContaUrl,
    validacaoCpfEmail
} = require('./funcoesValidacao');

function listarContaBancaria(req, res) {

    if (!req.query.senha_banco) {
        return res.status(400).json({
            mensagem: "Senha não informada"
        });
    }
    if (req.query.senha_banco !== banco.senha) {
        return res.status(401).json({
            mensagem: "A senha informada, é inválida!"
        });
    }
    return res.status(200).json(contas);
}
function criarContaBancaria(req, res) {

    if (validacaoCampoPreenchido(req)) {
        return res.status(400).json({
            mensagem: `Não foi possível prosseguir devido à falta de informações.
            Solicitamos a gentileza de preencher todos os campos obrigatórios.`
        });
    }
    if (validacaoCpfEmail(req, contas)) {
        return res.status(400).json({
            mensagem: "Já existe uma conta com o cpf ou e-mail informado!"
        })
    }
    const novaConta = {
        numero: String(++idConta),
        saldo: 0,
        usuario: req.body
    };
    contas.push(novaConta);
    return res.status(201).json();
}
function atualizarContaBancaria(req, res) {

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
    const demaisContas = contas.filter((conta) => {
        return conta.numero !== req.params.numeroConta;
    });
    if (validacaoCpfEmail(req, demaisContas)) {
        return res.status(401).json({
            mensagem: "Já existe uma conta com o cpf ou e-mail informado!"
        });
    }
    contas[indiceConta].usuario = req.body;
    return res.status(204).json();
}
function excluirContaBancaria(req, res) {
    const indiceConta = validacaoContaUrl(req, contas);

    if (indiceConta === -1) {
        return res.status(404).json({
            mensagem: "Conta não encontrada"
        });
    }
    if (contas[indiceConta].saldo !== 0) {
        return res.status(400).json({
            mensagem: "A conta só pode ser removida se o saldo for zero!"
        });
    }
    contas.splice(indiceConta, 1);
    return res.status(204).json();
}
module.exports = {
    contas,
    listarContaBancaria,
    criarContaBancaria,
    atualizarContaBancaria,
    excluirContaBancaria
}