
import React, { useState } from 'react';
import '../styles/inicio.css';
import { useNavigate } from 'react-router-dom';


const Inicio = ({ onLogin, loggedIn, onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregar estado para mostrar errores
  const navigate = useNavigate();

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
          navigate('/inicioS');
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

  const handleLogout = () => {
    // Lógica para cerrar la sesión, como borrar el token de acceso del localStorage
    

    // Realiza cualquier otra lógica de cierre de sesión que necesites

    // Llama a la función proporcionada en "onLogout" para marcar al usuario como no autenticado
    

    // Redirige a la página de inicio después del logout
    navigate('/productores');
  };

 /* return (
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
}; */

  

  return (
    <div className="landing-page" >

      <div className="frame" >
        <div className="frame1">
          <div className="login-signup">
            <button
              className="login"
              sx={{ width: 144 }}
              color="success"
              variant="outlined"
            >
              Iniciar sesión
            </button>
            <button
              className="signup"
              sx={{ width: 100 }}
              color="success"
              variant="outlined"
              onSubmit={handleLogout}
            >
              Registro
            </button>
          </div>
        </div>
      </div>
      <div className="frame2" >
        <img className="frame-icon" alt="" src="/frame@2x.png" />
        <div className="frame3">
          <div className="whyitsimportant">
            <div className="cmo-lo-hacemos">Cómo lo hacemos?</div>
            <img
              className="whyitsimportant-child"
              alt=""
              src="/vector-3.png"
            />
            <div className="a-travs-de-container">
              <p className="a-travs-de">{`A través de esta  herramientass de economía circular reunimos a los actores `}</p>
              <p className="comprometidos-en-la">
                comprometidos en la gestión de empaques y envases
              </p>
            </div>
          </div>
        </div>
        <div className="frame4" >
          <div className="frame5">
            <div className="footer">
              <div className="alianzacirculargmailcom-call">
                <p className="comprometidos-en-la">alianzacircular@gmail.com</p>
                <p className="comprometidos-en-la">Calle 67 N.º 53-108</p>
                <p className="comprometidos-en-la">
                  Ciudad Universitaria b21-435
                </p>
                <p className="comprometidos-en-la">&nbsp;</p>
                <p className="comprometidos-en-la">&nbsp;</p>
                <p className="comprometidos-en-la">&nbsp;</p>
                <p className="comprometidos-en-la">&nbsp;</p>
                <p className="comprometidos-en-la">&nbsp;</p>
                <p className="comprometidos-en-la">&nbsp;</p>
                <p className="comprometidos-en-la">
                  copyright © 2021, todos los derechos reservados
                </p>
              </div>
              <img className="frame-icon1" alt="" src="/cartoon@2x.png" />
            </div>
          </div>
          <div className="banner">
            <img className="banner-child" alt="" src="/rectangle-21@2x.png" style={{ width: "100%", height: "100%" }} />
            <div className="s-el-cambio-container">
              <p className="comprometidos-en-la">“Sé el cambio</p>
              <p className="comprometidos-en-la">que quieres ver</p>
              <p className="comprometidos-en-la">en el mundo”</p>
            </div>
          </div>
        </div>
        <div className="landing-page1">
          <div className="frame6">
            <img className="cartoon-icon" alt="" src="/CARTOON.png" />
            <div className="frame7">
              <div className="text">
                <div className="iniciar-sesin">Iniciar sesión</div>
                <div className="estamos-comprometidos-con-container" >
                  <p className="estamos">
                    <i className="estamos1">Estamos</i>
                  </p>
                  <p className="comprometidos-en-la">
                    <i className="estamos1">comprometidos</i>
                  </p>
                  <p className="con-el-mejoramiento">con el mejoramiento</p>
                  <p className="con-el-mejoramiento">de la gestión de</p>
                  <p className="con-el-mejoramiento">empaques y envases</p>
                </div>
                <div className="bienvenido-ingresa-con-container">
                  <p className="bienvenido">Bienvenido.</p>
                  <p className="comprometidos-en-la">{`ingresa con tu usuario y contraseña                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `}</p>
                </div>
                <div className="olvide-mi-contrasea-parent">
                  <a className="olvide-mi-contrasea">Olvide mi contraseña</a>
                  <form onSubmit={handleLogout}>
                  <button className="" onClick={handleLogout}>
                        <b className="entrar">cerrar</b>
                      </button>
                  </form>
                  {!loggedIn ? (
                    
                    <form onSubmit={handleLogin}>
                      <button className="getstarted" onClick={handleLogin}>
                        <b className="entrar">Entrar</b>
                      </button>
                      
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                  ) : (
                    <p>¡Has iniciado sesión con éxito!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="frame8">
            <div className="frame9">
              <input
                className="frame-child"
                color="primary"
                size="small"
                sx={{ width: 286 }}
                variant="filled"
                placeholder="Usuario"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="frame10">
              <input
                className="frame-item"
                color="primary"
                sx={{ width: 286 }}
                variant="filled"
                placeholder="Contraseña"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Inicio;



