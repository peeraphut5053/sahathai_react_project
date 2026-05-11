import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import Results from './Results';
import data from './data';


const RootPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  minHeight: '95%',
  paddingBottom: theme.spacing(0),
  paddingTop: theme.spacing(0)
}));

const UserListView = () => {
  const [customers] = useState(data);

  return (
    <RootPage
      title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </RootPage>
  );
};

export default UserListView;
