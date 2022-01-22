import { test, expect } from "@playwright/test";
import { UrlHelper } from "../helper";

test.describe("GIVEN User is on price page", () => {
    test.use({storageState: 'userData.json'})
  
    test("WHEN User select diffrent plan, THEN plan should get selected", async ({
      page
    }) => {
        await page.goto(UrlHelper.getUrl("/price"));
        await page.click(`//button[text()='Choose this plan']`);
        const innerText = await page.textContent(`(//button[@type='submit'])[1]`)

        await page.click(`//button[text()='Choose this plan']`);
        const innerText2 = await page.textContent(`(//button[@type='submit'])[2]`)

        expect(innerText).toBe('Plan Selected');
        expect(innerText2).toBe('Plan Selected');
    });

    test("WHEN User change betweem yearly and monhly pay, THEN price should change", async ({
        page
      }) => {
        await page.goto(UrlHelper.getUrl("/calculate"));
        await page.click(`(//input[@type='number'])[1]`);
        await page.fill(`(//input[@type='number'])[1]`, '18');
        await page.selectOption('select', 'Audi');
        await page.click(':nth-match(input[type="number"], 2)');
        await page.fill(':nth-match(input[type="number"], 2)', '5000');
        await page.click(`//button[@type='submit']`);

        const innerTextBefore = await page.textContent(`(//div[@class='DisplayPrice_priceWithSign__-wmXH']//h1)[1]`);
        const innerTextBefore2 = await page.textContent(`(//div[@class='DisplayPrice_priceWithSign__-wmXH']//h1)[2]`);

        await page.click(`//input[@type='checkbox']/following-sibling::span[1]`);

        const innerTextAfter = await page.textContent(`(//div[@class='DisplayPrice_priceWithSign__-wmXH']//h1)[1]`);
        const innerTextAfter2 = await page.textContent(`(//div[@class='DisplayPrice_priceWithSign__-wmXH']//h1)[2]`);

        expect(innerTextBefore).not.toBe(innerTextAfter);
        expect(innerTextBefore2).not.toBe(innerTextAfter2);
      });
  });