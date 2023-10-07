const validateFormAddDiscustion = (props, setValidateForm = () => {}) => {
  const errors = {};

  if (props.title.trim() === "") {
    errors.title = "Judul wajib diisi";
  }
  if (props.category.trim() === "") {
    errors.category = "Kategori wajib diisi";
  }
  if (props.category.trim().length > 20) {
    errors.category = "Kategori tidak boleh lebih dari 20";
  }
  if (props.content.trim() === "") {
    errors.content = "Diskusi wajib diisi";
  }

  setValidateForm(errors);
  return errors;
};

export { validateFormAddDiscustion };
