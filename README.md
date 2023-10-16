<h2 align="center">
  Desafio Backend - Cubos Academy & IFood
</h2>  
</h2>
<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge"/>
</p>
<h2 align= "center" >
  API REST Banco Digital
</h2>
<p align="center">
<img align="center" src="https://media.istockphoto.com/id/1452706695/pt/vetorial/money-transfer-icon-in-vector-logotype.jpg?s=612x612&w=0&k=20&c=mDNkN6rPnkLm6mmvuXjm_ey81-2be71ftKt_WPAuLu0=" style="width: 25%;" alt="Capa">
</p>
<p align="center"> Gerenciamento de transações bancárias. </p>

## 👨🏻💻 Sobre o projeto

<p> A proposta deste projeto é a criação de uma aplicação que realiza transações bancárias. Dessa forma será possível criar uma conta bancária para um novo cliente e registrar todas as transações realizadas nesta conta e entre contas deste sistema.</p>

## :man_mechanic: Linguagens e Ferramentas

- Javascript
- Node.js
- Json
- Insomnia
  
## :triangular_flag_on_post: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)
  
## :ladder: Fucionalidades do Projeto

- [x] Criação de conta bancária;
- [x] Listagem das contas existentes;
- [x] Atualização dos dados de uma conta
- [x] Exclusão de conta;
- [x] Operações de depósito, saque e transferência entre contas;
- [x] Consulta do saldo de uma conta;
- [x] Extrato da conta;

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone https://github.com/Gustavo-Barbos/desafio-backend-modulo-02-sistema-bancario-b2b-ifood-t11.git

# 2. Instale as dependências

npm install express
npm install -D nodemon

# 3. Após instalação do nodemon, adicionar script dev no arquivo package.json

 "scripts": {
    "dev": "nodemon ./src/index.js"
  },

# 4. Execute o Backend

