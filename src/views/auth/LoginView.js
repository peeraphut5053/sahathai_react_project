import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Hidden,
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import Axios from 'axios';
import API from '../components/API';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3)
  },
  box: {
    border: '1px solid #3f51b5',
    borderRadius: '5px',
    padding: '100px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    '&:hover': {
      background: 'white',
    }
  }
}));



const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();




  // const gotoDashBoard = async () => {
  //   let userData = ""
  //   setTimeout(() => {
  //     console.log(123)
  //   }, 1000)
  //   return userData
  // }

  const gotoDashBoard = async function (user) {
    return user;
  };




  async function UserLogin(values) {
    navigate('/app/dashboard', { replace: true });

    let token = ""
    let userData = ""
    token = Axios.post(`http://172.18.1.194:99/STS_Web_API/api/account/login`, values)
      .then(res => {
        token = res.data;
        console.log('token', token)
        localStorage.setItem('token', token.accessToken);
        Axios.create({
          baseURL: `http://172.18.1.194:99/STS_web_api/api/member/data`,
          timeout: 1000,
          headers: { 'Authorization': 'Bearer ' + token.accessToken }
        }).get(`http://172.18.1.194:99/STS_web_api/api/member/data`)
          .then(response => {
            userData = response.data;
            localStorage.setItem('username', userData.email);
            console.log(userData)
            navigate('/app/dashboard', { replace: true });
          })
      }).catch(function (error) {
        localStorage.setItem('username', 'guest');
        localStorage.setItem('token', "");
        localStorage.setItem('userData', "");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        navigate('/app/dashboard', { replace: true });

      })

    // await navigate('/app/dashboard', { replace: true });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [])
  

  async function UserLogin2(values) {
    // navigate('/app/dashboard', { replace: true });
    let username = ""
    let token = ""
    let userData = ""

    API.post(`SignIn.php?action=Login&username=${values.username}&password=${values.password}`, values)
      .then(response => {
        let data = response.data;
        localStorage.setItem('token', JSON.stringify({
          token: data.token,
          username: data.username
      }));
      navigate('/app/dashboard', { replace: true });
      toast.success(`Welcome ${data.username}`);
      }).catch(function (error) {
           localStorage.removeItem("token");
           alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      })

    // await navigate('/app/dashboard', { replace: true });
  }





  async function longTimeHello() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Delay Hello1");
      }, 5000);
    });
  }

  async function longTimeHello2() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Delay Hello2");
      }, 3000);
    });
  }

  async function main() {
    let a = await longTimeHello();
    let b = await longTimeHello2();
  }






  return (
    <Page
      className={classes.root}
      title="Login"
    >
      {/* <video id="background-video" loop autoPlay style={{position: 'fixed',filter:'opacity(0.04)'}} >
    <source src={'/static/video/alb_cityscp101_1080p.mp4'} type="video/mp4" />
</video> */}

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
 
      >
        <Container maxWidth="sm" className={classes.box}>
          <Formik
            initialValues={{
              ajax: true,
              username: '',
              password: '',
              action: "GetPropertiesLogin"
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                UserLogin2(values)
                // main()
                actions.setSubmitting(false);
              }, 1000);

            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}
                >
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    align='center'
                  >
                   <span style={{color: '#00BFFF'}}>SAHA</span><span style={{color: 'red'}}>THAI</span> DASHBOARD
                  </Typography>
                </Box>
                {/*<Hidden only="lg">

                  <Grid
                    container
                    spacing={3}

                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <Button
                        color="primary"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Facebook
                    </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                    </Button>
                    </Grid>
                  </Grid>

                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                  </Typography>
                  </Box>
                </Hidden>*/}
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
