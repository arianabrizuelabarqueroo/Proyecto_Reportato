-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS REPORTATO;
USE REPORTATO;

-- Tabla USUARIOS
CREATE TABLE IF NOT EXISTS USUARIOS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    ROL VARCHAR(50) NOT NULL,
    CORREO VARCHAR(50) NOT NULL UNIQUE,
    CONTRASENA CHAR(60) NOT NULL
);

-- Tabla DASHBOARD
CREATE TABLE IF NOT EXISTS DASHBOARD (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    REPORTE VARCHAR(250) NOT NULL,
    FECHA DATETIME NOT NULL
);

-- Tabla PROVEEDORES
CREATE TABLE IF NOT EXISTS PROVEEDORES (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CEDULA BIGINT,
    NOMBRE VARCHAR(100) NOT NULL,
    CORREO VARCHAR(100) NOT NULL,
    TELEFONO VARCHAR(10)
);

-- Tabla INVENTARIO
CREATE TABLE IF NOT EXISTS INVENTARIO (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    CATEGORIA VARCHAR(100) NOT NULL,
    DESCRIPCION TEXT,
    CANTIDAD INT NOT NULL DEFAULT 0,
    PRECIO DECIMAL(10,2) NOT NULL,
    ID_PROVEEDOR INT,
    FOREIGN KEY (ID_PROVEEDOR) REFERENCES PROVEEDORES(ID)
);

-- Tabla VENTAS
CREATE TABLE IF NOT EXISTS VENTAS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PRODUCTOS VARCHAR(100) NOT NULL,
    PRECIO DECIMAL(10,2),
    DESCUENTO DECIMAL(10,2),
    TOTAL DECIMAL(10,2),
    USUARIO INT,
    FOREIGN KEY (USUARIO) REFERENCES USUARIOS(ID)
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

-- Insertar datos en PROVEEDORES
INSERT INTO PROVEEDORES (CEDULA, NOMBRE, CORREO, TELEFONO) VALUES
(123456789, 'Proveedor Uno', 'uno@proveedor.com', '3001234567'),
(987654321, 'Proveedor Dos', 'dos@proveedor.com', '3002345678'),
(456789123, 'Proveedor Tres', 'tres@proveedor.com', '3003456789'),
(789123456, 'Proveedor Cuatro', 'cuatro@proveedor.com', '3004567890'),
(321654987, 'Proveedor Cinco', 'cinco@proveedor.com', '3005678901'),
(741852963, 'Proveedor Seis', 'seis@proveedor.com', '3006789012'),
(852963741, 'Proveedor Siete', 'siete@proveedor.com', '3007890123'),
(963741852, 'Proveedor Ocho', 'ocho@proveedor.com', '3008901234'),
(159357486, 'Proveedor Nueve', 'nueve@proveedor.com', '3009012345'),
(357159486, 'Proveedor Diez', 'diez@proveedor.com', '3000123456');

-- Insertar datos en INVENTARIO
INSERT INTO INVENTARIO (NOMBRE, CATEGORIA, DESCRIPCION, CANTIDAD, PRECIO, ID_PROVEEDOR) VALUES
('Teclado', 'Electrónica', 'Teclado mecánico RGB', 25, 120.50, 1),
('Mouse', 'Electrónica', 'Mouse gamer inalámbrico', 40, 80.99, 2),
('Monitor 24"', 'Pantallas', 'Monitor LED Full HD', 15, 200.00, 3),
('Silla ergonómica', 'Muebles', 'Silla de oficina con soporte lumbar', 10, 350.00, 4),
('Laptop', 'Computación', 'Laptop Core i7 16GB RAM', 8, 999.99, 5),
('Hub USB', 'Accesorios', 'Concentrador USB 3.0', 50, 25.75, 6),
('Impresora', 'Oficina', 'Impresora láser monocromática', 12, 150.00, 7),
('Disco Duro', 'Almacenamiento', 'HDD 1TB SATA', 30, 60.45, 8),
('SSD', 'Almacenamiento', 'SSD 512GB NVMe', 20, 120.00, 9),
('Webcam', 'Accesorios', 'Cámara web Full HD con micrófono', 18, 45.30, 10);

-- Insertar datos en VENTAS
INSERT INTO VENTAS (PRODUCTOS, PRECIO, DESCUENTO, TOTAL, USUARIO) VALUES
('Lechuga', 120.50, 10.00, 110.50, 1),
('Tomate', 80.99, 0.00, 80.99, 2),
('Zanahoria', 200.00, 20.00, 180.00, 3),
('Limon', 350.00, 50.00, 300.00, 4),
('Naranja', 999.99, 100.00, 899.99, 5),
('Cebolla', 25.75, 5.75, 20.00, 6),
('Papaya', 150.00, 15.00, 135.00, 7),
('Papas', 60.45, 10.45, 50.00, 8),
('Yuca', 120.00, 20.00, 100.00, 9),
('Repollo', 45.30, 5.30, 40.00, 10);

-- Insertar datos en DASHBOARD
INSERT INTO DASHBOARD (REPORTE, FECHA) VALUES
('Ventas del día', NOW()),
('Inventario actualizado', NOW()),
('Proveedores activos', NOW()),
('Ventas por categoría', NOW()),
('Productos más vendidos', NOW()),
('Usuarios registrados', NOW()),
('Balance mensual', NOW()),
('Reporte de devoluciones', NOW()),
('Estado de cuentas', NOW()),
('Resumen financiero', NOW());
