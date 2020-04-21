const puppeteer = require("puppeteer");

async function main(email, pass) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1440,900"],
    });

    const context = browser.defaultBrowserContext();

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto("https://facebook.com");

    await page.waitForSelector("input[data-testid=royal_email]", {
      visible: true,
    });
    await page.click("input[data-testid=royal_email]" || "#email");
    await page.type("#email", email);

    await page.waitForSelector("input[data-testid=royal_pass]" || "#pass", {
      visible: true,
    });
    await page.click("input[data-testid=royal_pass]" || "#pass");
    await page.type("input[data-testid=royal_pass]", pass);

    await page.waitForSelector("input[data-testid=royal_login_button]", {
      visible: true,
    });
    await page.click("input[data-testid=royal_login_button]");

    const url = page.url();

    await context.overridePermissions(url, ["notifications"]);

    const ulNames = await page.waitForXPath(
      '//div[@class="fbChatOrderedList clearfix"]/div/div[4]/ul',
      { visible: true }
    );
    const names = await ulNames.$$eval("li", (li) =>
      li.map((item) => item.innerText)
    );

    // const r = await page.evaluate(list => {
    //   console.log(list);
    //   return list.map(item => item.innerText);
    // }, ulNames);
    // console.log(r);

    // await page.waitForSelector(
    //   '#u_0_21 > div > div > div:nth-child(4) > ul > li',
    //   {
    //     visible: true
    //   }
    // );

    // const names = await page.$$eval(
    //   '#u_0_21 > div > div > div:nth-child(4) > ul > li',
    //   lis => lis.map(li => li.innerText)
    // );

    await browser.close();

    return names;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { main };
