# 🤵 API-RESTful-USERS 🤵

Está é uma API RESTful utilizada para gestão de usuários cadastrados no banco de dados.

## HATEOAS

Cumprindo os padrões RESTful, cada endpoint dessa API vai retornar uma seríe de links mostrando outras ações que o usuário poderá utilizar.

```
    "_LINKS": [
        {
            "href": "http://localhost:3000/users",
            "method": "GET",
            "rel": "get_users"
        },
        {
            "href": "http://localhost:3000/user/id",
            "method": "GET",
            "rel": "get_user"
        },
        {
            "href": "http://localhost:3000/user",
            "method": "POST",
            "rel": "post_user"
        },
        {
            "href": "http://localhost:3000/user/id",
            "method": "PUT",
            "rel": "put_user"
        },
        {
            "href": "http://localhost:3000/user/id",
            "method": "DELETE",
            "rel": "delete_user"
        }
    ]
```

## POST/ auth

Essa EndPoint é responsavel por autenticar o usuário.

### Parametros:

*Email: Email do usuário cadastrado do sistema

*password: Senha do usuário cadastrado do sistema

```
{
    "password": "example3030",
    "email": "example@example.com"
}   
```

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber o token.
```
{
    "token": "AbJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haJwiOiJAbHVjYXMuY29tIiwiaWF0IjoxNjEyMTEwNTg2LCJleHAiOjE2MTIyODMzODZ9.8exL7fMcmShBrthpK15sc9mnU6pVoFOWTvbN6fmTZkG"
}
```

### Erro de autentificação! 401

Este erro ocorre com o problema de autentificação do usuário.
```
{
    "err": "usuário ou senha incorretos!"
}

```

## POST/ recover

Essa EndPoint é responsavel pela solicitação de token para alteração de senha.

### Parametros:

*Email: Email do usuário cadastrado do sistema

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber o token para realizar a alteração.
```
{
    "token": "13574t745"
}
```

### Erro email não está cadastrado

Este erro ocorre caso o email não for encontrado para prosseguir com a solicitação.
```
{
    "err": "email não encontrado!"
}

```

## POST/ changePassword

Essa EndPoint é responsavel pela alteração de senha do usuário.

### Parametros:

*Token: token adquirido pela endpoint /recover

*password: nova senha do usuário

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso.
```
{
    "sucesso": "senha alterada!"
}
```

### Erro token inválido 400

Este erro ocorre caso o token for inválido.
```
{
    "err": "token inválido!"
}

```

## GET/ users

Essa EndPoint é responsavel por retornar todos os usuários cadastrados 

### Parametros:

Nenhum

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber a listagem de todos os usuários
```
 "users": [
        {
            "id": 12,
            "email": "admin@example.com",
            "role": 0,
            "name": "Lucas",
            "image: "uploads/adminphoto.png
        },
        {
            "id": 13,
            "email": "example@example.com",
            "role": 1,
            "name": "Carlos",
            "image: "uploads/carlos.jpg
        },
        {
            "id": 14,
            "email": "wilson@example.com",
            "role": 0,
            "name": "Wilson"
            "image: "uploads/default.jpg
        }
```
### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```
## GET/ user/ID

Essa EndPoint é responsavel por retornar um usuário especifico! 

### Parametros:

Id: é preciso indicar o ID no final da endpoint.

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber os dados do usuário escolhido.
```
{
    "id": 1,
    "email": "adminAcc@example.com",
    "role": 1,
    "name": "Lucas",
    "image: "uploads/lucas.png
}
```
### Bad request! 400

Acontece quando o ID for de um formato inválido.
```
{
    "err": "ID inválido!"
}

```
### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```

## POST/ user

Essa EndPoint é responsavel por registrar um novo usuário! 

### Parametros:

image: foto do usuário se tiver

*name: nome do usuário

*password: senha do usuário

*email: email do usuário

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o usuário foi cadastrado com sucesso!"}
```

### Bad request! 400

Acontece quando um dos parametros for inválido.
```
{
    "err": "parametros inválidos!"
}

```


### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```

## PUT/ user/ID

Essa EndPoint é responsavel por editar um usuário! 

### Parametros:
*Id: é preciso indicar o ID do usuário no final da endpoint.

image: nova foto do usuário

name: novo nome do usuário

password: nova senha do usuário

email: novo email do usuário

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o usuário foi editado com sucesso!"}
```

### Bad request! 400

Acontece quando ID for inválido.
```
{
    "err": "ID inválido!"
}

```

### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```

## DELETE/ user/ID

Essa EndPoint é responsavel por deletar um  usuário! 

### Parametros:

*Id: é preciso indicar o ID do usuário no final da endpoint.


### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{sucesso: "o usuário foi deletado com sucesso!"}
```

### Bad request! 400

Acontece quando o ID for inválido.
```
{
    "err": "ID inválido!"
}

```

### Erro de autorização! 401

```
{
    "err": "você precisa estar autenticado!"
}

```







