import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PanelPrincipalProps } from '../types/type';

const PanelPrincipal: React.FC<PanelPrincipalProps> = ({ consumoDiario, setConsumoDiario, metaDiaria, handleLogout }) => {
  const [cantidad, setCantidad] = useState<number>(0);
  const navigate = useNavigate();

  const registrarConsumo = () => {
    setConsumoDiario(consumoDiario + cantidad);
    setCantidad(0); // Reiniciar el campo de entrada
  };

  const cerrarSesion = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Panel Principal</h2>
      <div>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          placeholder="Cantidad en ml"
        />
        <button onClick={registrarConsumo}>Registrar</button>
      </div>
      <div>
        <h3>Total consumido hoy: {consumoDiario} ml</h3>
        {consumoDiario >= metaDiaria ? (
          <p>¡Has alcanzado tu meta diaria!</p>
        ) : (
          <p>Aún no has alcanzado tu meta diaria.</p>
        )}
      </div>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
};

export default PanelPrincipal;