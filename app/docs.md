## Pedidos de Titulares
Este aplicativo é uma implementação de referência para pedidos de acesso e remoção de dados por parte dos titulares dos dados

### SAR - Pedidos de Acesso
Pedidos de acesso, ou SARs (Subject Access Request), são pedidos feitos pelos titulares dos dados ao Dogma Privacy Middleware (DPM). Para cada pedido, o DPM irá se conectar aos sistemas cadastrados no Data Mapping para extrair os dados necessários.

### DDR - Pedidos de Remoção
Pedidos de remoção, ou DDRs (Data Deletion Request), são pedidos feitos pelos titulares dos dados ao Dogma Privacy Middleware (DPM). Para cada pedido, o DPM irá se conectar aos sistemas cadastrados no Data Mapping para remover os dados necessários.

#### Tipos de Integração
O Dogma Privacy Middleware aceita duas formas de integração para os pedidos SAR e DDR: pedidos sícronos e assícronos.

Pedidos síncronos são _requests_ http que devem ser respondidos imediatamente pela sua aplicação para o Dogma Privacy Middleware. Pedidos assíncronos devem ser aceitos pela aplicação e respondidos posteriormente ao DPM. A sua aplicação deve indicar qual o modelo de resposta usando códigos http de retorno: 200 (OK) para síncrono e 202 (Accepted) para assíncrono.