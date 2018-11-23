export default {
  email: {
    initialValue: '',
    label: 'Email Address',
    input: {
      autoComplete: 'email',
      required: true,
      type: 'email'
    }
  },
  firstName: {
    initialValue: '',
    label: 'First Name',
    input: {
      required: true
    }
  },
  lastName: {
    initialValue: '',
    label: 'Last Name',
    input: {
      required: true
    }
  },
  password: {
    initialValue: '',
    label: 'Password',
    input: {
      autoComplete: 'current-password',
      required: true,
      type: 'password'
    }
  }
};
