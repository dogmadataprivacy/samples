## Pedidos de Titulares
Este aplicativo é uma implementação de referência para pedidos de acesso e remoção de dados por parte dos titulares dos dados

### SAR - Pedidos de Acesso
Pedidos de acesso, ou SARs (_Subject Access Request_), são pedidos feitos pelos titulares dos dados ao Dogma Privacy Middleware (DPM). Para cada pedido, o DPM irá se conectar aos sistemas cadastrados no Data Mapping para extrair os dados necessários.

### DDR - Pedidos de Remoção
Pedidos de remoção, ou DDRs (_Data Deletion Request_), são pedidos feitos pelos titulares dos dados ao Dogma Privacy Middleware (DPM). Para cada pedido, o DPM irá se conectar aos sistemas cadastrados no Data Mapping para remover os dados necessários.

#### Tipos de Integração
O Dogma Privacy Middleware aceita duas formas de integração para os pedidos SAR e DDR: pedidos síncronos e assíncronos.

Pedidos síncronos são requisições _http_ que devem ser respondidos imediatamente pela sua aplicação para o Dogma Privacy Middleware. Pedidos assíncronos devem ser aceitos pela aplicação e respondidos posteriormente ao DPM. A sua aplicação deve indicar qual o modelo de resposta usando códigos http de retorno: 200 (OK) para síncrono e 202 (_Accepted_) para assíncrono.

#### Modelo dos Pedidos e Respostas
Ao excutar uma requisições _http_ na sua aplicação, o DPM usará a configuração seguinte:

1. Para pedidos SAR ou DDR, o path será `/dogma/v1/request`
2. Método http: `POST`
3. Corpo da requisição:
```json
{
    "version"   : "v1",
    "source"    : "id_do_sistema",
    "protocol"  : "numero_do_pedido",
    "scope"     : "SAR_ou_DDR",
    "keys"      : { "id1": "id_de_itendificacao_do_titular", "id2": "" },
    "fields"    : ["campo1", "campo2"]
}
```

Exemplo usando [httpie](https://httpie.org/):  
```
http POST :8080/dogma/v1 version=v1 source=users protocol=xyz scope=SAR keys:='{"id": 1, "document":"333.222.111-00"}' fields:='["name", "lastname", "phone"]'
```