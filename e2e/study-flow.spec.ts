import { expect, test } from '@playwright/test';

/**
 * Main learner journey: onboarding → lesson → exercise → quiz → persistence.
 * A fresh browser context has empty IndexedDB, so this runs as a new guest.
 */
test('nuovo utente: onboarding, prima lezione, progresso persistente', async ({ page }) => {
  await page.goto('/');

  // Onboarding
  await expect(page.getByRole('heading', { name: /Prima di iniziare/i })).toBeVisible();
  await page.getByLabel(/Come ti chiami/i).fill('Ada');
  await page.getByRole('button', { name: /Inizia dalla Settimana 1/i }).click();

  // Home
  await expect(page.getByRole('heading', { name: /Ciao, Ada/i })).toBeVisible();
  await page.getByRole('link', { name: /Riprendi la lezione|Apri il progetto finale|Riprendi/i }).first().click();

  // Lesson 1
  await expect(page.getByRole('heading', { name: 'Il primo comando' })).toBeVisible();
  await expect(page.getByText('Attivazione')).toBeVisible();

  // Complete the first exercise: replace the starter with the solution.
  const editor = page.locator('.cm-content').first();
  await editor.click();
  await page.keyboard.press('Control+a');
  await page.keyboard.insertText("console.log('Ciao, mondo');");
  await page.getByRole('button', { name: /Esegui il codice/i }).first().click();

  await expect(page.getByText(/Ottimo, esercizio completato/i)).toBeVisible();
  await expect(page.getByText('Completato').first()).toBeVisible();

  // Quiz: answer the first question correctly.
  await page.getByRole('button', { name: /3 \+ 4/ }).first().click();
  await expect(page.getByText(/Risposta corretta/i)).toBeVisible();

  // Reload: progress must survive in IndexedDB.
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Il primo comando' })).toBeVisible();
  await expect(page.getByText(/Progresso lezione/i)).toBeVisible();
  await expect(page.getByText('Completato').first()).toBeVisible();
});

test('mobile: navigazione e nessuno scroll orizzontale', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/Come ti chiami/i).fill('Ada');
  await page.getByRole('button', { name: /Inizia dalla Settimana 1/i }).click();

  await expect(page.getByRole('navigation', { name: /Navigazione principale/i }).last()).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  await page.goto('/course');
  await expect(page.getByRole('heading', { name: /Dodici settimane/i })).toBeVisible();
});
