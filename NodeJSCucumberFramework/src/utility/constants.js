class Constants {
  getLongWait() { return 60000; }
  getMediumWait() { return 20000; }
  getShortWait() { return 5000; }

  getBaseUrl() {
    const env = process.env.TEST_ENV;
    if (env == "prod") {
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