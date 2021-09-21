CREATE DATABASE Titulacion;

USE Titulacion;

--USERS TABLE
CREATE TABLE Usuarios(
    Correo VARCHAR(100) NOT NULL,
    Contrasena VARCHAR(60) NOT NULL,
    Tipo_De_Usuario VARCHAR(50) NOT NULL
);

ALTER TABLE Usuarios ADD PRIMARY KEY (Correo);

ALTER TABLE Usuarios MODIFY Correo VARCHAR(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE Usuarios;

--TABLES
CREATE TABLE Usuario_Alumnos(
    Nombre VARCHAR(100) NOT NULL,
    Boleta INT(11) NOT NULL,
    Telefono VARCHAR(25) NOT NULL,
    Correo_Alumno VARCHAR(100) NOT NULL,
    URL VARCHAR(100),
    Edad int(4) NOT NULL,
    Colonia VARCHAR(100) NOT NULL,
    CP INT(10) NOT NULL,
    Situacion_Academica VARCHAR(100) NOT NULL,
    Ocupacion VARCHAR(100) NOT NULL,
    Empresa VARCHAR(100) NOT NULL,
    Semestre int(3) NOT NULL,
    Carrera VARCHAR(100) NOT NULL,
    Especialidad VARCHAR(100) NOT NULL,
    Contrasena VARCHAR(100) NOT NULL,
    Estatus VARCHAR(100) NOT NULL,  

    CONSTRAINT fk_correo FOREIGN KEY(Correo_Alumno) REFERENCES Usuarios(Correo)
);

ALTER TABLE Usuario_Alumnos
    ADD PRIMARY KEY(Boleta);

CREATE TABLE Usuario_Profe(
    Correo_Profe VARCHAR(100) NOT NULL,
    Nombre VARCHAR(60) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    id_profe INT(11) NOT NULL,

    CONSTRAINT fk_correo_profe FOREIGN KEY(Correo_Profe) REFERENCES Usuarios(Correo)
);

ALTER TABLE Usuario_Profe
    ADD PRIMARY KEY(id_profe);

ALTER TABLE Usuario_Profe
    MODIFY id_profe INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE Usuario_Admin(
    Correo_admin VARCHAR(100) NOT NULL,
    Nombres VARCHAR(60) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    id_admin INT(11) NOT NULL,

    CONSTRAINT fk_correo_admin FOREIGN KEY(Correo_admin) REFERENCES Usuarios(Correo)
);

ALTER TABLE Usuario_Admin 
    ADD PRIMARY KEY(id_admin);

ALTER TABLE Usuario_Admin
    MODIFY id_admin INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE Usuario_Admin,Usuario_Alumnos,Usuario_Profe,Usuarios;