
# Counter Strike News

Este projeto é meu primeiro monolito, desenvolvido com o principal objetivo de aprendizado. Apesar de não ser a abordagem mais eficiente, foi uma experiência boa.

Neste projeto, utilizei o padrão de arquitetura MVC (Model, View, Controller). Implementei validações e proteções de senha. Como é um projeto de estudo pessoal, houve desafios iniciais por não saber algumas dependências. No entanto, com paciência, consegui aprender e compreender como funcionam os cookies e como utilizar hashes de senha com bcryptjs.

**Como estou usando HTML, decidi não usar o middleware method-override para utilizar os métodos PUT/DELETE. Utilizei apenas os métodos GET e POST para fazer as requisições.**
## Funcionalidades

- Criar uma conta
- Adicionar comentários
- Editar seus comentários
- Apagar seus comentários
- Ver comentários dos outros usuários


## Stack utilizada

**Front-end:** Html, css

**Back-end:** Node, Express, Sequelize, MySQL

## Dependências

**bcryptjs** Para hashing e comparação de senhas.

**connect-flash** Para exibir mensagens temporárias ao usuário.

**cookie-parser** Para analisar cookies.

**cookie-session** Para gerenciar sessões usando cookies.

**dotenv** Para gerenciar variáveis de ambiente.

**express-flash** Para exibir mensagens flash no Express.

**express-handlebars** Engine de template para renderização de views.

**express-session** Para gerenciar sessões de usuário.

**moment** Para manipulação e formatação de datas.

**mysql2** Conector para MySQL.

**nodemon** Para reiniciar automaticamente o servidor durante o desenvolvimento.

**sequelize** ORM para interagir com o banco de dados.

**session-file-store** Para armazenar sessões em arquivos.











