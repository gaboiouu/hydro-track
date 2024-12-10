import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../types/type';

const Login: React.FC<LoginProps> = ({ setUsuario }) => {
  const [nombre, setNombre] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar usuarios en localStorage
    const usuarios = [
      { nombre: 'aaron', contrasena: '123' },
      { nombre: 'gabriel', contrasena: '1234' },
      { nombre: 'johan', contrasena: '12345' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setNombre(usuarioGuardado);
      setUsuario(usuarioGuardado);
      navigate('/configuracion');
    }
  }, [setUsuario, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: { nombre: string; contrasena: string }) => u.nombre === nombre && u.contrasena === contrasena);

    if (usuario) {
      localStorage.setItem('usuario', nombre);
      setUsuario(nombre);
      navigate('/configuracion');
    } else {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;