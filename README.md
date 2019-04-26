# webdriverio-component-keyword
A WebDriverIO project that supports web and mobile app test automation. The framework implements a hybrid, keyword-driven page component pattern, which makes adding locators as simple as placing two strings in a JSON file and filling in a Cucumber step.

## Tech Stack 
* Javascript (ES6)
* NodeJS
* WebDriverIO
* CucumberJS

## VSCODE
* VScode is the recommended IDE/Text Editor for this project.
* Use any VScode Extensions. Some recommended Extensions for the Framework are: 
* Cucumber(Gherkin) Full Support: https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete
* Gherkin step autocomplete: https://marketplace.visualstudio.com/items?itemName=silverbulleters.gherkin-autocomplete
* ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* DotENV: https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv
* Excel to Markdown table: https://marketplace.visualstudio.com/items?itemName=csholmq.excel-to-markdown-table

## Getting Started
Add the following tools to your environment:

* NodeJS
* 1. Install node.js from: https://nodejs.org/en/download/
* 2. Choose LTS or CURRENT to Download.
* 3a. LTS - Install all the required tools and configurations using Microsoft's windows-build-tools using: `npm install --global production windows-build-tools` from an elevated         PowerShell or CMD.exe (run as Administrator). 
* 3b. CURRENT - Current build of NodeJS will automatically launch and execute `npm install --global production windows-build-tools`
* Android Studio (optional)
* 1. If running android emulators, install Android Studio: https://developer.android.com/studio/
* 2. Create an Android Emulator following: https://developer.android.com/studio/run/managing-avds
* Chrome Dev Tools (optional) - Necessary to inspect elements elements for UI selectors.

Once your tools are configured, download the project and navigate to the root directory. 

* Run: `npm install`
* If everything built successfully, you're ready to run tests.

## Running Tests
* For this framework you need to set your environment variables and Credentials.
* Set Environment Variable and Credentials in the .env file. Call with `process.env.<VARIABLENAME>`.
* Environment Variable DEMOTIME will add a pause between steps in the test to slow it down for demo purposes. Set "0" to run at normal speed.
* `npm run <BROWSER>` <BROWSER> can be chrome, firefox, edge, ie11, safari, androidEmulator, iphoneSimulator and others (full list in capabilities.json).

## Results, Reporting, and Screenshots.
* Results Directory is Deleted before every test exectution.
* Results are Created again and populated with results info after the test.
* Screenshots are created on Test Failures for reference.
* Screenshots taken on command with the proper step/method are saved in the same location with a different name.