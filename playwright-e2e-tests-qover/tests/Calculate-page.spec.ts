import { test, expect } from "@playwright/test";
import { UrlHelper } from "../helper";

test.describe("GIVEN User is on calculate page", () => {
    test.use({storageState: 'userData.json'})

    test("WHEN User enters correct data, THEN he should get redirected to price page", async ({
        page,
      }) => {
        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`(//input[@type='number'])[1]`);
        await page.fill(`(//input[@type='number'])[1]`, '18');
        await page.selectOption('select', 'Audi');
        await page.click(':nth-match(input[type="number"], 2)');
        await page.fill(':nth-match(input[type="number"], 2)', '5000');
        await page.click(`//button[@type='submit']`);
        
        expect(page.url()).toBe(UrlHelper.getUrl("/price"));
    });
  
    test("WHEN User does not ener any data, THEN error messages for empty fields should appear", async ({
      page
    }) => {
        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`//button[@type='submit']`);
        const visibleMsg1 = await page.isVisible(`//p[text()='Age should not be empty']`);
        const visibleMsg2 = await page.isVisible(`(//input[@type='number']/following-sibling::p)[2]`);

        expect(visibleMsg1).toBeTruthy();
        expect(visibleMsg2).toBeTruthy();
    });
  
    test("WHEN User do not enter age, THEN error message for empty field should appear", async ({
        page
      }) => {
        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.selectOption('select', 'Audi');
        await page.click(`(//input[@type='number'])[2]`);
        await page.fill(`(//input[@type='number'])[2]`, '5000');
        await page.click(`//button[@type='submit']`);

        const visible = await page.isVisible(`(//input[@type='number']/following-sibling::p)[1]`);
        expect(visible).toBeTruthy();
      });

      test("WHEN User do not enter price, THEN error message for empty field should appear", async ({
        page,
      }) => {

        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`(//input[@type='number'])[1]`);
        await page.fill(`(//input[@type='number'])[1]`, '18');
        await page.selectOption('select', 'Audi');
        await page.click(`//button[@type='submit']`);

        const visible = await page.isVisible(`(//input[@type='number']/following-sibling::p)[1]`);
        expect(visible).toBeTruthy();
      });

      test("WHEN User is too young, THEN error message should apear", async ({
        page,
      }) => {

        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`(//input[@type='number'])[1]`);
        await page.fill(`(//input[@type='number'])[1]`, '10');
        await page.selectOption('select', 'Audi');
        await page.click(`(//input[@type='number'])[2]`);
        await page.fill(`(//input[@type='number'])[2]`, '5000');
        await page.click(`//button[@type='submit']`);

        const visible = await page.isVisible(`(//input[@type='number']/following-sibling::p)[1]`);
        expect(visible).toBeTruthy();
      });

      test("WHEN User enters too low price, THEN error message should apear", async ({
        page,
      }) => {

        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`(//input[@type='number'])[1]`);
        await page.fill(`(//input[@type='number'])[1]`, '18');
        await page.selectOption('select', 'Audi');
        await page.click(`(//input[@type='number'])[2]`);
        await page.fill(`(//input[@type='number'])[2]`, '50');
        await page.click(`//button[@type='submit']`);

        const visible = await page.isVisible(`//p[text()='Sorry! The price of the car is too low']`);
        expect(visible).toBeTruthy();
      });

      test("WHEN User is too young and enter Porsche, THEN error message should apear", async ({
        page,
      }) => {

        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`(//input[@type='number'])[1]`);
        await page.fill(`(//input[@type='number'])[1]`, '18');
        await page.selectOption('select', 'Porsche');
        await page.click(':nth-match(input[type="number"], 2)');
        await page.fill(':nth-match(input[type="number"], 2)', '5000');
        await page.click(`//button[@type='submit']`);

        const visible = await page.isVisible(`(//input[@type='number']/following-sibling::p)[1]`);
        expect(visible).toBeTruthy();
      });
  });