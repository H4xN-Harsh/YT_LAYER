const bcrypt = require('bcrypt');
exports.hashPass = async(password)=>{
    return await bcrypt.hash(password,10);
}
exports.comparePass = async(password,hash)=>{
    return await bcrypt.compare(password,hash);
};