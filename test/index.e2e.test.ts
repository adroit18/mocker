import { chromium, ElementHandle } from "playwright";
import { expect, test } from "@playwright/test";
import { logIn } from "./utils/logIn";
import { createNewDocument } from "./utils/createNewDocument";
import fetch from "node-fetch";
import https from "https";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
let browser;
let documentPage;
let frame;

test.describe("TextHighlightTextColor", async () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      slowMo: 50,
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

    documentPage.route("**/*.js*", async (route, request) => {
      let path = "";
      let content = "";
      let contentType = "";
      const url = request.url();
      if (url.includes("WordEditor.css")) {
        path = "./mocks/WordEditor.css";
      } else if (url.includes("EditSurface.css")) {
        path = "./mocks/EditSurface.css";
      } else if (url.includes("require.js")) {
        path = "./mocks/require.js";
      } else if (url.includes("WordEditorIntl.js")) {
        path = "./mocks/WordEditorIntl.js";
      } else if (url.includes("WoncaIntl.js")) {
        path = "./mocks/WoncaIntl.js";
      } else if (url.includes("jSanity.js")) {
        path = "./mocks/jSanity.js";
      } else if (url.includes("Compat.js")) {
        path = "./mocks/Compat.js";
      } else if (url.includes("CommonIntl.js")) {
        path = "./mocks/CommonIntl.js";
      } else if (url.includes("Box4Intl.js")) {
        path = "./mocks/Box4Intl.js";
      } else if (url.includes("wacBoot")) {
        try {
          var wacBootContent = await fetch(
            "https://localhost:8080/dist/wacBoot.js",
            { agent: httpsAgent }
          );
          content = await wacBootContent.text();
          contentType = "application/javascript; charset=UTF-8";
        } catch (e) {
          console.log(
            "https://localhost:8080/ not running fetching mocked wacBoot"
          );
        }
        if (!content) {
          path = "./mocks/wacBoot.min.js";
        }
      } else if (url.includes("MicrosoftAjaxDS.js")) {
        path =
          "C:/msft/1JS/ooui/packages/wac-microsoftajax/src/MicrosoftAjaxDS.js";
      } else if (url.includes("word.boot.js")) {
        path =
          "C:/msft/1JS/ooui/packages/office-online-jsapi/dist/word.boot.js";
      } else if (url.includes("midgardbootstrapper.js")) {
        path = "C:/msft/1JS/ooui/apps/word-online/dist/midgardbootstrapper.js";
      } else if (url.includes("suiteux.shell.core.js")) {
        path =
          "C:/msft/1JS/ooui/apps/word-online/dist/suiteux-shell/js/suiteux.shell.core.js";
      } else if (url.includes("suiteux.shell.plus.js")) {
        path =
          "C:/msft/1JS/ooui/apps/word-online/dist/suiteux-shell/js/suiteux.shell.plus.js";
      }

      if (path) {
        console.count(`${path}, Fetched from mock`);
        route.fulfill({
          path,
          headers: {
            "access-control-allow-origin": "*",
          },
        });
      } else if (content) {
        console.count(`${path}, Fetched from mock`);
        route.fulfill({
          status: 200,
          body: content,
          headers: {
            "access-control-allow-origin": "*",
          },
          contentType,
        });
      } else {
        route.continue();
      }
    });
    documentPage.route("**/RemoteUls.ashx*", (route, request) => {
      console.log("RemoteUls calls mocked");
      route.fulfill({ status: 200 });
    });
    documentPage.route("**/RemoteTelemetry.ashx*", (route, request) => {
      console.log("RemoteTelemetry calls mocked");
      route.fulfill({ status: 200 });
    });
    documentPage.route("**/*.woff*", (route, request) => {
      let path = "";
      const url = request.url();
      if (url.includes("fabric-icons")) {
        path = "./mocks/fabric-icons-0-467ee27f.woff";
      } else if (url.includes("sharedheaderplaceholder-icons")) {
        path = "./mocks/sharedheaderplaceholder-icons.woff";
      }
      if (path) {
        console.count(`${path}, Fetched from mock`);
        route.fulfill({
          path,
          headers: {
            "access-control-allow-origin": "*",
          },
        });
      } else {
        route.continue();
      }
    });
    documentPage.route("**/*.ico*", (route, request) => {
      let path = "";
      const url = request.url();
      if (url.includes("FavIcon_Word.ico")) {
        path = "./mocks/FavIcon_Word.ico";
      }
      if (path) {
        console.count(`${path}, Fetched from mock`);
        route.fulfill({
          path,
          headers: {
            "access-control-allow-origin": "*",
          },
        });
      } else {
        route.continue();
      }
    });
    documentPage.route("**/*.ashx*", (route, request) => {
      let path = "";
      const url = request.url();
      if (url.includes("AppSettingsHandler.ashx")) {
        path = "./mocks/AppSettingsHandler.ashx.json";
      }
      if (path) {
        console.count(`${path}, Fetched from mock`);
        route.fulfill({
          path,
          headers: {
            "access-control-allow-origin": "*",
          },
        });
      } else {
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
