import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as azuread from "@pulumi/azuread";
import {
  databaseAccount,
  mongoDB,
  dmtBackendRegistry,
  dmtFrontendRegistry,
  springCloudApp,
  springCloudService
} from './resources';

const appName = `${pulumi.getProject()}-${pulumi.getStack()}`;
const resourceGroupName = `${appName}-resourceGroup`;

const resourceGroup = new resources.ResourceGroup(resourceGroupName);

const cosmosdbAccount = databaseAccount(appName, resourceGroup.name);

const mongoDBConfig = mongoDB(appName, resourceGroup.name, cosmosdbAccount.name);

const dmtFrontendRegistryConfig = dmtFrontendRegistry(appName, resourceGroup.name);

const dmtBackendRegistryConfig = dmtBackendRegistry(appName, resourceGroup.name);

const springCloudServiceConfig = springCloudService(appName, resourceGroup.name);

const springCloudAppConfig = springCloudApp(appName, resourceGroup.name, springCloudServiceConfig.name);

const dmt_app_iac = new azuread.Application("dmt-app-iac", {
  api: {
    requestedAccessTokenVersion: 2,
  },
  displayName: "dmt-app-iac",
  featureTags: [{}],
  owners: [
    "cc237397-1ef9-4637-afb0-c34ea322e968",
    "abb010db-1372-44e3-b9fb-8d0e0baf77c6",
  ],
  signInAudience: "AzureADandPersonalMicrosoftAccount"
}, {
  protect: true,
});


export const dmtFrontendRegistryUrl = dmtFrontendRegistryConfig.loginServer;
export const dmtBackendRegistryUrl = dmtBackendRegistryConfig.loginServer;
export const springAppUrl = springCloudAppConfig.url;
