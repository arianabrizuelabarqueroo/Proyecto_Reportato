import React, { useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'

import RegisterFrequentCustomer from './loyalty/RegisterFrequentCustomer'
import PurchaseHistory from './loyalty/PurchaseHistory'
import FrequentCustomerReport from './loyalty/FrequentCustomerReport'
import AssignLoyaltyPoints from './loyalty/AssignLoyaltyPoints'
import CheckLoyaltyPoints from './loyalty/CheckLoyaltyPoints'
import ApplyDiscount from './loyalty/ApplyDiscount'

const LoyaltyModule = () => {
  const [screen, setScreen] = useState('menu') // 'menu', 'register', etc.

  const renderScreen = () => {
    switch (screen) {
      case 'register':
        return <RegisterFrequentCustomer />
      case 'history':
        return <PurchaseHistory />
      case 'report':
        return <FrequentCustomerReport />
      case 'assign':
        return <AssignLoyaltyPoints />
      case 'check':
        return <CheckLoyaltyPoints />
      case 'discount':
        return <ApplyDiscount />
      default:
        return renderMenu()
    }
  }

  const renderMenu = () => (
    <div className="container mt-4">
      <h2 className="mb-4">Modulo de Lealtad</h2>
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Registrar Cliente frecuente</Card.Title>
              <Card.Text>Formulario para registrar clientes frecuentes y brindarles beneficios.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('register')} 
                      style= {{backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white"}}>Ir al Formulario</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Historial de compras</Card.Title>
              <Card.Text>Ver de manera detallada el registro de compras de un cliente para personalizar ofertas.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('history')} 
                      style= {{backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white"}}>Ver el Historial</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Reporte de clientes frecuentes</Card.Title>
              <Card.Text>Generar reportes basados en las metricas del programa de cliente frecuente.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('report')} 
                      style= {{backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white"}}>Generar reporte</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Asignar puntos de Lealtad</Card.Title>
              <Card.Text>Se asignan puntos de lealtad al cliente luego de una compra.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('assign')} 
                      style= {{backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white"}}>Asignar puntos</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Ver puntos de lealtad</Card.Title>
              <Card.Text>Consulta por los puntos de lealtad actuales del cliente.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('check')} 
                      style= {{backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white"}}>Verificar puntos</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Aplicar descuento</Card.Title>
              <Card.Text>Aplica el descuento automaticamente basado en los puntos de lealtad habiles.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('discount')} 
                      style= {{backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white"}}>Aplicar descuento</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )

  return <>{renderScreen()}</>
}

export default LoyaltyModule
