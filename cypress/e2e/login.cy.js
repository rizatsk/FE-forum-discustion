/**
 * skenario test
 *
 *  - Login spec
 *    - should display login page correctly
 *    - should display error message when email, and password is empty
 *    - should display alert when account not have
 *    - should display homepage when success login
 *    - should cliked daftar disini direct to page register
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    cy.viewport("macbook-16");
  });

  it("should display login page correctly", () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[data-testid="input-email"]').should("be.visible");
    cy.get('input[data-testid="input-password"]').should("be.visible");
    cy.get("button[data-testid='button-masuk']").should("be.visible");
  });
  it("should display error message when email, and password is empty", () => {
    cy.get("button[data-testid='button-masuk']").click();

    cy.contains("p[data-testid='error-email']", "Email belum dimasukan").should(
      "be.visible"
    );
    cy.contains(
      "p[data-testid='error-password']",
      "Password belum dimasukan"
    ).should("be.visible");
  });
  it("should display alert when account not have", () => {
    cy.get('input[data-testid="input-email"]').type("test@gmail.com");
    cy.get('input[data-testid="input-password"]').type("ngasal");

    cy.get("button[data-testid='button-masuk']").click();

    cy.contains(
      'div[data-testid="error-message"]',
      "email or password is wrong"
    ).should("be.visible");
  });
  it("should display homepage when success login", () => {
    cy.get('input[data-testid="input-email"]').type("rizatsakmir@gmail.com");
    cy.get('input[data-testid="input-password"]').type("amir00734");

    cy.get("button[data-testid='button-masuk']").click();

    cy.get("h2")
      .contains(/^Diskusi$/)
      .should("be.visible");
    cy.get("button").contains("Logout").should("be.visible");
  });
  it("should cliked daftar disini direct to page register", () => {
    cy.get("a[data-testid='link-register']").click();

    cy.contains("h2", /Membuat akun anda/i).should("be.visible");
  });
});
