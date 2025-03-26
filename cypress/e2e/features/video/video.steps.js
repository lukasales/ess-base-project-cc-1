import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página {string}", (url: string) => {
  cy.intercept("GET", "**/videos/101", {
    body: {
      data: {
        videoId: "101",
        titulo: "Stranger Things - Piloto",
        videoLink: "https://www.youtube.com/watch?v=RMmGQNNl164"
      },
    },
  }).as("getVideo101");

  cy.visit(url);
});


Then("deve exibir o título {string}", (title: string) => {
  cy.contains(title).should("be.visible");
});

Then("deve exibir o subtítulo {string}", (subtitle: string) => {
  cy.contains(subtitle).should("be.visible");
});


When("eu clicar no link {string}", (linkText: string) => {
  cy.contains("a", linkText).click();
});

Then("deve navegar para a página {string}", (expectedUrl: string) => {
  cy.url().should("include", expectedUrl);
});



Then("deve exibir o botão {string}", (btnLabel: string) => {
  cy.contains("button", btnLabel).should("be.visible");
});

When("clicar no botão {string}", (btnLabel: string) => {
  cy.contains("button", btnLabel).click();
});


Then("deve exibir um campo de pesquisa", () => {
  cy.get("input[placeholder='Pesquisar']").should("be.visible");
});

Then("deve exibir o botão de pesquisa {string}", (symbol: string) => {
  cy.contains(symbol).should("be.visible");
});


When("a página de vídeo for carregada", () => {
  cy.wait("@getVideo101");
});

Then("deve exibir um player de vídeo do YouTube", () => {
  cy.get("iframe")
    .should("be.visible")
    .and("have.attr", "src")
    .and("contain", "youtube.com");
});

Then("deve exibir o botão {string}", (text: string) => {
  cy.contains("button", text).should("be.visible");
});

When("clicar no botão {string}", (text: string) => {
  cy.contains("button", text).click();
});

Then("o vídeo deve começar a tocar", () => {
  cy.contains("button", "Pause").should("be.visible");
});

Then("o vídeo deve pausar", () => {
  cy.contains("button", "Play").should("be.visible");
});



Then("o botão {string} deve ficar vermelho ao passar o mouse", (btnText: string) => {
  cy.contains("button", btnText).trigger("mouseover");

  cy.contains("button", btnText)
    .should("have.css", "background-color")
    .and("match", /rgb\(\d+, 0, 0\)/);
});

When("eu clicar no botão {string}", (btnText: string) => {
  cy.contains("button", btnText).click();
});

Then("ele deve ficar vermelho permanentemente", () => {

  cy.focused()
    .should("have.css", "background-color")
    .and("match", /rgb\(\d+, 0, 0\)/);
});


Then("deve copiar o link do vídeo para a área de transferência", () => {

  cy.get("@clipboardCopy").should("have.been.calledOnce");

  cy.get("@clipboardCopy").should(
    "have.been.calledWith",
    "https://www.youtube.com/watch?v=RMmGQNNl164"
  );
});

Then("deve exibir o botão {string}", (btnLabel) => {
  cy.contains("button", btnLabel).should("be.visible");
});