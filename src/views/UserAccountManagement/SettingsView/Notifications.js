import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootForm = styled('form')({});

const NotificationGridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column'
});

const Notifications = ({ className, ...rest }) => {
  return (
    <RootForm
      className={clsx(className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <NotificationGridItem
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Notifications
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Email"
              />
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Text Messages"
              />
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Phone calls"
              />
            </NotificationGridItem>
            <NotificationGridItem
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Messages
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Phone calls"
              />
            </NotificationGridItem>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Card>
    </RootForm>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
