import React, { useState } from "react";
import { GoDiscussionClosed } from "react-icons/go";
import LoginInput from "../components/LoginAndRegister/LoginInput";
import { bgLogin } from "../images";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onLoginHandler = ({ email, password }) => {
    const successCallback = () => {
      navigate("/");
    };

    dispatch(
      asyncSetAuthUser({
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
          <div className="flex flex-col items-center dark:text-white">
            <GoDiscussionClosed className="w-[50px] h-[50px] text-primary dark:text-dark-primary-sky" />
            <h2 className="font-bold">Forum Discuction</h2>
            <h2 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-text-primary dark:text-white capitalize">
              Masuk ke dalam akun
            </h2>
          </div>
          <LoginInput
            onLoginHandler={onLoginHandler}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
