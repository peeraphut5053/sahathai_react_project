import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';

const RootPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  height: '100%',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(3)
}));

const Image = styled('img')({
  marginTop: 50,
  display: 'inline-block',
  maxWidth: '100%',
  width: 560
});

const NotFoundView = () => {
  return (
    <RootPage
      title="404"
    >

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            ไม่พบหน้านี้
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            <Button variant="contained" >
              <RouterLink to="/">
                {/* <Logo style={{marginBottom:25}} /> */}
            ย้อนกลับไปหน้า Dashboard
        </RouterLink>
            </Button>

          </Typography>

          <Box textAlign="center">
            <Image
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>

        </Container>
      </Box>
    </RootPage>
  );
};

export default NotFoundView;
