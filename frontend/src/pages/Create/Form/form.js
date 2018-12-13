export default {
  costPrice: {
    initialValue: '',
    label: 'Cost',
    input: {
      required: true
    }
  },
  description: {
    initialValue: '',
    label: 'Description',
    input: {
      required: true
    }
  },
  image: {
    initialValue: '',
    label: 'Image URL'
  },
  isPublic: {
    initialValue: false,
    label: 'Public',
    input: {
      type: 'checkbox'
    }
  },
  maxSize: {
    initialValue: '',
    label: 'Maximum Size'
  },
  secret: {
    initialValue: '',
    label: 'Secret',
    input: {
      required: true
    }
  },
  service: {
    initialValue: '',
    label: 'Service Name',
    input: {
      required: true
    }
  }
};
