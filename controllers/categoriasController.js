var conexion = require('../config/conexion.js');
var categoria = require('../model/categoria');
var borrar = require("fs");
const { validationResult } = require('express-validator');

module.exports={
    index:function (req,res){
        categoria.obtener(conexion, function(err,datos){
            res.render('categorias/index', {title: 'Aplicación', categorias: datos });
        });
    },
    crear:function (req,res){
        res.render('categorias/crear');
    },
    guardar:function (req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            });
            res.render('categorias/crear', {messages: req.flash()});
            return;
        }
        categoria.insertar(conexion, req.body, function(err){
            res.redirect('/categorias');
        });
    },
    eliminar:function (req,res){
        console.log("Recepción de datos");
        console.log(req.params.id);
        categoria.retornarDatosID(conexion,req.params.id, function(err,registros){
            categoria.borrar(conexion, req.params.id, function(err){
                res.redirect('/categorias');
            });
        });
    },
    editar:function(req,res){
        categoria.retornarDatosID(conexion,req.params.id,function(err,registros){
            //console.log(registros[0]);
            res.render('categorias/editar', {categoria:registros[0]});
        });
    },
    actualizar:function(req,res){
        if(req.body.nombre){
            categoria.actualizar(conexion, req.body, function(err){});
        }
        res.redirect('/categorias');
    }
}