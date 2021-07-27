export async function logIn(page, url: string, email: string, password: string): Promise<void> {
  await page.goto(url);

  try {
    // Try to click the "Sign in button", or the "email" field
    await page.click('[data-task],input[type=email]');
  } catch (err) {
    // ...
  }

  // Enter the email + password
  await page.type('input[type=email]', email);

  await page.click('input[type=submit][value=Next]');
  await page.type('input[type=password]', password);
  try {
    await page.click("input[type=submit][value='Sign in']");
  } catch (err) {
    // The password submission might fail for timing reasons
  }

  const errorOrConfirmationElement = await page.waitForSelector('#passwordError,input[type=submit][value=Yes]');
  const errorOrConfirmationValue = await errorOrConfirmationElement.getAttribute('value');
  if (errorOrConfirmationValue !== 'Yes') {
    await page.type('input[type=password]', password);
    await page.click("input[type=submit][value='Sign in']");
  }

  // Confirm "Stay logged in" if the button is available
  try {
    await page.click("input[type=submit][value='Yes']");
    await page.waitForLoadState();
  } catch (err) {
    // Some login forms do NOT have the "Stay logged in" step
  }
}
