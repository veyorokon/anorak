export default {
  email: {
    initialValue: "",
    label: "Email Address",
    input: {
      autoComplete: "email",
      required: true,
      type: "email"
    }
  },
  password: {
    initialValue: "",
    label: "Password",
    input: {
      autoComplete: "current-password",
      required: true,
      type: "password"
    }
  }
};
