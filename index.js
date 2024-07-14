require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      defaultViewport: null,
    });

    const [page] = await browser.pages();
  
    // Navigate the page to internshala login
    await page.goto('https://internshala.com/login/user', {waitUntil: 'networkidle2'});
    
    // Fill the login credentials
    await page.type('#email', `${process.env.INTERNSHALA_EMAIL}`, {delay: 100});
    await page.type('#password', `${process.env.INTERNSHALA_PASSWORD}`, {delay: 100});
    
    // Click the login button
    const buttonSelector = '#login_submit';
    await page.waitForSelector(buttonSelector, { visible: true });
    await page.click(buttonSelector);

    // // Wait for network to become idle so that it logs in the user properly
    await page.waitForNetworkIdle();

    // // Navigate the page to internships
    await page.goto('https://internshala.com/internships/', {waitUntil: 'networkidle2'});


    //close the browser
    // await browser.close();




//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

})();