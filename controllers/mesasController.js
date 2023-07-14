const conexion = require('../config/conexion.js');
const mesa = require('../model/mesa');
const borrar = require("fs");
const { validationResult } = require('express-validator');

module.exports={
    index:function (req,res){
        mesa.obtener(conexion, function(err,datos){
            res.render('mesas/index', {title: 'Aplicación', req, mesas: datos });
        });
    },
    crear:function (req,res){
        res.render('mesas/crear');
    },
    guardar:function (req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            });
            res.render('mesas/crear', {messages: req.flash()});
            return;
        }
        mesa.insertar(conexion, req.body, function(err){
            res.redirect('/mesas');
        });
    },
    eliminar:function (req,res){
        mesa.retornarDatosID(conexion,req.params.id, function(err,registros){
            mesa.borrar(conexion, req.params.id, function(err){
                res.redirect('/mesas');
            });
        });
    },
    editar:function(req,res){
        mesa.retornarDatosID(conexion,req.params.id,function(err,registros){
            res.render('mesas/editar', {mesa:registros[0]});
        });
    },
    actualizar:function(req,res){
        if(req.body.numeroMesa){
            mesa.actualizar(conexion, req.body, function(err){});
        }
        res.redirect('/mesas');
    }
}