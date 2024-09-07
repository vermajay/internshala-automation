require('dotenv').config();
const puppeteer = require('puppeteer');

const { COVER_LETTER, generateAnswer } = require('./constants/index.js');

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      defaultViewport: null,
    });

    //get instance of page
    const [page] = await browser.pages();
  
    // Navigate the page to internshala login
    await page.goto('https://internshala.com/login/user', {waitUntil: 'networkidle2'});
    
    // Fill the login credentials
    await page.type('#email', `${process.env.INTERNSHALA_EMAIL}`, {delay: 70});
    await page.type('#password', `${process.env.INTERNSHALA_PASSWORD}`, {delay: 70});
    
    // Click the login button
    let buttonSelector = '#login_submit';
    await page.waitForSelector(buttonSelector, { visible: true });
    await page.click(buttonSelector);

    // Wait for network to become idle so that it logs in the user properly
    await page.waitForNetworkIdle();

    // Navigate the page to work from home internships section
    await page.goto('https://internshala.com/internships/work-from-home-internships/', {waitUntil: 'networkidle2'});

    //fill internship profile and press "Enter" key
    const profileInputElement = await page.$('input[value="e.g. Marketing"]');
    await profileInputElement.type(' Node.js Development\n', {delay: 50});

    await page.waitForNetworkIdle();

    console.log("Starting to apply for internships")
    try {
      // Wait for the internship list container
      await page.waitForSelector('.internship_meta', { timeout: 60000 });

      let internships = await page.$$('#internship_list_container_1 .internship_meta');

      if (internships.length === 0) {
        console.log('No internships found. The page might not have loaded correctly.');
        //close the browser
        await browser.close();
        return;
      }

      let internshipsToApply = Math.min(internships.length, 3);

      while(internshipsToApply > 0){ //internship array size reduces as we fill the internships

        const internship = internships[0];

        // Wait for 2 seconds before proceeding
        await new Promise(resolve => setTimeout(resolve, 2000));

        await internship.click();

        await page.waitForNetworkIdle();
        
        buttonSelector = '.continue_container button';
        await page.waitForSelector(buttonSelector, { visible: true });
        await page.click(buttonSelector);

        await page.waitForNetworkIdle();
        
        //fill the cover letter
        const coverLetterElement = await page.$('#cover_letter_holder .ql-editor.ql-blank');
        await coverLetterElement.type(COVER_LETTER);

        // Check if assessment questions exist
        const hasAssessmentQuestions = await page.$('.additional_question') !== null;
        
        if(hasAssessmentQuestions){
          //answer all the Assessment questions
          await page.waitForSelector('.additional_question', { timeout: 60000 });
          let assessment_questions = await page.$$('.additional_question');

          console.log("Assessment Questions: ", assessment_questions.length);

          for (let i = 0; i < assessment_questions.length; i++) {
            
            const questionText = await assessment_questions[i].$eval('.assessment_question label', el => el.textContent.trim());

            const answer = generateAnswer(questionText);

            console.log("\nQuestion: ", questionText);
            console.log("\nAnswer: ", answer);

            const answerElement = await assessment_questions[i].$('textarea');
            await answerElement.type(answer, {delay: 2});
          }
        } else {
          console.log("\nNo assessment questions for this internship.");
        }


        //click on submit button
        buttonSelector = 'input[type="submit"][value="Submit"]';
        await page.waitForSelector(buttonSelector, { visible: true });
        await page.click(buttonSelector);

        await page.waitForNetworkIdle();

        //click apply to more internships button
        buttonSelector = '.application_submit_success a#backToInternshipsCta';
        await page.waitForSelector(buttonSelector, { visible: true });
        await page.click(buttonSelector);

        internshipsToApply--;

        await page.waitForNetworkIdle();

        //wait for the internships to load
        await page.waitForSelector('.internship_meta', { timeout: 60000 });
        internships = await page.$$('#internship_list_container_1 .internship_meta');
      }

      console.log("Applied to all the internships");


    } catch (error) {
      console.error('An error occurred while processing internships:', error);
    }


    //close the browser
    await browser.close();

})();