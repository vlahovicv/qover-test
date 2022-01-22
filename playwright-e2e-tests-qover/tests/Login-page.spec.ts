import { test, expect } from "@playwright/test";
import { UrlHelper } from "../helper";

test.describe("GIVEN User is on login page", () => {
  test("WHEN User input correct login data, THEN user should get reditrected to /calculate", async ({
    page,
  }) => {
    await page.goto(UrlHelper.getUrl(""));
    await page.click('input[type="email"]');
    await page.fill('input[type="email"]', 'test2@gmail.com');
    await page.press('input[type="email"]', 'Tab');
    await page.fill('input[type="password"]', 'test2');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/calculate' }*/),
      page.press('input[type="password"]', 'Enter')
    ]);
    await page.context().storageState({ path: 'userData.json'})
    await page.goto(UrlHelper.getUrl("/calculate"));

    expect(page.url()).toBe(UrlHelper.getUrl("/calculate"));

  });

  test("WHEN User enters incorrect email, THEN error message should appear", async ({
    page,
  }) => {
    await page.goto(UrlHelper.getUrl(""));
    await page.click('input[type="email"]');
    await page.fill('input[type="email"]', 'test');
    await page.click('input[type="password"]');
    await page.fill('input[type="password"]', 'test');
    await page.click('text=Sign in to your account');
    await page.click('text=Please provide valid email address');
    const visible = await page.isVisible(`//input[@type='email']/following-sibling::p[1]`);
    expect(visible).toBeTruthy();
  });


  test("WHEN User enters not existing email, THEN error message for not existing email should apear", async ({
    page,
  }) => {
    await page.goto(UrlHelper.getUrl(""));
    await page.click('input[type="email"]');
    await page.fill('input[type="email"]', 'te2@gmail.com');
    await page.click('input[type="password"]');
    await page.fill('input[type="password"]', 'test');
    await page.click('text=Sign in to your account');
    const visible = await page.isVisible(`//input[@type='email']/following-sibling::p[1]`);
    expect(visible).toBeTruthy();
  });


  test("WHEN User enters incorrect password, THEN error message for password should appear", async ({
    page,
  }) => {
    await page.goto(UrlHelper.getUrl(""));
    await page.click('input[type="email"]');
    await page.fill('input[type="email"]', 'test2@gmail.com');
    await page.click('input[type="password"]');
    await page.fill('input[type="password"]', 'wrongPassword');
    await page.click('text=Sign in to your account');
    const visible = await page.isVisible(`//input[@type='password']/following-sibling::p[1]`);
    expect(visible).toBeTruthy();
  });
});





