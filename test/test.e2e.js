const path = require('path');
const { fork } = require('child_process');
const puppeteer = require('puppeteer');

const mockData = require('./fixture/data/hubname/hubname_ALL_api#test1/scene/default');
const port = 7788;
let browser, page, child;

beforeAll(async () => {
  // start umi dev server
  child = fork(
    path.join(__dirname, '../node_modules/umi/bin/umi.js'),
    ['dev', '--port', port, '--cwd', path.join(__dirname, './fixture')],
    {
      env: {
        ...process.env,
        BROWSER: 'none',
        PROGRESS: 'none',
        UMI_UI: 'none',
        UMI_UI_SERVER: 'none',
      },
      silent: true,
    },
  );

  // create browser
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  
  // wait for dev server ready
  await new Promise((resolve) => {
    child.on('message', (arg) => {
      if (arg.type === 'DONE') {
        resolve();
      }
    });
  });
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterAll(() => {
  browser.close();
  child.kill('SIGINT');
});

test('page should fetch data successfully from datahub', async () => {
  await page.goto(`http://localhost:${port}`);
  await page.waitForSelector('p');

  const text = await page.evaluate(
    () => document.querySelector('p').innerHTML,
  );
  expect(new RegExp(`${mockData.data.foo}$`).test(text)).toBeTruthy();
});