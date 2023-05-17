module.exports={
    obtener:function(conexion,funcion){
        conexion.query("SELECT * FROM mesas", funcion);
    },
    insertar:function(conexion, datos, funcion){
        conexion.query("INSERT INTO mesas (numeroMesa, ubicacionReferencia, estado, capacidad) VALUES (?,?,?,?)",[datos.numeroMesa, 
        datos.ubicacionReferencia, datos.estado, datos.capacidad], funcion);
    },
    retornarDatosID:function(conexion, id, funcion){
        conexion.query("SELECT * FROM mesas WHERE id=?",[id], funcion);
    },
    borrar:function(conexion, id, funcion){
        conexion.query("DELETE FROM mesas WHERE id=?",[id], funcion);
    },
    actualizar:function(conexion, datos, funcion){
        conexion.query("UPDATE mesas SET numeroMesa=?,ubicacionReferencia=?,estado=?,capacidad=? WHERE id=?",[datos.numeroMesa, 
        datos.ubicacionReferencia, datos.estado, datos.capacidad, datos.id], funcion);
    }
}