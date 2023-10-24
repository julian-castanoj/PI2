import React, { useState } from 'react';
import '../styles/inicio.css';

const Inicio = ({ onLogin, loggedIn }) => {
  const [username, setUsername] = useState('root');
  const [password, setPassword] = useState('root');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    if (username === 'root' && password === 'root') {
      onLogin(true); // Intentando llamar a onLogin
      console.log('Inicio de sesión exitoso');
    } else {
      console.error('Error al iniciar sesión');
    }
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Iniciar Sesión</h2>
      {!loggedIn ? ( // Muestra el formulario solo si no ha iniciado sesión
        <form>
          <div className="form-group">
            <label>Usuario</label>
            <input
              className="search-input"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              className="search-input"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" className="register-button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </form>
      ) : (
        <p>¡Has iniciado sesión con éxito!</p>
      )}
    </div>
  );
};

export default Inicio;



    
  
 /* import React, { useState } from 'react';
import '../styles/inicio.css';

const Inicio = ({ onLogin, loggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === 'username') {
        setUsername(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const userConfirmed = window.confirm('¿Estás seguro de que deseas iniciar sesión?');
  
      if (userConfirmed) {
        const data = {
          username: username,
          password: password,
        };
  
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
  
        try {
          const response = await fetch('http://localhost:3000/login', requestOptions);
  
          if (response.ok) {
            console.log('Inicio de sesión exitoso');
            onLogin(true); 
          } else {
            console.error('Error al iniciar sesión');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      } else {
        console.log('Inicio de sesión cancelado');
      }
    };
  
    return (
      <div className="registrar-miembros-page">
        <h2>Iniciar Sesión</h2>
        {!loggedIn ? ( 
          <form>
            <div className="form-group">
              <label>Usuario</label>
              <input
                className="search-input"
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                className="search-input"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="register-button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </form>
        ) : (
          <p>¡Has iniciado sesión con éxito!</p>
        )}
      </div>
    );
  };
  

export default Inicio;*/
  

 
