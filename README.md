# Tudu aplicativo de tarefas
Essa é uma  RESTful API que permite:

-   Cadastrar Usuário
-   Fazer Login
-   Editar Perfil do Usuário Logado
-   Cadastrar tarefas
-   Listar tarefas
-   Editar tarefas
-   Deletar tarefas 


**Importante: O usuário só pode ver e manipular seus próprios dados e suas próprias tarefas. 

**Importante: Sempre que a validação de uma requisição falhar, há uma resposta com código de erro e mensagem adequada à situação.** 

**Importante: O link de acesso a esta API se encontra no final deste README.

**Exemplo:**

```javascript
// Quando é informado um id de uma tarefa que não existe:
// HTTP Status 404
{
    "mensagem": "Tarefa não existe!"
}
```

## **Banco de dados**

Foi criado um Banco de Dados PostgreSQL chamado `d2rhcbib4es0ue` contendo as seguintes tabelas e colunas:  


-   usuarios
    -   id
    -   nome
    -   email (campo único)
    -   senha

-   tarefas
    -   id
    -   titulo
    -   descricao
    -   prazo
    -   categoria
    -   anexos
    -   membro
    -   usuario_id


## **Requisitos obrigatórios**

-   A API  criada  acessa o banco de dados  ser criado "d2rhcbib4es0ue" para persistir e manipular os dados de usuários e tarefas utilizados pela aplicação.
-   O campo `id` das tabelas no banco de dados  é auto incremento, chave primária e não deve permiti edição uma vez criado.
-   O código esta organizado, delimitando as responsabilidades de cada arquivo adequadamente.
    -   Um arquivo index.js
    -   Um pasta de database
    -   Um pasta de rotas
    -   Um pasta com controladores
    -   Uma pasta com intermediarios

## **Status Codes**

Abaixo, são os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, não será enviado nada no corpo (body) da resposta  mas devera possuir um **_status code_** aproriado.
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   senha
    -   Validar se o e-mail informado já existe
    -   Criptografar a senha antes de persistir no banco de dados
    -   Cadastrar o usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
   201
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "E-mail já cadastrado."
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com a propriedade **token** que deverá possuir como valor o token de autenticação gerado e uma propriedade **usuario** que deverá possuir as informações do usuário autenticado, exceto a senha do usuário.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -   Validar os campos obrigatórios:
        -   email
        -   senha
    -   Verificar se o e-mail existe
    -   Criar token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

### **Validações do token**

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar se o token foi enviado no header da requisição (Bearer Token)
    -   Consultar usuário no banco de dados pelo id contido no token informado


### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   senha
 
    -   Criptografar a senha antes de salvar no banco de dados
    -   Atualizar as informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "2b$10$w92FVD3/uC3NUk11hKF7T..ZIelBbyxIjCfXm.DnBLZsWxzNK3dE"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### **Listar categorias**

#### `GET` `/tarefas`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as tarefas.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (tarefas) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   O endpoint deverá responder com um array de todas as tarefas cadastradas.

#### **Exemplo de requisição**

```javascript
// GET /tarefas
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        "id": 1,
		    "titulo": "comprar sapato",
		    "descricao": "usar casa",
		    "prazo": "2022-10-09T00:00:00.000Z",
		    "categoria": "task-pessoal",
    },
    {
        "id": 2,
		    "titulo": "comprar de vasoura",
		    "descricao": "usar na casa",
	      "prazo": "2022-10-09T00:00:00.000Z",
		    "categoria": "task-pessoal",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```
### **Cadastrar transação para o usuário logado**

#### `POST` `/tarefas`

Essa é a rota que será utilizada para cadastrar uma tarefa associada ao usuário logado.  
So é possível cadastrar tarefas associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   titulo (obrigatorio)
    -   descricao
    -   prazo (obrigatorio)
    -   categoria
    -   anexos
    -   membro
    -   usuario_id

-   **Resposta**
    Em caso de **sucesso**, deveremos enviar, no corpo (body) da resposta, as informações da tarefa cadastrada, incluindo seu respectivo `id`.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar os campos obrigatórios:
        -   titulo
        -   data
        -  usuario_id
     
    -   Cadastrar a tarefa associada ao usuário logado.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    
	"titulo": "Lampada ",
	"descricao": "usar na casa",
	"prazo": "2022-10-09T00:00:00.000Z",
	"categoria": "task-pessoal",
	"anexos": ,
	"membro": ,

}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
   "id": 1,
	"titulo": " lampadade  casa",
	"descricao": "usar na casa",
	"prazo": "2022-10-09T00:00:00.000Z",
	"categoria": "task-pessoal",
	"anexos": null,
	"membro": null,
	"usuario_id": 16
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Atualizar tarefa do usuário logado**

#### `PUT` `/tarefas/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas tarefas cadastradas.  

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  
    -   titulo (obrigatorio)
    -   descricao
    -   prazo (obrigatorio)
    -   categoria
    -   anexos
    -   membro
    -   usuario_id


-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// PUT /tarefas/1
{
		    "titulo": "comprar sapato",
		    "descricao": "usar casa",
		    "prazo": "2022-10-09T00:00:00.000Z",
		    "categoria": "task-pessoal",
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não foi possivel realizar a edição"
}
```

### **Excluir tarefa do usuário logado**

#### `DELETE` `/tarefas/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas tarefas cadastradas.  


-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**:
  
    -   Excluir a tarefa no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /tarefa/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Tarefa não encontrada."
}
```


Link do deploy da API : https://app-tutu.herokuapp.com/


