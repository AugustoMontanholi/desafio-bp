# Desafio BP

## Desafio

Criar uma simulação de um jogo hipotético semelhante ao banco imobiliário

## Tecnologias utilizadas
* NodeJS
* NestJS
* Typeorm
* SQlite

## Executando o projeto

Pré-requisitos

- [NodeJS](https://nodejs.org/en/) (v14 or superior) e NPM

#### Clonar o projeto

```bash
# Clone este repositório
$ git clone https://github.com/AugustoMontanholi/desafio-bp.git
```

#### Executar localmente
Para testar o projeto localmente, após acessar a pasta do projeto e instalar as dependências, rodar o comando `yarn dev`

```bash
# Instalar dependências
$ yarn

# Rodar o projeto
$ yarn dev
```

## Endpoint

### Listar usuários
```
GET - /games/simulate
```

**Response**
```
{
  "winner": "cauteloso",
  "players": ["cauteloso", "aleatorio", "exigente", "impulsivo"]
}

```

## Testando a aplicação

#### Fazer uma requisição para o endpoint

```sh
curl --request GET \
    --url http://localhost:3000/games/simulate
```
