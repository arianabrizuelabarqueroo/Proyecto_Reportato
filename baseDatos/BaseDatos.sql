-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS REPORTATO;
USE REPORTATO;

-- Crear tabla de usuarios con ENUM corregido
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  rol ENUM('Administrador', 'Organizador', 'Usuario') DEFAULT 'Usuario',
  contrasena VARCHAR(100) NOT NULL,
  contrasena_temporal BOOLEAN DEFAULT TRUE
);

INSERT INTO USUARIOS (nombre, correo, rol, contrasena)
VALUES ('Usuario', 'usuario@correo.com', 'Usuario', 'usuario');


-- Crear tabla de proveedores
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

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS PRODUCTOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    unidad_medida VARCHAR(20) DEFAULT 'kg',
    descripcion TEXT,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de inventario
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

CREATE TABLE IF NOT EXISTS FIDELIZACION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    fecha_afiliacion DATE,
    categoria VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS COMPRAS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    proveedor_id INT NOT NULL,
    fecha_realizada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    producto_id INT NOT NULL,
    precio_unitario DECIMAL(10,2) DEFAULT 0.00,
    cantidad_producto DECIMAL (10,2) DEFAULT 1.00,
    total DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (usuario_id) REFERENCES USUARIOS(id) ON DELETE CASCADE,
    FOREIGN KEY (proveedor_id) REFERENCES PROVEEDORES(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES PRODUCTOS(id) ON DELETE CASCADE
);

-- Crear tabla de Sucursales/Puntos de Ventasucursales
CREATE TABLE IF NOT EXISTS sucursales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  tipo ENUM('verdulería', 'exportación', 'feria', 'mayorista') NOT NULL DEFAULT 'verdulería',
  ubicacion VARCHAR(500) NOT NULL,
  estado ENUM('activa', 'inactiva') NOT NULL DEFAULT 'activa',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tipo (tipo),
  INDEX idx_estado (estado),
  INDEX idx_nombre (nombre)
);

-- Insertar usuarios
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

-- Insertar productos
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

-- Insertar inventario
INSERT INTO INVENTARIO (producto_id, stock_actual, stock_minimo, precio_unitario, fecha_ingreso, fecha_vencimiento) VALUES
(1, 50, 10, 2.50, '2024-01-15', '2024-02-15'),
(2, 30, 5, 1.80, '2024-01-16', '2024-03-16');

-- Insertar proveedores
INSERT INTO PROVEEDORES (nombre, empresa, telefono, email, direccion, ciudad, tipo_proveedor) VALUES 
('Juan Carlos Mendez', 'Frutas y Verduras El Campo', '+506 8888-1111', 'juan@elcampo.com', 'San José Centro, Avenida Central', 'San José', 'Mayorista'),
('María Elena Vargas', 'Distribuidora Verde Fresco', '+506 8888-2222', 'maria@verdefresco.com', 'Cartago, Mercado Central', 'Cartago', 'Distribuidor'),
('Roberto Solís', 'Productos Agrícolas Solís', '+506 8888-3333', 'roberto@agrisolis.com', 'Alajuela, Zona Industrial', 'Alajuela', 'Productor'),
('Ana Lucía Rojas', 'Mercado Los Andes', '+506 8888-4444', 'ana@losandes.com', 'Heredia, Centro Comercial', 'Heredia', 'Minorista'),
('Carlos Jiménez', 'Finca Orgánica Jiménez', '+506 8888-5555', 'carlos@organica.com', 'Puntarenas, Finca El Progreso', 'Puntarenas', 'Productor'),
('Sofía Hernández', 'Distribuciones Hernández', '+506 8888-6666', 'sofia@dihernandez.com', 'Limón, Puerto Viejo', 'Limón', 'Distribuidor'),
('Diego Morales', 'Verduras Frescas Morales', '+506 8888-7777', 'diego@verdurasmorales.com', 'Guanacaste, Liberia Centro', 'Guanacaste', 'Mayorista'),
('Patricia Castro', 'Frutas Tropicales Castro', '+506 8888-8888', 'patricia@tropicales.com', 'San José, Pavas', 'San José', 'Productor');

INSERT INTO COMPRAS (usuario_id, proveedor_id, fecha_realizada, producto_id, precio_unitario, cantidad_producto, total) VALUES
(1,3,'2024-01-16',1,1.5,5,7.5),
(2,5,'2024-01-16',1,1.0,6,6.0);


-- Tabla para el registro de ventas diarias por punto de venta
CREATE TABLE ventas_diarias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sucursal_id INT NOT NULL,
  fecha_venta DATE NOT NULL,
  venta_efectivo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  venta_tarjeta DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  venta_sinpe DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  venta_total DECIMAL(12,2) GENERATED ALWAYS AS (venta_efectivo + venta_tarjeta + venta_sinpe) STORED,
  observaciones TEXT,
  estado ENUM('pendiente', 'confirmada', 'cerrada') NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  
  -- Índices
  INDEX idx_sucursal_fecha (sucursal_id, fecha_venta),
  INDEX idx_fecha (fecha_venta),
  INDEX idx_estado (estado),
  INDEX idx_sucursal (sucursal_id),
  
  -- Restricción única: una venta por sucursal por día
  UNIQUE KEY unique_sucursal_fecha (sucursal_id, fecha_venta)
);

-- Vista para facilitar consultas con información de sucursales
CREATE VIEW vista_ventas_diarias AS
SELECT 
  vd.id,
  vd.sucursal_id,
  s.nombre as sucursal_nombre,
  s.tipo as sucursal_tipo,
  s.ubicacion as sucursal_ubicacion,
  vd.fecha_venta,
  vd.venta_efectivo,
  vd.venta_tarjeta,
  vd.venta_sinpe,
  vd.venta_total,
  vd.observaciones,
  vd.estado,
  vd.created_at,
  vd.updated_at
FROM ventas_diarias vd
INNER JOIN sucursales s ON vd.sucursal_id = s.id
ORDER BY vd.fecha_venta DESC, s.nombre;


ALTER TABLE usuarios ADD COLUMN contrasena_temporal BOOLEAN DEFAULT TRUE;