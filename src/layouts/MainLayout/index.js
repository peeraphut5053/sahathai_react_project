import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TopBar from './TopBar';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}));

const Wrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 0
});

const ContentContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const Content = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const MainLayout = (props) => {
  return (
    <Root>
      <div style={{zIndex:2000}}>{props.userauth}</div>
      <TopBar status={"Dashboard"} />
      <Wrapper>
        <ContentContainer>
          <Content>
            <Outlet />
          </Content>
        </ContentContainer>
      </Wrapper>
    </Root>
  );
};

export default MainLayout;
