const validateFormComment = (props, setValidateForm = () => {}) => {
  const errors = {};

  if (props.comment.trim() === "") {
    errors.comment = "Harap masukan komentar terlebih dahulu";
  }

  setValidateForm(errors);
  return errors;
};

export { validateFormComment };
