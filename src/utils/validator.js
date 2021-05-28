import messages from './messages';

export const validateName = (firstName) => {
  if (!firstName) {
    return 'Invalid name. Please enter a valid name.';
  }
  return '';
};

export const validateFirstName = (firstName) => {
  if (!firstName) {
    return messages.signup.firstNameError;
  }
  return '';
};

export const validateLastName = (lastName) => {
  if (!lastName) {
    return messages.signup.lastNameError;
  }
  return '';
};

export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\d{10}$/;
  if (phoneNumber && phoneNumber.match(regex)) {
    return '';
  }
  return 'Enter valid phone number';
};
export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && email.match(regex)) {
    return undefined;
  }
  return 'Enter a valid email address';
};

export const validatePassword = (password) => {
  const regex = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/;
  if (password && password.match(regex)) {
    return undefined;
  }
  return 'Enter a valid password';
};

export const required = (message) => (data) => {
  if (!data) {
    return message;
  }
  return '';
};

export const confirmPasswordValidator = (value, other) =>
  value !== other?.password?.value ? 'Password Does not match' : undefined;
