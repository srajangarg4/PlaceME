const errorMessages = {
  required: {
    phoneNumber: "",

  },
  invalid: {
    number: "This doesn't seems a number",
  },
  not: {
    inRange: "The number is not in given range."
  }
}

const messages = {
  required: {},
  ...errorMessages
};


export default messages;
