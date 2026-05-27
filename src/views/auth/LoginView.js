import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { alpha, styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import logo from 'src/icons/STS-transparent.png';
import API from '../components/API';
import { toast } from 'react-toastify';

const RootPage = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  background:
    'linear-gradient(135deg, #eef7fb 0%, #f8fbfc 38%, #f3f7f5 100%)',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    backgroundImage:
      'linear-gradient(rgba(15, 47, 66, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 47, 66, 0.04) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
    content: '""',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute'
  }
}));

const BackgroundScene = styled(Box)({
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute'
});

const AtmosphereLayer = styled('div')({
  background:
    'radial-gradient(circle at 18% 18%, rgba(0, 164, 216, 0.18), transparent 30%), radial-gradient(circle at 78% 72%, rgba(239, 49, 36, 0.12), transparent 34%), linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(225, 242, 247, 0.62) 48%, rgba(236, 242, 238, 0.84))',
  inset: 0,
  position: 'absolute'
});

const BlueprintPlane = styled(motion.div)({
  backgroundImage:
    'linear-gradient(rgba(0, 97, 123, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 97, 123, 0.055) 1px, transparent 1px), linear-gradient(rgba(0, 97, 123, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 97, 123, 0.09) 1px, transparent 1px)',
  backgroundPosition: 'center',
  backgroundSize: '36px 36px, 36px 36px, 144px 144px, 144px 144px',
  inset: '-14%',
  position: 'absolute',
  transform: 'rotate(-6deg)'
});

const ScanBeam = styled(motion.div)({
  background:
    'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 24%, rgba(0, 164, 216, 0.2) 50%, rgba(255, 255, 255, 0.28) 76%, transparent 100%)',
  filter: 'blur(0.5px)',
  height: '100%',
  opacity: 0.8,
  position: 'absolute',
  top: 0,
  width: '22%'
});

const ConveyorTrack = styled(motion.div)(({ theme }) => ({
  background:
    'linear-gradient(90deg, transparent, rgba(0, 107, 134, 0.2) 12%, rgba(255, 255, 255, 0.74) 50%, rgba(239, 49, 36, 0.17) 88%, transparent)',
  borderBottom: `1px solid ${alpha('#006b86', 0.12)}`,
  borderTop: `1px solid ${alpha('#006b86', 0.1)}`,
  boxShadow: '0 18px 42px rgba(0, 107, 134, 0.08)',
  height: 118,
  left: '-18%',
  overflow: 'hidden',
  position: 'absolute',
  right: '-18%',
  '&::before': {
    background:
      'repeating-linear-gradient(90deg, rgba(0, 107, 134, 0.22) 0 2px, transparent 2px 34px)',
    content: '""',
    inset: 0,
    opacity: 0.52,
    position: 'absolute'
  },
  '&::after': {
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.76), transparent)',
    content: '""',
    height: '100%',
    left: '-24%',
    position: 'absolute',
    top: 0,
    width: '24%'
  },
  [theme.breakpoints.down('sm')]: {
    height: 82
  }
}));

const SignalColumn = styled(motion.div)(({ theme }) => ({
  borderLeft: `1px solid ${alpha('#006b86', 0.15)}`,
  borderRight: `1px solid ${alpha('#ef3124', 0.1)}`,
  bottom: '8%',
  position: 'absolute',
  top: '9%',
  width: 86,
  '&::before': {
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 107, 134, 0.24) 0 2px, transparent 2px 18px)',
    content: '""',
    inset: 0,
    position: 'absolute'
  },
  [theme.breakpoints.down('sm')]: {
    opacity: 0.42,
    width: 52
  }
}));

const PipeField = styled(motion.div)(({ theme }) => ({
  display: 'grid',
  gap: 10,
  opacity: 0.58,
  position: 'absolute',
  width: 260,
  '& span': {
    background:
      'linear-gradient(90deg, rgba(0, 107, 134, 0), rgba(0, 107, 134, 0.26) 16%, rgba(255, 255, 255, 0.95) 52%, rgba(0, 107, 134, 0.22) 84%, rgba(0, 107, 134, 0))',
    borderRadius: 999,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 8px 18px rgba(0, 75, 96, 0.08)',
    display: 'block',
    height: 9
  },
  [theme.breakpoints.down('sm')]: {
    opacity: 0.34,
    width: 180
  }
}));

