module.exports={
    obtener:function(conexion,funcion){
        conexion.query("SELECT * FROM clientes", funcion);
    },
    insertar:function(conexion, datos, funcion){
        conexion.query("INSERT INTO clientes (nombre, apellido, telefono, cedula, tipo_usuario) VALUES (?,?,?,?,?)",[datos.nombre, 
        datos.apellido, datos.telefono, datos.cedula, 2], funcion);
    },
    retornarDatosID:function(conexion, id, funcion){
        conexion.query("SELECT * FROM clientes WHERE id=?",[id], funcion);
    },
    borrar:function(conexion, id, funcion){
        conexion.query("DELETE FROM clientes WHERE id=?",[id], funcion);
    },
    actualizar:function(conexion, datos, funcion){
        conexion.query("UPDATE clientes SET nombre=?,apellido=?,telefono=?,cedula=?,tipo_usuario=? WHERE id=?",[datos.nombre, 
        datos.apellido, datos.telefono, datos.cedula, 2, datos.id], funcion);
    }
}