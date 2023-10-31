/*import React, { useState } from 'react';
import '../styles/inicio.css';

const Inicio = ({ onLogin }) => {
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

  const handleLogin = () => {

    const accessToken = 'your_access_token';

    if (accessToken) {
      
      localStorage.setItem('accessToken', accessToken);
      onLogin(true); 
      console.log('Inicio de sesión exitoso');
    } else {
      console.error('Error al iniciar sesión');
    }
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Iniciar Sesión</h2>
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
    </div>
  );
};

export default Inicio;*/
  
import React, { useState } from 'react';
import '../styles/inicio.css';

const Inicio = ({ onLogin, loggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregar estado para mostrar errores

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm('¿Estás seguro de que deseas iniciar sesión?');
  
    if (userConfirmed) {
      const data = {
        email: email,
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
        const response = await fetch('http://localhost:3000/auth/login', requestOptions);
  
        if (response.ok) {
          const responseData = await response.json();
          // Supongamos que el servidor devuelve un token de acceso
          const accessToken = responseData.access_token;
  
          // Guarda el token de acceso en localStorage
          localStorage.setItem('accessToken', accessToken);
  
          console.log('Inicio de sesión exitoso');
          onLogin(true); // Marca al usuario como autenticado
        } else {
          // Manejar el error de autenticación
          if (response.status === 401) {
            const errorData = await response.json();
            setError('Error: ' + errorData.message); // Establece el mensaje de error
            console.error('Error al iniciar sesión:', errorData.message);
          } else {
            setError('Error al iniciar sesión'); // Establece un mensaje de error genérico
            console.error('Error al iniciar sesión');
          }
        }
      } catch (error) {
        setError('Error al realizar la solicitud: ' + error.message); // Establece el mensaje de error
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
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              className="search-input"
              type="text"
              name="email"
              value={email}
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
          <button type="submit" className="register-button">
            Iniciar Sesión
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>} 
        </form>
      ) : (
        <p>¡Has iniciado sesión con éxito!</p>
      )}
    </div>
  );
};

export default Inicio;


/*import React, { useState } from 'react';

const InicioSesion = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
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
      const response = await fetch('http://localhost:3000/auth/login', requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        const accessToken = responseData.access_token;

        // Guarda el token de acceso en localStorage
        localStorage.setItem('accessToken', accessToken);

        console.log('Inicio de sesión exitoso');
        onLogin(true); // Marca al usuario como autenticado
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Error al realizar la solicitud');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default InicioSesion;*/
