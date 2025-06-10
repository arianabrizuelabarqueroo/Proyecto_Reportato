Create database REPORTATO;
USE REPORTATO;

CREATE TABLE PRODUCTOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    unidad_medida VARCHAR(20) DEFAULT 'kg',
    descripcion TEXT,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO PRODUCTOS (nombre, categoria, unidad_medida, descripcion) VALUES
('Tomate', 'Verduras', 'kg', 'Tomate fresco'),
('Cebolla', 'Verduras', 'kg', 'Cebolla blanca'),
('Papa', 'Tubérculos', 'kg', 'Papa criolla'),
('Zanahoria', 'Verduras', 'kg', 'Zanahoria fresca'),
('Lechuga', 'Verduras', 'unidad', 'Lechuga crespa'),
('Plátano', 'Frutas', 'kg', 'Plátano maduro'),
('Manzana', 'Frutas', 'kg', 'Manzana roja'),
('Naranja', 'Frutas', 'kg', 'Naranja dulce'),
('Limón', 'Frutas', 'kg', 'Limón verde'),
('Cilantro', 'Hierbas', 'manojo', 'Cilantro fresco');