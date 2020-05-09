# employee-management

a [Sails v1](https://sailsjs.com) application

## Installation

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)
  .

### Version info

This app was originally generated on Tue May 05 2020 16:43:16 GMT+0530 (India Standard Time) using Sails v1.2.3.

## step1: configure datastores.js according to your system

```python
{
    adapter:'sails-postgresql',
    host:'localhost',
    user:'postgres',
    password:'1234',
    database:'employees'
}

```

## Step2: go to this Route to Register Manager on Postman.

`"POST /manager/signup": { action: "manager/signup", csrf: false }`

## you can use this json data to register the Manager.

```python
{
	"name":"rohan",
	"email":"rohanshrivastav@gmail.com",
	"phoneNumber":"7056975747",
	"password":"rohan2099"
}
```

## Step3: go to login route to generate JWT token

login with valid email and password

```
{
	"email":"rohanshrivastav@gmail.com",
	"password":"rohan2099"
}

"POST /manager/login": { action: "manager/login", csrf: false },

```

## step4: include Token in Authorization Header in Postman in order to access the Following Routes of Employees.

```
  "POST /employee/create": { action: "employee/create", csrf: false },
  "GET /employee/getAllEmployees": {action: "employee/getallEmployees",csrf: false,},
  "PUT /employee/update/:employeeId": {action: "employee/update",csrf: false,},
  "DELETE /employee/delete/:employeeId": {action: "employee/delete",csrf: false,},
```

## POSTMAN ROUTES:

```
http://localhost:1337/manager/signup,
localhost:1337/manager/login
localhost:1337/employee/create
localhost:1337/employee/getAllEmployees
localhost:1337/employee/update/2
localhost:1337/employee/delete/8
```