npm run dev
```

## :sassy_man: Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint lista todas as contas bancárias existentes. Verificando se a senha do banco foi informada e se a senha está correta.

#### Exemplo de resposta

```json
[
 {
  "numero": "1",
  "saldo": 24100,
  "usuario": {
   "nome": "Foo Bar1",
   "cpf": "99911122231",
   "data_nascimento": "2021-03-15",
   "telefone": "71999998881",
   "email": "foo@bar1.com",
   "senha": "12345"
  }
 },
 {
  "numero": "2",
  "saldo": 31000,
  "usuario": {
   "nome": "Foo Bar2",
   "cpf": "99911122232",
   "data_nascimento": "2021-03-15",
   "telefone": "71999998882",
   "email": "foo@bar2.com",
   "senha": "12345"
  }
 }
]
```

### Criar conta bancária

#### `POST` `/contas`

Esse endpoint cria uma conta bancária, gerando um número único para identificação da conta (número da conta).

**Modelo Json para Requisição**

```json
{
     "nome": "Foo Bar 1",
     "cpf": "00011122231",
     "data_nascimento": "2021-03-15",
     "telefone": "71999998881",
     "email": "foo@bar1.com",
 "senha": "12345"
}
```

#### Exemplo de Mensagem de erro: Mesmo cpf ou email já existente

```json
{
 "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
}
```

#### Exemplo de Mensagem de erro: falta de informações na requisição

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint atualizaa apenas os dados do usuário de uma conta bancária.

**Modelo Json para Requisição**

```json
{
     "nome": "Foo Bar 1",
     "cpf": "00011122231",
     "data_nascimento": "2021-03-15",
     "telefone": "71999998881",
     "email": "foo@bar1.com",
     "senha": "12345"
}
```

#### Exemplo de Mensagem de erro: número de conta inexistente

```json
{
 "mensagem": "Conta não encontrada"
}
```

#### Exemplo de Mensagem de erro: falta de informações na requisição

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

#### Exemplo de Mensagem de erro: Mesmo cpf ou email já existente

```json
{
 "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
}
```

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint exclui uma conta bancária existente.

- **Para requisição**
  - Informar número da conta no endereço da requisição. Exemplo: /contas/1234. Sendo 1234 o número da conta.

#### Exemplo de Mensagem de erro: Quando saldo da conta é diferente de zero

```json
{
 "mensagem": "A conta só pode ser removida se o saldo for zero!"
}
```

### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint soma o valor do depósito ao saldo de uma conta válida e registra essa transação.

**Modelo Json para Requisição**

```json
{
 "numero_conta": "2",
  "valor": 30000
}
```

#### Exemplo de Mensagem de erro: falta de informações na requisição

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

#### Exemplo de Mensagem de erro: número de conta inexistente

```json
{
 "mensagem": "Conta não encontrada"
}
```

#### Exemplo de Mensagem de erro: o valor do depósito é nulo ou negativo

```json
{
 "mensagem": "Valor de depósito inválido"
}
```

#### Exemplo do registro de um depósito

```json
{
     "data": "2023-15-10 20:32:47",
     "numero_conta": "1",
 "valor": 10000
}
```

OBS: A data de registro está em formato AAAA/DD/MM.

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint realiza o saque de um valor em uma determinada conta bancária e registra essa transação.

**Modelo Json**

```json
{
 "numero_conta": "3",
  "valor": 200,
  "senha": "12345"
}
```

#### Exemplo de Mensagem de erro: falta de informações na requisição

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

#### Exemplo de Mensagem de erro: número de conta inexistente

```json
{
 "mensagem": "Conta não encontrada"
}
```

#### Exemplo de Mensagem de erro: senha informada incorretamente

```json
{
 "mensagem": "Senha inválida"
}
```

#### Exemplo de Mensagem de erro: saldo indisponível

```json
{
 "mensagem": "Saldo insuficiente"
}
```

#### Exemplo do registro de um saque

```json
{
     "data": "2023-15-10 20:40:35",
     "numero_conta": "1",
     "valor": 10000
}
```

### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint permite a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação.

**Modelo Json**

```json
{
  "numero_conta_origem": "1",
 "numero_conta_destino": "2",
  "valor": 400,
  "senha": "12345"
}
```

#### Exemplo de Mensagem de erro: falta de informações na requisição

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

#### Exemplo de Mensagem de erro: número de conta errado

```json
{
 "mensagem": "Conta de origem não encontrada"
}
```

```json
{
 "mensagem": "Conta de destino não encontrada"
}
```

#### Exemplo de Mensagem de erro: senha informada incorretamente para conta de origem

```json
{
 "mensagem": "Senha inválida"
}
```

#### Exemplo de Mensagem de erro: saldo indisponível na conta origem

```json
{
 "mensagem": "Saldo insuficiente"
}
```

#### Exemplo do registro de uma transferência

```json
{
     "data": "2023-15-10 20:48:21",
     "numero_conta_origem": "1",
     "numero_conta_destino": "2",
     "valor": 10000
}
```

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint retorna o saldo de uma conta bancária.

- **Para Requisição**
  - Informar o número da conta e a senha no endereço na requisição.
 Exemplo: /contas/saldo?numero_conta=123&senha=123

#### Exemplo de Mensagem de erro: falta de informações na requisição da url

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

#### Exemplo de Mensagem de erro: senha informada errada na url

```json
{
 "mensagem": "Senha inválida"
}
```

#### Exemplo de Mensagem de erro: conta informada errada na url

```json
{
 "mensagem": "Conta não encontrada"
}
```

#### Exemplo de Resposta

```json
{
 "saldo": 13000
}
```

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint lista as transações realizadas de uma conta específica.

- **Para Requisição**
  - Informar o número da conta e a senha no endereço na requisição.
 Exemplo: /contas/saldo?numero_conta=123&senha=123

#### Exemplo de Mensagem de erro: falta de informações na requisição da url

```json
{
 "mensagem": "Não foi possível prosseguir devido à falta de informações. Solicitamos a gentileza de preencher todos os campos obrigatórios."
}
```

#### Exemplo de Mensagem de erro: conta informada errada na url

```json
{
 "mensagem": "Conta não encontrada"
}
```

#### Exemplo de Mensagem de erro: senha informada errada na url

```json
{
 "mensagem": "Senha inválida"
}
```

#### Exemplo de Resposta

```json
{
 "depositos": [
  {
   "data": "2023-15-10 20:50:24",
   "numero_conta": "1",
   "valor": 30000
  }
 ],
 "saques": [
  {
   "data": "2023-15-10 21:28:24",
   "numero_conta": "1",
   "valor": 2000
  },
  {
   "data": "2023-15-10 21:28:36",
   "numero_conta": "1",
   "valor": 700
  }
 ],
 "transferenciasEnviadas": [
  {
   "data": "2023-15-10 21:01:25",
   "numero_conta_origem": "1",
   "numero_conta_destino": "2",
   "valor": 400
  },
  {
   "data": "2023-15-10 21:29:19",
   "numero_conta_origem": "1",
   "numero_conta_destino": "2",
   "valor": 300
  },
  {
   "data": "2023-15-10 21:29:24",
   "numero_conta_origem": "1",
   "numero_conta_destino": "2",
   "valor": 3100
  }
 ],
 "transferenciasRecebida": [
  {
   "data": "2023-15-10 21:23:53",
   "numero_conta_origem": "2",
   "numero_conta_destino": "1",
   "valor": 500
  },
  {
   "data": "2023-15-10 21:29:03",
   "numero_conta_origem": "2",
   "numero_conta_destino": "1",
   "valor": 100
  }
 ]
}
```

## :technologist: Autor

<table>
  <tr>
  <td align="center"><img style="width: 20%; border-radius: 50%"
  src="https://avatars.githubusercontent.com/u/97522089?v=4"
  alt="Gustavo Barbosa"/><br /><sub><b>Gustavo Barbosa</b></sub></a><br />
  <a href="https://www.linkedin.com/in/gustavosoaresb/" alt="Linkedin">
  <br>
  <img src="https://img.shields.io/badge/-Linkedin-1C1C1C?style=for-the-badge&logo=Linkedin&logoColor=00FFFF&link=https://https://www.linkedin.com/in/gustavosoaresb/"  style= "width:90px;"/>
  </a>
</tr>
</table>
<br>

## :writing_hand: Dados do Projeto

<img src="https://img.shields.io/github/stars/Gustavo-Barbos/desafio-backend-modulo-02-sistema-bancario-b2b-ifood-t11?style=social">
<img src="https://img.shields.io/github/issues-pr-raw/Gustavo-Barbos/desafio-backend-modulo-02-sistema-bancario-b2b-ifood-t11?style=social">
<img src="<https://img.shields.io/github/issues-closed/Gustavo-Barbos/desafio-backend-modulo-02-sistema-bancario-b2b-ifoo>
