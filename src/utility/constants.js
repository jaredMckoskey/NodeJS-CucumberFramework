import { pathToFileURL } from "url";

class Constants {
  getLongWait() { return 60000; }
  getMediumWait() { return 20000; }
  getShortWait() { return 5000; }

  getBaseUrl() {
    const env = process.env.TESTENV.toLowerCase();
    if (env == "qa") {
      return "";
    } else if (env == "demo") {
      return "";
    } else {
      return "";
    }
  }

  getLocatorPath() {
    let pagePath = process.cwd() + "/src/locators/";
    const product = process.env.PRODUCT;
    if (product === undefined) {
      //TODO: Get correct product name from client
      return pagePath + "";
    } else {
      return pagePath + product + "/";
    }
  }

  findFile(dir, file) {
    const path = require("path");
    const find = require("find");
    console.log(dir);
    console.log(find.fileSync(dir, function(file) {
      return path.resolve(file).toString();
    }));
    find.fileSync(dir, function(file) {
      return path.resolve(file).toString();
    });
    // const findUp = require("find-up");
    // console.log(findUp.sync(file));
    // return findUp.sync(file);
  }
  
  getDBInfoPath() {
    let pagePath = process.cwd() + "/src/database/connectionInfo.json";
    const product = process.env.PRODUCT;
    if (product === undefined) {
    //TODO: Get correct product name from client
      return pagePath + "";
    } else {
      return pagePath + product + "/";
    }
  }
}
export default new Constants();