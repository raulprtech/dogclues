const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000/guias/seleccion-fundadora');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const content = await page.content();
  if (content.includes('error-boundary-debug')) {
    console.log('FOUND CUSTOM ERROR BOUNDARY');
    const debugText = await page.$eval('#error-boundary-debug', el => el.textContent);
    console.log('DEBUG TEXT:', debugText);
  } else {
    console.log('NO ERROR BOUNDARY TEXT FOUND');
  }

  await browser.close();
})();
