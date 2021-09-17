const path =  require('path');
const { writeFile } =  require('fs-extra');
const puppeteerCore =  require('puppeteer-core');

const STORYBOOK_HOST = "https://innovaccer.github.io/design-system/iframe.html?id=components-avatar-all--all&args=&viewMode=story"

// const express =  require('express');
// const getPort =  require('get-port');

const read = async (url) => {
    const browser = await usePuppeteerBrowser();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForFunction('window.__STORYBOOK_STORY_STORE__ && window.__STORYBOOK_STORY_STORE__.extract && window.__STORYBOOK_STORY_STORE__.extract()');
    const data = JSON.parse(await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        return JSON.stringify(window.__STORYBOOK_STORY_STORE__.getDataForManager()['stories'], null, 2);
    }));
    setImmediate(() => {
        browser.close();
    });
    return data;
};
const useLocation = async (input) => {
    if (input.match(/^http/)) {
        return [input, async () => { }];
    }
    // const app = express();
    // app.use(express.static(input));
    // const port = await getPort();
    // return new Promise((resolve) => {
    //     const server = app.listen(port, () => {
    //         const result = `http://localhost:${port}/iframe.html`;
    //         console.log(`connecting to: ${result}`);
    //         resolve([result, server.close.bind(server)]);
    //     });
    // });
};
const usePuppeteerBrowser = async () => {
    const args = ['--no-sandbox ', '--disable-setuid-sandbox'];
    try {
        return await puppeteerCore.launch({ args });
    }
    catch (e) {
        // it's not installed
        console.log('installing puppeteer...');
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line global-require
            require('child_process').exec(`node ${require.resolve(path.join('puppeteer-core', 'install.js'))}`, (error) => (error ? reject(error) : resolve(puppeteerCore.launch({ args }))));
        });
    }
};
async function extract(input, targetPath) {
    if (input && targetPath) {
        const [location, exit] = await useLocation(input);
        const data = await read(location);
        await writeFile(targetPath, JSON.stringify(data, null, 2));
        await console.log('stories exported json data saved');
        await exit();
    }
    else {
        throw new Error('Extract: please specify a path where your built-storybook is (can be a public url) and a target directory');
    }
}


extract(STORYBOOK_HOST, path.join(__dirname, '../src/data', 'stories.json'))
.then(console.log)
.catch(console.log)

