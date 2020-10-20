import React, { useContext, useEffect } from 'react';
import Layout from './../components/Layout'
import authContext from './../context/auth/authContext';

const index = () => {
  // Extraer el usuario autenticado del Storage
  const { usuarioAutenticado } = useContext(authContext);

  useEffect(() => {
    // Revisar existencia de un token para enviar peticion a API
    usuarioAutenticado();
  }, [])

  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
};

export default index;