import mysql.connector

conexion = mysql.connector.connect(user='root', password='root',
                                    host='localhost',
                                    database='tecnocgp'
                                    )
print(conexion)