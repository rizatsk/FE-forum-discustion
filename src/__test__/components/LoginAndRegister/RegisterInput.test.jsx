import { afterEach, describe, expect, it, vi } from "vitest";
import RegisterInput from "../../../components/LoginAndRegister/RegisterInput";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

/**
 * skenario test
 *
 *  - RegisterInput component
 *    - should onRegisterHandler is called when button register clicked
 *    - should error when form input is empty, and button register clicked
 *    - should show errorMessage when have errorMessage, and have button Link login
 */

describe("RegisterInput component", () => {
  const dataForRegister = {
    name: "User Test",
    email: "tester@gmail.com",
    password: "GaengLoveLove213",
  };

  afterEach(() => {
    cleanup();
  });
  it("should onRegisterHandler is called when button register clicked", async () => {
    // Arrange
    const onRegisterHandler = vi.fn();

    render(
      <BrowserRouter>
        <RegisterInput onRegisterHandler={onRegisterHandler} />
      </BrowserRouter>
    );
    const nameInput = screen.getByTestId("input-name");
    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");
    const buttonRegister = screen.getByTestId("button-register");

    await userEvent.type(nameInput, dataForRegister.name);
    await userEvent.type(emailInput, dataForRegister.email);
    await userEvent.type(passwordInput, dataForRegister.password);

    // Action
    await userEvent.click(buttonRegister);

    // Assert
    expect(nameInput).toHaveValue(dataForRegister.name);
    expect(emailInput).toHaveValue(dataForRegister.email);
    expect(passwordInput).toHaveValue(dataForRegister.password);
    expect(onRegisterHandler).toBeCalledWith(dataForRegister);
  });
  it("should error when form input is empty, and button register clicked", async () => {
    // Arrange
    const onRegisterHandler = vi.fn();

    render(
      <BrowserRouter>
        <RegisterInput onRegisterHandler={onRegisterHandler} />
      </BrowserRouter>
    );
    const nameError = screen.getByTestId("error-name");
    const emailError = screen.getByTestId("error-email");
    const passwordError = screen.getByTestId("error-password");
    const buttonRegister = screen.getByTestId("button-register");

    // Action
    await userEvent.click(buttonRegister);

    // Assert
    expect(nameError).toHaveTextContent("Nama belum dimasukan");
    expect(emailError).toHaveTextContent("Email belum dimasukan");
    expect(passwordError).toHaveTextContent(
      "Password harus berisi minimal 6 karakter"
    );
    expect(onRegisterHandler).not.toBeCalledWith(dataForRegister);
  });
  it("should show errorMessage when have errorMessage, and have button Link login", async () => {
    // Arrange
    const fakeErrorMessage = "Something Error";
    const onRegisterHandler = vi.fn();

    // Action
    render(
      <BrowserRouter>
        <RegisterInput
          errorMessage={fakeErrorMessage}
          onRegisterHandler={onRegisterHandler}
        />
      </BrowserRouter>
    );

    const errorMessage = screen.getByTestId("error-message");
    const buttonLinkLogin = screen.getByTestId("link-login");

    // Assert
    expect(errorMessage).toHaveTextContent(fakeErrorMessage);
    expect(buttonLinkLogin.nodeName).toBe("A");
    expect(buttonLinkLogin).toHaveAttribute("href", "/login");
    expect(buttonLinkLogin).toHaveTextContent(/masuk/i);
  });
});