const DataPlate = styled(motion.div)(({ theme }) => ({
  backgroundColor: alpha('#ffffff', 0.5),
  border: `1px solid ${alpha('#006b86', 0.11)}`,
  boxShadow: '0 18px 36px rgba(0, 75, 96, 0.08)',
  display: 'grid',
  gap: 9,
  padding: 14,
  position: 'absolute',
  width: 180,
  '& span': {
    background:
      'linear-gradient(90deg, rgba(0, 107, 134, 0.28), rgba(0, 164, 216, 0.08))',
    display: 'block',
    height: 4
  },
  '& span:nth-of-type(2)': {
    width: '68%'
  },
  '& span:nth-of-type(3)': {
    background:
      'linear-gradient(90deg, rgba(239, 49, 36, 0.3), rgba(239, 49, 36, 0.06))',
    width: '42%'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const LoginContainer = styled(Container)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(4),
  position: 'relative',
  zIndex: 1
}));

const LoginPanel = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.98),
  border: `2px solid ${alpha('#0f6f90', 0.18)}`,
  borderRadius: 8,
  boxShadow: '0 34px 90px rgba(28, 49, 58, 0.24), 0 12px 28px rgba(0, 107, 134, 0.12)',
  maxWidth: 560,
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  '&::before': {
    background:
      'linear-gradient(90deg, #00a4d8 0%, #00a4d8 48%, #ef3124 48%, #ef3124 100%)',
    content: '""',
    height: 6,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0
  }
}));

const FormPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(7, 7, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5, 3, 4)
  }
}));

const LogoImage = styled('img')({
  display: 'block',
  height: 'auto',
  maxWidth: 260,
  width: '100%'
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha(theme.palette.common.white, 0.86),
    borderRadius: 6,
    transition: theme.transitions.create(['box-shadow', 'background-color']),
    '&:hover': {
      backgroundColor: theme.palette.common.white
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.common.white,
      boxShadow: `0 0 0 4px ${alpha('#00a4d8', 0.12)}`
    }
  }
}));

