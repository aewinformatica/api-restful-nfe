Para iniciar o projeto voce precisa executar os seguintes comandos na pasta raiz e no nfe-web:
 - "npm install"

Para rodar o projeto:
 - API: "node app.js"
 - WEB: "ng serve"

O projeto é um serviço que le arquivos de NF-e e as transações NF-e e retorna alguns relatórios. Na opção "NF-e" é possivel enviar os 2 arquivos de NF-e e NF-e Transações
e aplicar alguns filtros para facilitar a leitura. E clicando em cima de cada NF-e é possivel ver as transações daquele documento.
Na opção "Transações" voce faz o upload do arquivo de transações e recebe uma lista de erros com seu detalhamento e a quantidade de transações que retornaram sucesso.