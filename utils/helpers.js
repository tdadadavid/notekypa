const bcrypt = require("bcrypt");

async function hashUserPassword(password) {
    let hashPassword;

    try {
        const salt = await bcrypt.genSalt(10);
        hashPassword = await bcrypt.hash(password, salt);
    }catch (err){
        return err;
    }

    return hashPassword;
}

module.exports = {
    hashUserPassword
}