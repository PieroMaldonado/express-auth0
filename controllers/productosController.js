var conexion = require('../config/conexion.js');
var producto = require('../model/producto');
var borrar = require("fs");
const { validationResult } = require('express-validator');
var categoria = require('../model/categoria');

module.exports={
    index:function (req,res){
        producto.obtener(conexion, function(err,datos){
            categoria.obtener(conexion, function(err, datos2){
                res.render('productos/index', {title: 'Aplicación', productos: datos, categorias: datos2});
            })
            // res.render('productos/index', {title: 'Aplicación', productos: datos});
        });
    },
    crear:function (req,res){
        categoria.obtener(conexion, function(err, datos2){
            res.render('productos/crear', {categorias: datos2});
        })
    },
    guardar:function (req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            });
            res.render('productos/crear', {messages: req.flash()});
            return;
        }
        producto.insertar(conexion, req.body, function(err){
            res.redirect('/productos');
        });
    },
    eliminar:function (req,res){
        console.log("Recepción de datos");
        console.log(req.params.id);
        producto.retornarDatosID(conexion,req.params.id, function(err,registros){
            producto.borrar(conexion, req.params.id, function(err){
                res.redirect('/productos');
            });
        });
    },
    editar:function(req,res){
        producto.retornarDatosID(conexion,req.params.id,function(err,registros){
            categoria.obtener(conexion, function(err, datos2){
                res.render('productos/editar', {producto:registros[0], categorias:datos2}); 
            })
        });
    },
    actualizar:function(req,res){
        console.log(req.body)
        if(req.body.nombre){
            producto.actualizar(conexion, req.body, function(err){});
        }
        res.redirect('/productos');
    }
}