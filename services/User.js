var knex = require("../db/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User{

    async findAll(){
        try{
            var result = await knex.select(["id","email","role","name", "image"]).table(process.env.DB_TABLE_USER);
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","email","role","name", "image"]).where({id:id}).table(process.env.DB_TABLE_USER);
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","password","role","name"]).where({email:email}).table(process.env.DB_TABLE_USER);
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(email,password,name,image){
        try{
            var hash = await bcrypt.hash(password, 10);

            if(image === "default"){
                image = "uploads/user-default.png";
            }
            else{
                image = "uploads/" + image
            }

           let result =  await knex.insert({email,password: hash,name,role: 0, image}).table(process.env.DB_TABLE_USER);
           return result[0];
        }catch(err){
            console.log(err);
            return{
                status: 500
            }
            
        }
    }   

    async findEmail(email){
        try{
            var result = await knex.select("*").from(process.env.DB_TABLE_USER).where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id,email,name,image,role){

        var user = await this.findById(id);

        if(user != undefined){

            var editUser = {};

            if(email != undefined){ 
                if(email != user.email){
                   var result = await this.findEmail(email);
                   if(result == false){
                        editUser.email = email;
                   }else{
                        return {status: false,err: "O e-mail j?? est?? cadastrado"}
                   }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role;
            }

            if(image != undefined){
                image = "uploads/" + image;
                editUser.image = image;
            }


            try{
                await knex.update(editUser).where({id: id}).table(process.env.DB_TABLE_USER);
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usu??rio n??o existe!"}
        }
    }

    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){

            try{
                await knex.delete().where({id: id}).table(process.env.DB_TABLE_USER);
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O usu??rio n??o existe, portanto n??o pode ser deletado."}
        }
    }

    async changePassword(newPassword,id,token){
        var hash = await bcrypt.hash(newPassword, 10);
        await knex.update({password: hash}).where({id: id}).table(process.env.DB_TABLE_USER);
        await PasswordToken.setUsed(token);
    }
}

module.exports = new User();