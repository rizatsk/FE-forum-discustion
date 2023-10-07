import React, { useState } from "react";
import { GoDiscussionClosed } from "react-icons/go";
import RegisterInput from "../components/LoginAndRegister/RegisterInput";
import { bgLogin } from "../images";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterHandler = ({ name, email, password }) => {
    const successCallback = () => {
      navigate("/login");
    };

    dispatch(
      asyncRegisterUser({
        name,
        email,
        password,
        successCallback,
        errorCallBack: setErrorMessage,
      })
    );
  };

  return (
    <div className="flex flex-col justify-center items-center px-3 mt-8">
      <div className="w-full md:w-[450px] rounded-lg shadow-primaryShadow overflow-hidden dark:bg-dark-primary-2">
        <img
          className="h-[80px] w-full object-cover"
          src={bgLogin}
          alt="background"
        />
        <div className="px-6 pb-12 pt-4 lg:px-8">
          <div className="flex flex-col items-center">
            <GoDiscussionClosed className="w-[50px] h-[50px] text-primary dark:text-dark-primary-sky" />
            <h2 className="font-bold dark:text-white">Forum Discuction</h2>
            <h2 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-text-primary dark:text-white capitalize">
              Membuat akun Anda
            </h2>
          </div>
          <RegisterInput
            errorMessage={errorMessage}
            onRegisterHandler={onRegisterHandler}
          />
        </div>
      </div>
    </div>
  );
}
