from flask import Flask, jsonify , request 
import mysql.connector
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

@app.route('/pregistros', methods=['GET'] )
def ver_pregistros():
    db = mysql.connector.connect(
        host='localhost',
        user='root', 
        password='root', 
        database='tecnocgp' 
    )
    
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pregistros")
    
    pregistros = cursor.fetchall()
    
    cursor.close()
    return jsonify(pregistros)

@app.route('/eliminar_pregistro/<int:id>', methods=['DELETE'] )
def eliminar_p(id):
    db = mysql.connector.connect(
        host='localhost',
        user='root', 
        password='root',
        database='tecnocgp'
    )
    
    cursor = db.cursor()
    cursor.execute("DELETE FROM pregistros WHERE id = %s",(id,))
    db.commit() 
    cursor.close()
    return jsonify({"mensaje":"Usuario ELIMINADO!"})

@app.route('/nuevo_pregistro', methods=['POST'] )
def agregar_pregistro():
    info = request.json
    db = mysql.connector.connect(
        host='localhost',
        user='root', 
        password='root', 
        database='tecnocgp'
    )
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO pregistros (usuario,nombre,clave) VALUES (%s,%s,%s)", (info["usuario"],info["nombre"],info["clave"]))
    db.commit() 
    cursor.close()
    return jsonify({"mensaje":"Usuario AGREGADO CON EXITO!"})

@app.route('/actualizar_pregistro/<int:id>', methods=['PUT'] )
def modificar_pregistro(id):
    info = request.json
    db = mysql.connector.connect(
        host='localhost',
        user='root', 
        password='root',
        database='tecnocgp'
    )
    
    cursor = db.cursor()
    cursor.execute("UPDATE pregistros SET usuario = %s , nombre = %s, clave = %s WHERE id = %s", (info["usuario"],info["nombre"],info["clave"],id))
    db.commit() 
    cursor.close()
    return jsonify({"mensaje":"Usuario ACTUALIZADO CON EXITO!"})

if __name__ == '__main__':
    app.run(debug=True)