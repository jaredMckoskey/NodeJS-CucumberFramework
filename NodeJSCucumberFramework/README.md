# webdriverio-component-keyword
A WebDriverIO project that supports web and mobile app test automation. The framework implements a hybrid, keyword-driven page component pattern, which makes adding locators as simple as placing two strings in a JSON file and filling in a Cucumber step.

## Tech Stack 
* Javascript (ES6)
* NodeJS
* WebDriverIO
* CucumberJS

## Getting Started
Add the following tools to your environment:

* NodeJS
* 1. Install node.js from: https://nodejs.org/en/download/
* 2. Install all the required tools and configurations using Microsoft's windows-build-tools using: `npm install --global production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).
* Android Studio (optional)
* 1. If running android emulators, install Android Studio: https://developer.android.com/studio/
* 2. Create an Android Emulator following: https://developer.android.com/studio/run/managing-avds
* Chrome Dev Tools (optional) - Necessary to inspect elements elements for UI selectors.

Once your tools are configured, download the project and navigate to the root directory. 

* Run: `npm install`
* If everything built successfully, you're ready to run tests.

## Running Tests
* For this framework you need to set your environment variables for USER and PASS.
* Windows - In order to set those Variables use the following command `$ENV:USER="<IPS_USERNAME>"`and `$ENV:PASS="<IPS_PASS>"`
* MacOS/Linux - Set the Variables within the commandline run: `USER="<USER> PASS=<Pas> npm run chrome"`
* To use local user or password set `LOCALUSER=<LOCAL_CREDS>` and `LOCALPASS=<LOCAL_PASS>`as your environment variable then change your login steps from `envUser` and `envPass>`in the feature files to `localUser` and `localPass`
* `npm run <BROWSER>` <BROWSER> can be chrome, firefox, edge, ie11, safari, androidEmulator, iphoneSimulator and others (full list in capabilities.json)
