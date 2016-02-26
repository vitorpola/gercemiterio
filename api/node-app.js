var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var database = "gerenciador_cemiterio";

var port = process.env.PORT || 3000;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


var connection  = mysql.createConnection({
    user: 'root',
    password: 'vpola',
    host: '127.0.0.1',
    post: 3306,
    multipleStatements: true
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log("Error connecting database ... nn" + err);    
    }
});


connection.query('use '+database);

app.get("/tipos",function(req,res){
    connection.query('SELECT * FROM tipo_tumulo', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/titular/cpf=:cpf",function(req,res){
    connection.query('SELECT * FROM titular WHERE cpf like "'+ req.params.cpf+'"', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/cemiterios",function(req,res){
    connection.query('SELECT * FROM cemiterio', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/numTumulos",function(req,res){
    connection.query('SELECT numero FROM tumulo' , function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/numTumulos/cemiterio=:cemiterio&quadra=:quadra",function(req,res){
    connection.query('SELECT numero FROM tumulo where idCemiterio = ' + req.params.cemiterio + ' and quadra = "'+ req.params.quadra + '"', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/numTumulos/cemiterio=:cemiterio",function(req,res){
    connection.query('SELECT numero FROM tumulo where idCemiterio = ' + req.params.cemiterio, function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/numTumulos/quadra=:quadra",function(req,res){
    connection.query('SELECT numero FROM tumulo where quadra = "'+ req.params.quadra + '"', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});




app.get("/tipos/:id",function(req,res){
    connection.query('SELECT * FROM tipo_tumulo where idTipo =' + req.params.id, function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.get("/tumulo/id=:id",function(req,res){
    var query = "SELECT * " +
                'FROM tumulo '+
                'WHERE idTumulo = '+ req.params.id;
    connection.query(query , function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.' + err);
    });
});


app.post("/tumulos", function(req,res){
    var tumulo = req.body;
    var falecidos = req.body.falecidos;
    var titulares = req.body.titulares;
    var idTumulo = 0;
    var cad_tumulo = "";
    var cad_titular= "";
    
    cad_tumulo = "INSERT INTO tumulo SET " + 
                    "idSituacao = 3, "+
                    "idCemiterio = " + tumulo.cemiterio.idCemiterio + ", " + 
                    "idTipo = " + tumulo.tipo.idTipo + ", " + 
                    "numero = " + tumulo.numero + ", " + 
                    "quadra = '" + tumulo.quadra + "' ";
    if(typeof tumulo.foto != 'undefined')
        cad_tumulo += ", foto = '" + tumulo.foto + "'  ";
        
    connection.query(cad_tumulo , function(err, rows, fields) {
        if (!err){
            console.log('Query executada ' + cad_tumulo);
            idTumulo = rows.insertId;
            for(i=0;i<titulares.length;i++){
                if(typeof titulares[i].cpf != 'undefined'){
                    cad_titular += "INSERT INTO tumulo_titular SET " + 
                                    "idTitular = " + titulares[i].idTitular + ", " + 
                                    "idTumulo = " + idTumulo + ";";
                }
            } 
            connection.query(cad_titular , function(err, rows, fields) {
                if (!err){
                    console.log('Query executada ' + cad_titular);
                    if(falecidos.length > 0 ){
                        var cad_falecido= "";
                        for(var i=0;i<falecidos.length;i++){
                            cad_falecido = cad_falecido + "INSERT INTO falecido SET " + 
                                            "nome = '" + falecidos[i].nome + "', " + 
                                            "nascimento =  DATE('" + _formatData(falecidos[i].nascimento) + "'), " + 
                                            "falecimento =   DATE('" +  _formatData(falecidos[i].falecimento) + "'), " + 
                                            "idTumulo = " + idTumulo + " ;";
                        }    
                        connection.query(cad_falecido , function(err, rows, fields) {
                            if (!err){ res.json(true);}
                            else {res.json(false);console.log('Error while performing Query.\t' + err);}
                        });
                    }else{res.json(true);}
                }else{res.json(false);console.log('Error while performing Query.\t' + err);} 
            });
        }else{res.json(false);console.log('Error while performing Query.\t' + err);} 
    });    
});


var _formatData= function (valor){
    var data = valor.split('/');
    return data[2]+'-'+data[1]+'-'+data[0];
}

app.get("/tumulos",function(req,res){
    var query = "SELECT * " +
                'FROM tumulo ';
    connection.query(query , function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }else
            console.log('Error while performing Query.' + err);
    });
});


app.listen(port, function(){
    console.log('Servidor rodando');
});
