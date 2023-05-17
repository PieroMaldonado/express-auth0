module.exports={
    obtener:function(conexion,funcion){
        conexion.query("SELECT * FROM reservas", funcion);
    },
    insertar:function(conexion, datos, funcion){
        conexion.query("INSERT INTO reservas (fecha, hora, numPersonas, mesaID, clienteID) VALUES (?,?,?,?,?)",[datos.fecha, 
        datos.hora, datos.numPersonas, datos.mesaID, datos.clienteID], funcion);
    },
    retornarDatosID:function(conexion, id, funcion){
        conexion.query("SELECT * FROM reservas WHERE id=?",[id], funcion);
    },
    borrar:function(conexion, id, funcion){
        conexion.query("DELETE FROM reservas WHERE id=?",[id], funcion);
    },
    actualizar:function(conexion, datos, funcion){
        conexion.query("UPDATE reservas SET fecha=?,hora=?,numPersonas=?,mesaID=?,clienteID=? WHERE id=?",[datos.fecha, 
        datos.hora, datos.numPersonas, datos.mesaID, datos.clienteID, datos.id], funcion);
    }
}