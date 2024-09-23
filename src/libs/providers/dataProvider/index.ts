import { DataProviders } from "@refinedev/core";

import { ENV } from "@/configs";

import { dataProvider } from "./defaultDataProvider";

const dataProviders: DataProviders = {
  default: dataProvider(`${ENV.APP_HOST}/api`),
};

export default dataProviders;
