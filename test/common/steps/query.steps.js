/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Utility from "../../../src/utility/utility";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";
import Connect from "../../../src/database/connect";
import Queries from "../../../src/database/queries";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();