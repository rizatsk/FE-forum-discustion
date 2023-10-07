import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { validateFormRegister } from "./ValidateForm";

export default function RegisterInput({ errorMessage, onRegisterHandler }) {
  const [name, changeName] = useInput("");
  const [email, changeEmail] = useInput("");
  const [password, changePassword] = useInput("");
  const [validateForm, setValidateForm] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validateErrorForm = validateFormRegister(
      { name, email, password },
      setValidateForm
    );
    if (Object.keys(validateErrorForm).length > 0) return false;

    onRegisterHandler({ name, email, password });
  };

  return (
    <div className="mt-10">
      {errorMessage && (
        <div
          data-testid="error-message"
          className="bg-rose-500 text-white py-5 px-2 rounded-md my-2 shadow-lg"
        >
          {errorMessage}
        </div>
      )}
      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-text-primary dark:text-white"
          >
            Nama:
          </label>
          <input
            data-testid="input-name"
            id="nama"
            value={name}
            onChange={changeName}
            type="text"
            placeholder="Harap masukan nama lengkap anda"
            className={`${
              validateForm.name
                ? "border-form-error dark:border-dark-primary-sky"
                : "bg-gray-50 border border-gray-300"
            } block w-full border dark:border-2  text-text-primary text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2.5`}
          />
          <p
            data-testid="error-name"
            className="text-form-error font-[400] dark:text-dark-primary-sky"
          >
            {validateForm.name}
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-text-primary dark:text-white"
          >
            Alamat email:
          </label>
          <input
            data-testid="input-email"
            id="email"
            type="email"
            value={email}
            onChange={changeEmail}
            placeholder="example@example.com"
            className={`${
              validateForm.email
                ? "border-form-error dark:border-dark-primary-sky"
                : "bg-gray-50 border border-gray-300"
            } block w-full border dark:border-2  text-text-primary text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2.5`}
          />
          <p
            data-testid="error-email"
            className="text-form-error font-[400] dark:text-dark-primary-sky"
          >
            {validateForm.email}
          </p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-text-primary dark:text-white"
          >
            Password:
          </label>
          <input
            data-testid="input-password"
            id="password"
            type="password"
            value={password}
            onChange={changePassword}
            placeholder="***************"
            className={`${
              validateForm.password
                ? "border-form-error dark:border-dark-primary-sky"
                : "bg-gray-50 border border-gray-300"
            } block w-full border dark:border-2  text-text-primary text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2.5`}
          />
          <p
            data-testid="error-password"
            className="text-form-error font-[400] dark:text-dark-primary-sky"
          >
            {validateForm.password}
          </p>
        </div>

        <div>
          <button
            data-testid="button-register"
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary dark:bg-dark-primary-sky px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-text-primary shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Daftar
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-100">
        Sudah memiliki akun ?
        <Link
          data-testid="link-login"
          to="/login"
          className="font-semibold leading-6 text-primary dark:text-dark-primary-sky hover:text-primary-hover"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}

RegisterInput.propTypes = {
  errorMessage: PropTypes.string,
  onRegisterHandler: PropTypes.func.isRequired,
};
