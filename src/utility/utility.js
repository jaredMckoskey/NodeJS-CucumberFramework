/* eslint-disable no-unused-vars */
class Utility {
  getPage(page) {
    //TODO: Leaving in place for flexibility
    // switch (page.toUpperCase()) {
    //   case "HOME":
    //     return HomePage;
    //   case "LOGIN":
    //     return LoginPage;
    //   default:
    //     console.log("ERROR: could not find page. Is it implemented?");
    //     return null;
    //}
    // TODO: Evaluating need
    // global.pageContext = "";
    // global.checkPageContext = function () {
    //   if (pageContext === "") {
    //     return "Set Page Context with -->Given I am on page 'Page Name' and fail test"
    //   }
    // }
  }

  getStateCode() {
    let pagePath = process.cwd() + "/src/database/stateCodes.json";
    const product = process.env.PRODUCT;
    if (product === undefined) {
    //TODO: Get correct product name from client
      return pagePath + "";
    } else {
      return pagePath + product + "/";
    }
  }

  todaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd = `0${dd}`;
    } 
    if(mm<10) {
      mm = `0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  }
}

// New instance
export default new Utility();
