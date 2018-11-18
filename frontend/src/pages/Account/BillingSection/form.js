export default {
  address1: {
    initialValue: '',
    label: 'Address 1',
    input: {
      autoComplete: 'billing address-line1',
      required: true
    }
  },
  address2: {
    initialValue: '',
    label: 'Address 2',
    input: {
      autoComplete: 'billing address-line2'
    }
  },
  city: {
    initialValue: '',
    label: 'City',
    input: {
      autoComplete: 'billing address-level2',
      required: true
    }
  },
  country: {
    initialValue: '',
    label: 'Country',
    input: {
      autoComplete: 'billing country',
      required: true
    }
  },
  firstName: {
    initialValue: '',
    label: 'First name',
    input: {
      autoComplete: 'fname',
      required: true
    }
  },
  lastName: {
    initialValue: '',
    label: 'Last name',
    input: {
      autoComplete: 'lname',
      required: true
    }
  },
  state: {
    initialValue: '',
    label: 'State',
    input: {
      required: true
    }
  }
};
