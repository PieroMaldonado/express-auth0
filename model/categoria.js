module.exports={
    obtener:function(conexion,funcion){
        conexion.query("SELECT * FROM categorias", funcion);
    },
    insertar:function(conexion, datos, funcion){
        conexion.query("INSERT INTO categorias (categoria) VALUES (?)",[datos.categoria], funcion);
    },
    retornarDatosID:function(conexion, id, funcion){
        conexion.query("SELECT * FROM categorias WHERE id=?",[id], funcion);
    },
    borrar:function(conexion, id, funcion){
        conexion.query("DELETE FROM categorias WHERE id=?",[id], funcion);
    },
    actualizar:function(conexion, datos, funcion){
        conexion.query("UPDATE productos SET categoria=? WHERE id=?",[datos.categoria], funcion);
    }
}