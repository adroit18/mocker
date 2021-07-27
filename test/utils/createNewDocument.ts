export async function createNewDocument(page): Promise<any> {
  const [newDocumentPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('a:has-text("New blank document")'),
  ]);

  return newDocumentPage;
}
