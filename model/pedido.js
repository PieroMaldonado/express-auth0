module.exports={
    obtener:function(conexion,funcion){
        conexion.query("SELECT * FROM pedidos", funcion);
    },
    insertar:function(conexion, datos, funcion){
        conexion.query("INSERT INTO pedidos (reservaID, productoID) VALUES (?,?)",[datos.reservaID, 
        datos.productoID], funcion);
    },
    retornarDatosID:function(conexion, id, funcion){
        conexion.query("SELECT * FROM pedidos WHERE id=?",[id], funcion);
    },
    borrar:function(conexion, id, funcion){
        conexion.query("DELETE FROM pedidos WHERE id=?",[id], funcion);
    },
    actualizar:function(conexion, datos, funcion){
        conexion.query("UPDATE pedidos SET reservaID=?,productoID=? WHERE id=?",[datos.reservaID, 
        datos.productoID], funcion);
    }
}