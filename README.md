# ToDoApp

### Technologies 
* ReactJS 18 
* Laravel 8(PHP)
* PHPMyadmin (MySQL)

### I. Set up use Docker
##### 1. API

[API Readme.md](api/README.md)

##### 2. WEB

[Web Readme.md](web/README.md)
### II. Set up Instruction using Xampp 
* Make sure you have the following tool(s) installed: 
  * **npm/npx** and **node**
  * **php version 7.0** and **composer** 
  * **Xampp**
  
##### 1. After cloning this project from github, you should install the widget modules for "web" folder 
```
 ... Download $ cd ToDoApp/web
 .../ToDoApp/web $ npm install
```

##### 2. The "npm install" command will read .json package and automatically install. After installing, try "npm start"
```
 .../ToDoApp/web $ npm start 
```

##### 3. Installing the neccessary packages for "api" folder
```
 .../ToDoApp/web $ cd ../api
 .../ToDoApp/api $ composer install
```

##### 4. After installing the neccessary packages, rename the ".env.example" file into ".env" | or add a new file ".env" with the same content in ".env.example"
```
 .../ToDoApp/api $ (sudo) cp env.example .env
```
* Then, change DB_DATABASE corresponding to your database name (todoapp) in Xampp

##### 5. Migrate DB 
```
 .../ToDoApp/api $ php artisan migrate
```

##### 6. Laravel Passport
```
 .../ToDoApp/api $ php artisan passport:install
```

##### 7. Then create a APP_KEY. Finally, try "php artisan serve" 
```
 .../ToDoApp/api $ php artisan key:generate
 .../ToDoApp/api $ php artisan serve
```



