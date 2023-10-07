import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import LoginInput from "../../../components/LoginAndRegister/LoginInput";
import { BrowserRouter } from "react-router-dom";

/**
 * skenario test
 *
 *  - LoginInput component
 *    - should handle email, and password typing correctly
 *    - should call onLoginHandler when button masuk is clicked
 *    - should call error when inpurt email and password is empty button masuk is clicked
 *    - should show errorMessage when have errorMessage, and have button Link register
 */

describe("LoginInput component", () => {
  const dataForLogin = {
    email: "tester@gmail.com",
    password: "GaengLoveLove213",
  };

  afterEach(() => {
    cleanup();
  });

  it("should handle email, and password typing correctly", async () => {
    // Arrange
    render(
      <BrowserRouter>
        <LoginInput onLoginHandler={() => {}} />
      </BrowserRouter>
    );
    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");

    // Action
    await userEvent.type(emailInput, dataForLogin.email);
    await userEvent.type(passwordInput, dataForLogin.password);

    // Assert
    expect(emailInput).toHaveValue(dataForLogin.email);
    expect(passwordInput).toHaveValue(dataForLogin.password);
  });
  it("should call onLoginHandler when button masuk is clicked", async () => {
    // Arrange
    const mockOnLoginHandler = vi.fn();

    render(
      <BrowserRouter>
        <LoginInput onLoginHandler={mockOnLoginHandler} />
      </BrowserRouter>
    );

    const emailInput = screen.getByTestId("input-email");
    const passwordInput = screen.getByTestId("input-password");
    const loginButton = screen.getByTestId("button-masuk");
    await userEvent.type(emailInput, dataForLogin.email);
    await userEvent.type(passwordInput, dataForLogin.password);

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockOnLoginHandler).toHaveBeenCalledWith(dataForLogin);
  });
  it("should call error when inpurt email and password is empty button masuk is clicked", async () => {
    // Arrange
    const mockOnLoginHandler = vi.fn();

    render(
      <BrowserRouter>
        <LoginInput onLoginHandler={mockOnLoginHandler} />
      </BrowserRouter>
    );

    const loginButton = screen.getByTestId("button-masuk");
    const errorEmail = screen.getByTestId("error-email");
    const errorPassword = screen.getByTestId("error-password");

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(errorEmail).toHaveTextContent("Email belum dimasukan");
    expect(errorPassword).toHaveTextContent("Password belum dimasukan");
    expect(mockOnLoginHandler).not.toHaveBeenCalledWith(dataForLogin);
  });
  it("should show errorMessage when have errorMessage, and have button Link register", async () => {
    // Arrange
    const fakeErrorMessage = "Something Error";
    const mockOnLoginHandler = vi.fn();

    // Action
    render(
      <BrowserRouter>
        <LoginInput
          errorMessage={fakeErrorMessage}
          mockOnLoginHandler={mockOnLoginHandler}
        />
      </BrowserRouter>
    );

    const errorMessage = screen.getByTestId("error-message");
    const buttonLinkRegister = screen.getByTestId("link-register");

    // Assert
    expect(errorMessage).toHaveTextContent(fakeErrorMessage);
    expect(buttonLinkRegister.nodeName).toBe("A");
    expect(buttonLinkRegister).toHaveAttribute("href", "/register");
    expect(buttonLinkRegister).toHaveTextContent(/daftar disini/i);
  });
});
