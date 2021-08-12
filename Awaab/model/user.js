// {_id: ,username:,pass: , role}
class User{
    constructor(_id,username, pass, role){
        this._id = _id;
        this.username = username;
        this.pass = pass;
        this.role = role;
    }
}
module.exports = User;