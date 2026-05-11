import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const getAdapter = (utils) => {
  const name = utils && (utils.name || (utils.constructor && utils.constructor.name));
  return name && name.toLowerCase().includes('moment') ? AdapterMoment : AdapterDateFns;
};

const PickerAdapterContext = React.createContext(AdapterDateFns);

export const MuiPickersUtilsProvider = ({
  children,
  utils,
  locale,
  libInstance,
  ...props
}) => {
  const adapter = getAdapter(utils);

  return (
    <PickerAdapterContext.Provider value={adapter}>
      <LocalizationProvider
        dateAdapter={adapter}
        adapterLocale={locale}
        dateLibInstance={libInstance}
        {...props}
      >
        {children}
      </LocalizationProvider>
    </PickerAdapterContext.Provider>
  );
};

const mergeSx = (...values) => values.filter(Boolean).flat();

const normalizePickerFormat = (value) => {
  if (!value || typeof value !== 'string') {
    return value;
  }

  return value
    .replace(/YYYY/g, 'yyyy')
    .replace(/YY/g, 'yy')
    .replace(/DD/g, 'dd')
    .replace(/\bD\b/g, 'd');
};

const mapPickerProps = ({
  format,
  inputVariant,
  helperText,
  margin,
  variant,
  KeyboardButtonProps,
  autoOk,
  InputLabelProps,
  size,
  style,
  sx,
  fullWidth,
  slotProps = {},
  textFieldProps = {},
  ...props
}, adapter) => {
  const slotTextFieldProps = slotProps.textField || {};
  const resolvedFormat = normalizePickerFormat(props.inputFormat || format);

  return {
    ...props,
    inputFormat: resolvedFormat,
    renderInput: (params) => (
      <TextField
        {...params}
        {...slotTextFieldProps}
        {...textFieldProps}
        helperText={helperText ?? slotTextFieldProps.helperText ?? textFieldProps.helperText}
        margin={margin ?? slotTextFieldProps.margin ?? textFieldProps.margin}
        size={size ?? slotTextFieldProps.size ?? textFieldProps.size}
        style={{ ...slotTextFieldProps.style, ...textFieldProps.style, ...style }}
        sx={mergeSx(slotTextFieldProps.sx, textFieldProps.sx, sx)}
        fullWidth={fullWidth ?? slotTextFieldProps.fullWidth ?? textFieldProps.fullWidth}
        variant={inputVariant || variant || slotTextFieldProps.variant || textFieldProps.variant || params.variant}
        InputLabelProps={{
          ...params.InputLabelProps,
          ...slotTextFieldProps.InputLabelProps,
          ...textFieldProps.InputLabelProps,
          ...InputLabelProps,
        }}
        InputProps={{
          ...params.InputProps,
          ...slotTextFieldProps.InputProps,
          ...textFieldProps.InputProps,
        }}
        inputProps={{
          ...params.inputProps,
          ...slotTextFieldProps.inputProps,
          ...textFieldProps.inputProps,
        }}
      />
    )
  };
};

export const KeyboardDatePicker = (props) => (
  <PickerAdapterContext.Consumer>
    {(adapter) => <MuiDatePicker {...mapPickerProps(props, adapter)} />}
  </PickerAdapterContext.Consumer>
);

export const DatePicker = (props) => (
  <PickerAdapterContext.Consumer>
    {(adapter) => <MuiDatePicker {...mapPickerProps(props, adapter)} />}
  </PickerAdapterContext.Consumer>
);

export const KeyboardDateTimePicker = (props) => (
  <PickerAdapterContext.Consumer>
    {(adapter) => <MuiDateTimePicker {...mapPickerProps(props, adapter)} />}
  </PickerAdapterContext.Consumer>
);
