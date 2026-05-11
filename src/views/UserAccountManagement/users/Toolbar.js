import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from 'react-feather';

const Root = styled('div')({});

const SpacedButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const Toolbar = ({ className, ...rest }) => {
  return (
    <Root
      className={clsx(className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <SpacedButton>
          Import
        </SpacedButton>
        <SpacedButton>
          Export
        </SpacedButton>
        <Button
          color="primary"
          variant="contained"
        >
          Add customer
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Root>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
