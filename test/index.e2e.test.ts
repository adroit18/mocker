import { chromium, ElementHandle } from "playwright";
import { expect, test } from "@playwright/test";
import { logIn } from "./utils/logIn";
import { createNewDocument } from "./utils/createNewDocument";

let browser;
let documentPage;
let frame;

test.describe("TextHighlightTextColor", async () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      slowMo: 200,
      devtools: false,
    });
    const initialPage = await browser.newPage();

    expect(testCredentials.email).toBeTruthy();
    expect(testCredentials.password).toBeTruthy();

    await logIn(
      initialPage,
      "https://www.officeppe.com/launch/word?auth=2",
      testCredentials.email,
      testCredentials.password
    );

    // Create new document
    documentPage = await createNewDocument(initialPage);

    documentPage.route("**.js*", (route, request) => {
      let path = "";
      const url = request.url();
      if (url.includes("require.js")) {
        path = "./mocks/require.js";
      } else if (url.includes("WordEditorIntl.js")) {
        path = "./mocks/WordEditorIntl.js";
      } else if (url.includes("word.boot.js")) {
        path = "./mocks/word.boot.js";
      } else if (url.includes("WoncaIntl.js")) {
        path = "./mocks/WoncaIntl.js";
      } else if (url.includes("MicrosoftAjaxDS.js")) {
        path = "./mocks/MicrosoftAjaxDS.js";
      } else if (url.includes("jSanity.js")) {
        path = "./mocks/jSanity.js";
      } else if (url.includes("WordEditor.css")) {
        path = "./mocks/WordEditor.css";
      } else if (url.includes("EditSurface.css")) {
        path = "./mocks/EditSurface.css";
      } else if (url.includes("Compat.js")) {
        path = "./mocks/Compat.js";
      } else if (url.includes("CommonIntl.js")) {
        path = "./mocks/CommonIntl.js";
      } else if (url.includes("Box4Intl.js")) {
        path = "./mocks/Box4Intl.js";
      } 
      if(path){
        console.count(`${path}, Fetched from mock`);
        route.fulfill({
          path,
          headers: {
            "access-control-allow-origin": "*",
          },
        });
      } else{
        route.continue();
      }
    });
  });

  test("change color", async () => {
    var a = new Promise((res, rej) => {
      setTimeout(() => {
        res("");
      }, 100000000);
    });
    await a;
  });
});
