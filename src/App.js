import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import API from './views/components/API';

const App = () => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
       if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const jwt = JSON.parse(token);
        const response = await API.post(`SignIn.php?action=CheckAuth&token=${jwt.token}`)

        if (response.data) {
          console.log('Good');
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
       } else {
         navigate("/login");
       }
     
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        console.log(error);
      }
  }
  checkAuth();
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
  );
};

export default App;
