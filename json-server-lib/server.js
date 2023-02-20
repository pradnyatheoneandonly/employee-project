const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./employee.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

// Register New User


// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  const data = userdb.users.find((obj)=>obj.email==email && obj.password==password)
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token,data})
})

server.get('/employee', (req, res) => {
    console.log("get employee called");
    
   
    const userdb = JSON.parse(fs.readFileSync('./employee.json', 'UTF-8'))
    res.status(200).json(userdb.employees)
  })

  server.post('/employee', (req, res) => {
    console.log("save employee called; request body:");
    console.log(req.body);
    const {firstName, lastName,email,gender,phone,joinedDate} = req.body;
  
    
  fs.readFile("./employee.json", (err, data) => {  
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      };
  
      // Get current users data
      var data = JSON.parse(data.toString());
  
      // Get the id of last user
      var last_item_id = data && data.employees.length? data.employees[data.employees.length-1].id:0;
  
      //Add new user
      data.employees.push({id: last_item_id + 1, firstName: firstName, lastName: lastName,email:email,gender:gender,phone:phone,joinedDate:joinedDate}); //add some data
      var writeData = fs.writeFile("./employee.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
            const status = 401
            const message = err
            res.status(status).json({status, message})
            return
          }
      });
  });
  
  // Create token for new user
    let message = "record save successfully"
    res.status(200).json({message})
  })

  server.delete('/employee/:id', (req, res) => {
    console.log("delete employee called; request body:");
   
  
    const deleteId = req.params.id;

  fs.readFile("./employee.json", (err, data) => {  
       if (err) {
       const status = 401
         const message = err
        res.status(status).json({status, message})
        return
      };

    var data = JSON.parse(data.toString());

     // data.employees.splice(0,id);

      data.employees.splice(data.employees.findIndex(({id}) => id == deleteId), 1);
      var writeData = fs.writeFile("./employee.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
            const status = 401
            const message = err
            res.status(status).json({status, message})
            return
          }
      });
  });
  
  // Create token for new user
    let message = "record delete successfully"
    res.status(200).json({message})
  })

  server.put('/employee/:id', (req, res) => {
    console.log("edit employee called; request body:");
   
  
  var id = req.params.id;
  const {firstName, lastName,email,gender,phone,joinedDate} = req.body;
  console.log(firstName)
  fs.readFile("./employee.json", (err, data) => {  
       if (err) {
       const status = 401
         const message = err
        res.status(status).json({status, message})
        return
      };

    var data = JSON.parse(data.toString());

    const index = data.employees.findIndex(obj => {
        return obj.id == id;
      });
      console.log(index); // 👉️ 1
     
      data.employees[index].firstName=firstName,
      data.employees[index].lastName=lastName,
      data.employees[index].phone=phone,
      data.employees[index].gender=gender,
      data.employees[index].joinedDate=joinedDate,
      data.employees[index].email=email
      var writeData = fs.writeFile("./employee.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
            const status = 401
            const message = err
            res.status(status).json({status, message})
            return
          }
      });
  });
  
  // Create token for new user
    let message = "record updated successfully"
    res.status(200).json({message})
  })

  server.get('/chart', (req, res) => {
    console.log("chart called; request body:");
   
    const resultArr = [];
  fs.readFile("./employee.json", (err, data) => {  
    
       if (err) {
       const status = 401
         const message = err
        res.status(status).json({status, message})
        return
      };

    var data1 = JSON.parse(data.toString());

    let resultObj = {};
   data1.employees.forEach((item) => {
    const yr = item.joinedDate.split('-')[0];
    if (resultObj[yr]) {
      resultObj[yr] = resultObj[yr] + 1;
    } else {
      resultObj[yr] = 1;
    }
  });

  Object.entries(resultObj).forEach(([key, value]) => {
    resultArr.push({
      year: key,
      count: value
    })
  });

   res.status(200).json({resultArr})
     
  });
  
   
  })

 
  server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

     if (verifyTokenResult instanceof Error) {
       const status = 401
       const message = 'Access token not provided'
       res.status(status).json({status, message})
       return
     }
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})