const bcryptjs = require('bcryptjs')

const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const {username, password} = req.body
      for(let i = 0; i < users.length; i++) {
        if(users[i].username === username) {
          if(bcryptjs.compareSync(password, users[i].password)) {
            let userData = {...users[i]}
            delete userData.password;
            res.status(200).send(userData)
            return 
          }   
          }
        }
        res.status(400).send("User not found.")
    },
    register: (req, res) => {
      console.log('Registering User')

      const {password} = req.body;

      const salt = bcryptjs.genSaltSync(5);
      const pinHash = bcryptjs.hashSync(password, salt);

      users.push({...req.body, password: pinHash})
      
      res.status(200).send(req.body)
    }
}