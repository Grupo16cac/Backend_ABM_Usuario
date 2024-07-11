El programa corre en forma local, correr el programa app.py ,luego llamar al fronend y se podra trabajar en las altas 
bajas y modificaciones de usuarios, .  El proposito del mismo  es dar de alta usuarios y asignarles una password.
Se dejo la archivo createtabla.txt para la creacion de la bbdd y su correspondiente tabla.

Aclaracion.
El programa conexion.py, no cumple ninguna funcion en el backend, solo se utilizo para la comprobacion de la conexion 
a la bbdd desde python.

se deberan intalar las librerias:
pip install mysql-connector-python
python.exe -m pip install --upgrade pip
pip install Flask
pip install flask-cors
pip install Werkzeug

createtabla.txt

La bbdd se llama tecnocgp
CREATE TABLE IF NOT EXISTS pregistros (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario VARCHAR(8) NOT NULL,
nombre VARCHAR(20) NOT NULL,
clave VARCHAR(10) NOT NULL );

