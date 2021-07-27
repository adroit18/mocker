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

    documentPage.route("**/Box4Intl.js*", (route, request) => {
      console.count("Box4Intl.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/Box4Intl.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/CommonIntl.js*", (route, request) => {
      console.count("CommonIntl.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/CommonIntl.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/Compat.js*", (route, request) => {
      console.count("Compat.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/Compat.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/EditSurface.css*", (route, request) => {
      console.count("EditSurface.css, Fetched from mock");
      route.fulfill({
        path: "./mocks/EditSurface.css",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/WordEditor.css*", (route, request) => {
      console.count("WordEditor.css, Fetched from mock");
      route.fulfill({
        path: "./mocks/WordEditor.css",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/jSanity.js*", (route, request) => {
      console.count("jSanity.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/jSanity.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/MicrosoftAjaxDS.js*", (route, request) => {
      console.count("MicrosoftAjaxDS.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/MicrosoftAjaxDS.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/WoncaIntl.js*", (route, request) => {
      console.count("WoncaIntl.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/WoncaIntl.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/word.boot.js*", (route, request) => {
      console.count("word.boot.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/word.boot.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/WordEditorIntl.js*", (route, request) => {
      console.count("WordEditorIntl.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/WordEditorIntl.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
    });
    documentPage.route("**/require.js*", (route, request) => {
      console.count("require.js, Fetched from mock");
      route.fulfill({
        path: "./mocks/require.js",
        headers: {
          "access-control-allow-origin": "*",
        },
      });
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
