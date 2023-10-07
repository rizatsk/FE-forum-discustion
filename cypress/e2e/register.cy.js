/**
 * skenario test
 *
 *  - Login spec
 *    - should display register page correctly
 *    - should cliked Masuk direct to page login
 *    - should display error message when name, email, and password is empty
 *    - should display alert when email is ready
 */

describe("Register spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
    cy.viewport("macbook-16");
  });

  it("should display register page correctly", () => {
    // memverifikasi elemen yang harus tampak pada halaman register
    cy.get('input[data-testid="input-name"]').should("be.visible");
    cy.get('input[data-testid="input-email"]').should("be.visible");
    cy.get('input[data-testid="input-password"]').should("be.visible");
    cy.get("button[data-testid='button-register']").should("be.visible");
  });
  it("should cliked Masuk direct to page login", () => {
    cy.get("a[data-testid='link-login']").click();

    cy.contains("h2", /Masuk ke dalam akun/i).should("be.visible");
  });
  it("should display error message when name, email, and password is empty", () => {
    cy.get("button[data-testid='button-register']").click();

    cy.contains("p[data-testid='error-name']", "Nama belum dimasukan").should(
      "be.visible"
    );
    cy.contains("p[data-testid='error-email']", "Email belum dimasukan").should(
      "be.visible"
    );
    cy.contains(
      "p[data-testid='error-password']",
      "Password harus berisi minimal 6 karakter"
    ).should("be.visible");
  });
  it("should display alert when email is ready", () => {
    cy.get('input[data-testid="input-name"]').type("akun test");
    cy.get('input[data-testid="input-email"]').type("rizatsakmir@gmail.com");
    cy.get('input[data-testid="input-password"]').type("Dengdaan123");

    cy.get("button[data-testid='button-register']").click();

    cy.contains(
      'div[data-testid="error-message"]',
      "email is already taken"
    ).should("be.visible");
  });
});
