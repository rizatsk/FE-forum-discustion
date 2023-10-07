const validateFormRegister = (props, setValidateForm = () => {}) => {
  const errors = {};

  if (props.name.trim() === "") {
    errors.name = "Nama belum dimasukan";
  }
  if (props.email.trim() === "") {
    errors.email = "Email belum dimasukan";
  }
  if (props.password.length < 6) {
    errors.password = "Password harus berisi minimal 6 karakter";
  }

  setValidateForm(errors);
  return errors;
};

const validateFormLogin = (props, setValidateForm = () => {}) => {
  const errors = {};

  if (props.email.trim() === "") {
    errors.email = "Email belum dimasukan";
  }
  if (props.password.trim() === "") {
    errors.password = "Password belum dimasukan";
  }

  setValidateForm(errors);
  return errors;
};

export { validateFormRegister, validateFormLogin };
