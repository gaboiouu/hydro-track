import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import PanelPrincipal from './components/PanelPrincipal';
import Login from './components/Login';
import './App.css';

const App: React.FC = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [consumoDiario, setConsumoDiario] = useState<number>(0);
  const [metaDiaria, setMetaDiaria] = useState<number | null>(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const consumoGuardado = localStorage.getItem('consumoDiario');
    const metaGuardada = localStorage.getItem('metaDiaria');
    if (usuarioGuardado) setUsuario(usuarioGuardado);
    if (consumoGuardado) setConsumoDiario(Number(consumoGuardado));
    if (metaGuardada) setMetaDiaria(Number(metaGuardada));
  }, []);

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/configuracion" element={usuario ? <ConfiguracionUsuario metaDiaria={metaDiaria} setMetaDiaria={setMetaDiaria} /> : <Navigate to="/login" />} />
        <Route path="/panel" element={usuario ? <PanelPrincipal consumoDiario={consumoDiario} setConsumoDiario={setConsumoDiario} metaDiaria={metaDiaria ?? 0} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={usuario ? "/configuracion" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;