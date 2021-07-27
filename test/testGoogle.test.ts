// import { chromium, ElementHandle } from 'playwright';
// import { expect, test } from '@playwright/test';

// let browser,  page

// //browser = createMockServer()


// test('Automation', async () =>{
//     browser = await chromium.launch({ headless: false, devtools: true});
//     page = await browser.newPage();
//     // page.on('request', request =>
//     // console.log('>>', request.method(), request.url()))

//     // page.on('response', response =>{
//     //     console.log("-----------------------start---------------------------------------");
//     //     console.log(response.url());
//     //     console.log("--------------------------------------------------------------");
//     //     console.log(response.text());
//     //     console.log("-------------------------end-------------------------------------");
//     // })

//     // Log and continue all network requests
//     page.route('**', (route, request) => {
//         //localhost:5000 
//         route.fulfill({ path: 'mock_data.json' });
//         // route.fulfill({
//         //     status: 404,
//         //     contentType: 'text/plain',
//         //     body: 'Not Found!'
//         // });
//     });
    
//     await page.goto('https://www.google.com')

//     var a = new Promise((res, rej) => {
//         setTimeout(()=>{res('');}, 100000000);
//     })
//     await a;
// })