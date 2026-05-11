import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import Notifications from './Notifications';
import Password from './Password';

const RootPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  minHeight: '100%',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(3)
}));

const SettingsView = () => {
  return (
    <RootPage
      title="Settings"
    >
      <Container maxWidth="lg">
        <Notifications />
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </RootPage>
  );
};

export default SettingsView;
