import React from 'react';
import AuthState from './../context/auth/authState';
import AppState from './../context/app/appState';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      {/* Para que AppState puede acceder a funcionalidades de AuthState es necesario colocarlo dentro de este */}
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  )  
}

export default MyApp;
