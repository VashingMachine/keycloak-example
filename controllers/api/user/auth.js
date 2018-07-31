var keycloak = require('../../../keycloak');

module.exports = function(r){
    r.get('/', keycloak.keycloak.protect() ,function (req,res) {
        res.send({test: "OK"});
    });
};
