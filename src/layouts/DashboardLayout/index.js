import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import NavBar from './NavBar';
import TopBar from './TopBar';
import MyContext from 'src/views/MyContext';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}));

const Wrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 56
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


const DashboardLayout = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(true);
  const [username, setUsername] = useState(null)
  const [userData, setUserData] = useState(null)
  const [user, setuser] = useState(null)
  const checkAuth = () => {
   
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"))
      setUserData(localStorage.getItem("UserData"))
      setuser({
        avatar: '/static/images/avatars/avatar_6.png',
        jobTitle: 'Senior Developer',
        name: localStorage.getItem("username")
      })

    } else {
      setUsername(localStorage.getItem("username"))
      setUserData(localStorage.getItem("UserData"))
      setuser({
        avatar: '/static/images/avatars/avatar_6.png',
        jobTitle: 'Senior Developer',
        name: localStorage.getItem("username")
      })

      // setUsername("")
      // navigate('/app/dashboard')
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <MyContext.Provider
      value={{
        user: user,
      }}
    >
      <Root>
        <TopBar
          username={username}
          onMobileNavOpen={() => setMobileNavOpen(true)}
        />
        <NavBar
          UserData={userData}
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <Wrapper>
          <ContentContainer>
            <Content>
              {/* {JSON.stringify(isMobileNavOpen)} */}
              <Outlet />
            </Content>
          </ContentContainer>
        </Wrapper>
      </Root>
    </MyContext.Provider>

  );
};

export default DashboardLayout;
