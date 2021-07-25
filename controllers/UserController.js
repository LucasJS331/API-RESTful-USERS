var User = require("../services/User");
var PasswordToken = require("../services/PasswordToken");
const validatorUser = require("../validator/user-validator");
const userValidator = require("../validator/user-validator");
var fs = require('fs');


class UserController{
    async findAll(req, res){
        var users = await User.findAll();
        const hateoas = [
            {
                href: "http://localhost:3000/user/id",
                method: "GET",
                rel: "get_user"
            },
            {
                href: "http://localhost:3000/user",
                method: "POST",
                rel: "post_user"
            },
    
            {
                href: "http://localhost:3000/user/id",
                method: "PUT",
                rel: "put_user"
            },

            {
                href: "http://localhost:3000/user/id",
                method: "DELETE",
                rel: "delete_user"
            },
    
        ]
        res.json({users, _LINKS: hateoas});
    }

    async findOne(req, res){
        var id = req.params.id;
        var result = await userValidator.IdValidation(id);
        if(result.status == 200){
            var user = await User.findById(id);
            if(user == undefined){
                res.status(404).json({});
            }else{
                const hateoas = [
                    {
                        href: "http://localhost:3000/users",
                        method: "GET",
                        rel: "get_users"
                    },
                    {
                        href: "http://localhost:3000/user",
                        method: "POST",
                        rel: "post_user"
                    },
            
                    {
                        href: "http://localhost:3000/user/" + id,
                        method: "PUT",
                        rel: "put_user"
                    },

                    {
                        href: "http://localhost:3000/user/" + id,
                        method: "DELETE",
                        rel: "delete_user"
                    },
            
                ]
                res.status(200).json({user, _LINKS: hateoas });
            }
        } else{
            res.status(result.status).send(result.err);
        }      
    }

    async create(req, res){
        var {email, name, password} = req.body;
        var image = req.file ?  req.file.filename : "default";
        var result = await validatorUser.newUserValidation(name,email,password);
        if(result.status == 200){
           
           let id =  await User.new(email,password,name, image);
           const hateoas = [
            {
                href: "http://localhost:3000/users",
                method: "GET",
                rel: "get_users"
            },
            {
                href: "http://localhost:3000/user/" +id,
                method: "GET",
                rel: "get_user"
            },

            {
                href: "http://localhost:3000/user/" + id,
                method: "PUT",
                rel: "put_user"
            },

            {
                href: "http://localhost:3000/user/" + id,
                method: "DELETE",
                rel: "delete_game"
            },
    
        ]
            res.status(200).json({sucesso:"Usuário cadastrado com sucesso!", _LINKS: hateoas});
        }else{
            if(image != "default"){
                var filePath = req.file.path ;
                fs.unlinkSync(filePath);
            }    
            res.status(result.status).send(result.err);
        }
       
    }

    async edit(req, res){
        var {name, role, email} = req.body;
        var {id} = req.params;
        var image = req.file ?  req.file.filename : undefined;

        var result = await userValidator.IdValidation(id);
        if(result.status == 200){
            var confirm = await User.update(id,email,name,image,role);

            if(confirm != undefined){
                if(confirm.status){
                    const hateoas = [
                        {
                            href: "http://localhost:3000/users",
                            method: "GET",
                            rel: "get_users"
                        },
                        {
                            href: "http://localhost:3000/user/" + id,
                            method: "GET",
                            rel: "get_user"
                        },
            
                        {
                            href: "http://localhost:3000/user",
                            method: "POST",
                            rel: "post_user"
                        },
            
                        {
                            href: "http://localhost:3000/user/" + id,
                            method: "DELETE",
                            rel: "delete_user"
                        },
                    ]
                    res.status(200).json({sucesso:"usuario editado com sucesso!", _LINKS: hateoas});
                }else{
                    res.status(406).send(confirm.err)
                }
            }else{
                res.status(500).send("Ocorreu um erro no servidor!");
            }
        } else{
            res.status(result.status).send(result.err)
        }    
    }

    async remove(req, res){
        var id = req.params.id;

        let result = await userValidator.IdValidation(id);

        if(result.status == 200){
            var confirm = await User.delete(id);

            if(confirm.status){
                const hateoas = [
                    {
                        href: "http://localhost:3000/users",
                        method: "GET",
                        rel: "get_users"
                    },
                    {
                        href: "http://localhost:3000/user/id",
                        method: "GET",
                        rel: "get_user"
                    },
        
                    {
                        href: "http://localhost:3000/user/id",
                        method: "PUT",
                        rel: "put_user"
                    },
        
                    {
                        href: "http://localhost:3000/user",
                        method: "POST",
                        rel: "post_user"
                    },
                ]
                res.status(200).json({sucesso:"Usuário deletado com sucesso!", _LINKS: hateoas});
            }else{
                res.status(404).send(confirm.err);
            }
        }
        else{
            res.status(result.status).send(result.err);
        }

        
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
           res.status(200);
           res.send("" + result.token);
        }else{
            res.status(406)
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.id_user,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }else{
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req, res){
        var {email, password } = req.body;

        let result = await userValidator.loginValidation(email, password);

        if(result.status == 200){
            res.status(result.status).send(result.token);
        } else{
            res.status(result.status).send(result.err);
        }       
    }

}

module.exports = new UserController();