const sceneMotion = {
  blueprint: {
    animate: {
      backgroundPosition: ['0px 0px', '72px 72px'],
      transition: {
        duration: 34,
        ease: 'linear',
        repeat: Infinity
      }
    }
  },
  scan: {
    animate: {
      x: ['-130%', '520%'],
      opacity: [0, 0.72, 0],
      transition: {
        duration: 9,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1.6
      }
    }
  },
  trackPrimary: {
    animate: {
      x: ['-2%', '3%', '-2%'],
      opacity: [0.66, 0.94, 0.66],
      transition: {
        duration: 13,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  },
  trackSecondary: {
    animate: {
      x: ['4%', '-3%', '4%'],
      opacity: [0.3, 0.55, 0.3],
      transition: {
        duration: 17,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  },
  signal: {
    animate: {
      y: [0, 18, 0],
      opacity: [0.34, 0.58, 0.34],
      transition: {
        duration: 8,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  },
  pipesLeft: {
    animate: {
      x: [-12, 16, -12],
      transition: {
        duration: 11,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  },
  pipesRight: {
    animate: {
      x: [18, -12, 18],
      transition: {
        duration: 14,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  },
  plate: {
    animate: {
      y: [0, -10, 0],
      opacity: [0.48, 0.76, 0.48],
      transition: {
        duration: 10,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  }
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const stackVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const LoginView = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const backgroundAnimation = shouldReduceMotion ? {} : sceneMotion;
  const panelInitial = shouldReduceMotion ? false : 'hidden';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/app/dashboard', { replace: true });
    }
  }, []);

  async function UserLogin2(values) {
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
        localStorage.removeItem('token');
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      });
  }

  return (
    <RootPage title="Login">
      <BackgroundScene aria-hidden="true">
        <AtmosphereLayer />
        <BlueprintPlane {...backgroundAnimation.blueprint} />
        <ScanBeam {...backgroundAnimation.scan} />
        <ConveyorTrack
          {...backgroundAnimation.trackPrimary}
          sx={{ rotate: '-13deg', top: '12%' }}
        />
        <ConveyorTrack
          {...backgroundAnimation.trackSecondary}
          sx={{ bottom: '10%', height: { xs: 68, sm: 104 }, rotate: '9deg' }}
        />
        <SignalColumn
          {...backgroundAnimation.signal}
          sx={{ left: { xs: 18, md: '10%' } }}
        />
        <SignalColumn
          {...backgroundAnimation.signal}
          sx={{ right: { xs: 16, md: '12%' }, transform: 'skewX(-12deg)' }}
        />
        <PipeField
          {...backgroundAnimation.pipesLeft}
          sx={{ bottom: { xs: '17%', md: '18%' }, left: { xs: '-18%', md: '8%' }, rotate: '-18deg' }}
        >
          {[0, 1, 2, 3, 4].map(item => (
            <span key={item} />
          ))}
        </PipeField>
        <PipeField
          {...backgroundAnimation.pipesRight}
          sx={{ right: { xs: '-14%', md: '9%' }, rotate: '16deg', top: { xs: '16%', md: '18%' } }}
        >
          {[0, 1, 2, 3].map(item => (
            <span key={item} />
          ))}
        </PipeField>
        <DataPlate
          {...backgroundAnimation.plate}
          sx={{ left: '13%', top: '26%' }}
        >
          <span />
          <span />
          <span />
        </DataPlate>
        <DataPlate
          {...backgroundAnimation.plate}
          sx={{ bottom: '24%', right: '10%', transform: 'skewX(-8deg)' }}
        >
          <span />
          <span />
          <span />
        </DataPlate>
      </BackgroundScene>
      <LoginContainer maxWidth="sm">
        <LoginPanel
          component={motion.div}
          initial={panelInitial}
          animate="visible"
          variants={panelVariants}
        >
          <FormPanel>
            <Formik
              initialValues={{
                ajax: true,
                username: '',
                password: '',
                action: 'GetPropertiesLogin'
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  UserLogin2(values);
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
                  <Stack
                    component={motion.div}
                    spacing={3}
                    variants={stackVariants}
                  >
                    <Box component={motion.div} variants={itemVariants}>
                      <LogoImage
                        alt="Sahathai Steel Pipe"
                        src={logo}
                      />
      
                    </Box>

                    <Box component={motion.div} variants={itemVariants}>
                      <Typography
                        component="h2"
                        sx={{ fontSize: 28, fontWeight: 700, mb: 0.5 }}
                      >
                        Welcome back
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        Enter your username and password.
                      </Typography>
                    </Box>

                    <Box component={motion.div} variants={itemVariants}>
                      <StyledTextField
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                        helperText={touched.username && errors.username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineRoundedIcon color="action" fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                        label="Username"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.username}
                        variant="outlined"
                      />
                    </Box>
                    <Box component={motion.div} variants={itemVariants}>
                      <StyledTextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PasswordRoundedIcon color="action" fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                        label="Password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                    </Box>
                    <Box component={motion.div} variants={itemVariants}>
                      <Button
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        startIcon={<LoginRoundedIcon />}
                        sx={{
                          background: 'linear-gradient(135deg, #008fbd 0%, #006b86 100%)',
                          borderRadius: 1.5,
                          boxShadow: '0 14px 30px rgba(0, 107, 134, 0.26)',
                          fontWeight: 700,
                          py: 1.35,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #007ba2 0%, #005c73 100%)',
                            boxShadow: '0 16px 34px rgba(0, 107, 134, 0.32)'
                          }
                        }}
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>
                  </Stack>
                </form>
              )}
            </Formik>

            <Divider component={motion.div} variants={itemVariants} sx={{ my: 3 }}>
              <Typography color="textSecondary" variant="caption">
                Quick access
              </Typography>
            </Divider>
            <Box component={motion.div} variants={itemVariants}>
              <Button
                fullWidth
                onClick={() => navigate('/app/dashboard', { replace: true })}
                size="large"
                sx={{
                  borderColor: 'rgba(0, 143, 189, 0.36)',
                  borderRadius: 1.5,
                  color: '#006b86',
                  fontWeight: 700,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 143, 189, 0.06)',
                    borderColor: '#008fbd'
                  }
                }}
                type="button"
                variant="outlined"
              >
                Go To Dashboard
              </Button>
            </Box>
          </FormPanel>
        </LoginPanel>
      </LoginContainer>
    </RootPage>
  );
};

export default LoginView;
