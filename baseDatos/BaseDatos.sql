Create database REPORTATO;

USE REPORTATO;


-- Crear tabla PROVEEDORES
CREATE TABLE IF NOT EXISTS PROVEEDORES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    empresa VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    ciudad VARCHAR(50),
    tipo_proveedor ENUM('Mayorista', 'Minorista', 'Productor', 'Distribuidor') DEFAULT 'Mayorista',
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS USUARIOS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    ROL VARCHAR(50) NOT NULL,
    CORREO VARCHAR(50) NOT NULL UNIQUE,
    CONTRASENA CHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS PRODUCTOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    unidad_medida VARCHAR(20) DEFAULT 'kg',
    descripcion TEXT,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS INVENTARIO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    stock_actual INT DEFAULT 0,
    stock_minimo INT DEFAULT 0,
    precio_unitario DECIMAL(10,2) DEFAULT 0.00,
    fecha_ingreso DATE,
    fecha_vencimiento DATE NULL,
    estado ENUM('Disponible', 'Stock Bajo', 'Agotado') DEFAULT 'Disponible',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES PRODUCTOS(id) ON DELETE CASCADE
);


-- Insertar datos en USUARIOS
INSERT INTO USUARIOS (NOMBRE, ROL, CORREO, CONTRASENA) VALUES
('Carlos Pérez', 'Administrador', 'carlos@correo.com', '$2y$10$abcdefgHIJKLMNOpqrstuvWXyz1234567890abcdefgHIJKLMNO'),
('Laura Gómez', 'Organizador', 'laura@correo.com', '$2y$10$1111111111111111111111111111111111111111111111111111'),
('Andrés Silva', 'Usuario', 'andres@correo.com', '$2y$10$2222222222222222222222222222222222222222222222222222'),
('Marta Ruiz', 'Usuario', 'marta@correo.com', '$2y$10$3333333333333333333333333333333333333333333333333333'),
('Luis Torres', 'Organizador', 'luis@correo.com', '$2y$10$4444444444444444444444444444444444444444444444444444'),
('Ana López', 'Usuario', 'ana@correo.com', '$2y$10$5555555555555555555555555555555555555555555555555555'),
('Jorge Díaz', 'Administrador', 'jorge@correo.com', '$2y$10$6666666666666666666666666666666666666666666666666666'),
('Patricia Vega', 'Usuario', 'patricia@correo.com', '$2y$10$7777777777777777777777777777777777777777777777777777'),
('Gabriel Mena', 'Usuario', 'gabriel@correo.com', '$2y$10$8888888888888888888888888888888888888888888888888888'),
('Lucía Herrera', 'Organizador', 'lucia@correo.com', '$2y$10$9999999999999999999999999999999999999999999999999999');

-- Insertar datos en PRODUCTOS
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

INSERT INTO INVENTARIO (producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento) VALUES
(1, 50, 10, 2.50, '2024-01-15', '2024-02-15'),
(2, 30, 5, 1.80, '2024-01-16', '2024-03-16');

-- Insertar datos en PROVEEDORES
INSERT INTO PROVEEDORES (nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor) VALUES 
('Juan Carlos Mendez', 'Frutas y Verduras El Campo', '+506 8888-1111', 'juan@elcampo.com', 'San José Centro, Avenida Central', 'San José', 'Mayorista'),
('María Elena Vargas', 'Distribuidora Verde Fresco', '+506 8888-2222', 'maria@verdefresco.com', 'Cartago, Mercado Central', 'Cartago', 'Distribuidor'),
('Roberto Solís', 'Productos Agrícolas Solís', '+506 8888-3333', 'roberto@agrisolis.com', 'Alajuela, Zona Industrial', 'Alajuela', 'Productor'),
('Ana Lucía Rojas', 'Mercado Los Andes', '+506 8888-4444', 'ana@losandes.com', 'Heredia, Centro Comercial', 'Heredia', 'Minorista'),
('Carlos Jiménez', 'Finca Orgánica Jiménez', '+506 8888-5555', 'carlos@organica.com', 'Puntarenas, Finca El Progreso', 'Puntarenas', 'Productor'),
('Sofía Hernández', 'Distribuciones Hernández', '+506 8888-6666', 'sofia@dihernandez.com', 'Limón, Puerto Viejo', 'Limón', 'Distribuidor'),
('Diego Morales', 'Verduras Frescas Morales', '+506 8888-7777', 'diego@verdurasmorales.com', 'Guanacaste, Liberia Centro', 'Guanacaste', 'Mayorista'),
('Patricia Castro', 'Frutas Tropicales Castro', '+506 8888-8888', 'patricia@tropicales.com', 'San José, Pavas', 'San José', 'Productor');


