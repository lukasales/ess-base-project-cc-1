import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página {string}", (url: string) => {
  cy.visit(url);
});

Then("deve exibir o título {string}", (title: string) => {
  cy.contains(title).should("be.visible");
});

Then("deve exibir o subtítulo {string}", (subtitle: string) => {
  cy.contains(subtitle).should("be.visible");
});

Given("que o endpoint retorna nenhum vídeo", () => {
  cy.intercept("GET", "**/users/1/history", { body: { data: [] } }).as("getEmptyHistory");
});

When("a página de histórico for carregada", () => {
  cy.wait("@getEmptyHistory");
});

Then("deve aparecer a mensagem {string}", (mensagem: string) => {
  cy.contains(mensagem).should("be.visible");
});

Given("que o endpoint retorna 4 vídeos, incluindo {string}", (videoTitle: string) => {
  const mockHistory = { data: ["101", "102", "103", "104"] };
  cy.intercept("GET", "**/users/1/history", mockHistory).as("getHistory");


  cy.intercept("GET", "**/videos/*", (req) => {
    const videoId = req.url.split("/").pop();
    if (videoId === "104") {
      req.reply({ body: { data: { videoId: "104", titulo: "Pearl" } } });
    } else if (videoId === "101") {
      req.reply({ body: { data: { videoId: "101", titulo: "Stranger Things - Piloto" } } });
    } else if (videoId === "102") {
      req.reply({ body: { data: { videoId: "102", titulo: "Breaking Bad - Piloto" } } });
    } else {
      req.reply({ body: { data: { videoId: "103", titulo: "Homem-Aranha: Através do Aranha Verso" } } });
    }
  }).as("getVideos");
});

When("eu digitar {string} no campo de pesquisa", (termo: string) => {
  cy.get("input[placeholder='Pesquisar']").clear().type(termo);
});

When("clicar no botão de pesquisa", () => {
  cy.get("button").contains("🔍").click();
});

Then("deve exibir apenas o card do vídeo {string}", (videoTitle: string) => {
  cy.contains(videoTitle).should("be.visible");
  cy.get("h3").should("have.length", 1);
});

Given("que o endpoint retorna mais de 2 vídeos", () => {
  const mockHistory = { data: ["101", "102", "103", "104"] };
  cy.intercept("GET", "**/users/1/history", mockHistory).as("getLongHistory");
});

When("estiver na primeira página", () => {
  cy.wait("@getLongHistory");
});

Then("o botão {string} deve estar desabilitado", (buttonLabel: string) => {
  cy.contains("button", buttonLabel).should("be.disabled");
});

Then("o botão {string} deve estar habilitado", (buttonLabel: string) => {
  cy.contains("button", buttonLabel).should("not.be.disabled");
});

When("clicar no botão {string}", (buttonLabel: string) => {
  cy.contains("button", buttonLabel).click();
});

Then("deve carregar a segunda página do histórico", () => {

  cy.contains("Homem-Aranha: Através do Aranha Verso").should("be.visible");
});

Then("se não houver mais páginas seguintes", () => {
});

Then("o botão {string} deve ficar desabilitado", (buttonLabel: string) => {
  cy.contains("button", buttonLabel).should("be.disabled");
});

Then("deve voltar para a página anterior", () => {
  cy.contains("Stranger Things - Piloto").should("be.visible");
});

When("clicar no link {string}", (textLink: string) => {
  cy.contains("a", textLink).click();
});

Then("deve navegar para a página {string}", (expectedUrl: string) => {
  cy.url().should("include", expectedUrl);
});

Given("que o endpoint retorna múltiplos vídeos", () => {
  const mockHistory = { data: ["101", "102", "103"] };
  cy.intercept("GET", "**/users/1/history", mockHistory).as("multipleHistory");
  cy.intercept("GET", "**/videos/*", (req) => {
    const vid = req.url.split("/").pop();
    if (vid === "101") {
      req.reply({ body: { data: { videoId: "101", titulo: "Stranger Things - Piloto" } } });
    } else if (vid === "102") {
      req.reply({ body: { data: { videoId: "102", titulo: "Breaking Bad - Piloto" } } });
    } else {
      req.reply({ body: { data: { videoId: "103", titulo: "Pearl" } } });
    }
  }).as("getVideos");
});

When("eu apagar o campo de pesquisa", () => {
  cy.get("input[placeholder='Pesquisar']").clear();
});

Then("deve voltar a mostrar todos os vídeos", () => {
  cy.contains("Stranger Things - Piloto").should("be.visible");
  cy.contains("Breaking Bad - Piloto").should("be.visible");
  cy.contains("Pearl").should("be.visible");
});

Then("deve exibir a primeira página do histórico", () => {

});

Given("que o endpoint retorna pelo menos um vídeo {string}", (title: string) => {
  const mockHistory = { data: ["101"] };
  cy.intercept("GET", "**/users/1/history", mockHistory).as("oneVideo");
  cy.intercept("GET", "**/videos/101", {
    body: { data: { videoId: "101", titulo: title } },
  }).as("getOneVideo");
});

When("eu clicar no card {string}", (videoTitle: string) => {
  cy.contains(videoTitle).click();
});

Then("deve navegar para a página {string}", (expectedUrl: string) => {
  cy.url().should("include", expectedUrl);
});

Then("deve exibir um campo de pesquisa", () => {
  cy.get('input[placeholder="Pesquisar"]').should("be.visible");
});

Then("deve exibir o botão de pesquisa {string}", (symbol) => {
  cy.contains(symbol).should("be.visible");
});

Then("deve exibir o botão {string}", (buttonLabel) => {
  cy.contains("button", buttonLabel).should("be.visible");
});