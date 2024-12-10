import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfiguracionUsuarioProps } from '../types/type';

const ConfiguracionUsuario: React.FC<ConfiguracionUsuarioProps> = ({ metaDiaria, setMetaDiaria }) => {
  const [meta, setMeta] = useState<string>(metaDiaria ? (metaDiaria / 1000).toString() : '2'); // Convertir ml a litros y a texto
  const navigate = useNavigate();

  useEffect(() => {
    const metaGuardada = localStorage.getItem('metaDiaria');
    if (metaGuardada) {
      setMeta((Number(metaGuardada) / 1000).toString()); // Convertir ml a litros y a texto
      setMetaDiaria(Number(metaGuardada));
    }
  }, [setMetaDiaria]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const metaEnMl = parseFloat(meta) * 1000; // Convertir litros a ml
    setMetaDiaria(metaEnMl);
    localStorage.setItem('metaDiaria', metaEnMl.toString());
    navigate('/panel');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Meta diaria de agua (litros):
          <input
            type="text"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ConfiguracionUsuario;