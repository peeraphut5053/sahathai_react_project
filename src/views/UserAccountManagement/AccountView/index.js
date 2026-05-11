import React from 'react';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const RootPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  minHeight: '100%',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(3)
}));

const Account = () => {
  return (
    <RootPage
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </RootPage>
  );
};

export default Account;
