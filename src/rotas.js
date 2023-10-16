const express = require('express');

const {
    listarContaBancaria,
    criarContaBancaria,
    atualizarContaBancaria,
    excluirContaBancaria
} = require('./controladores/operacoesBancarias');

const {
    depositar,
    sacar,
    transferir,
    verSaldo,
    verExtrato
} = require('./controladores/transacaoBancarias');

const rotas = express();

rotas.get('/contas', listarContaBancaria);
rotas.post('/contas', criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarContaBancaria);
rotas.delete('/contas/:numeroConta', excluirContaBancaria);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', verSaldo);
rotas.get('/contas/extrato', verExtrato);

module.exports = rotas;