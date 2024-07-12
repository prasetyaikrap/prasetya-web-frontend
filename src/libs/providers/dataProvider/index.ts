import { DataProviders } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const RefineFakeAPIURL = "https://api.fake-rest.refine.dev";

const dataProviders: DataProviders = {
  default: dataProvider(RefineFakeAPIURL),
};

export default dataProviders;
