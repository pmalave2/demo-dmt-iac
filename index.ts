import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as azuread from "@pulumi/azuread";
import * as azure from "@pulumi/azure";
import {
  databaseAccount,
  mongoDB,
  dmtBackendRegistry,
  dmtFrontendRegistry,
  springCloudApp,
  springCloudService,
  springCloudDeployment,
  springCloudDeploymentProd
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

const springCloudDeploymentConfig = springCloudDeployment(springCloudAppConfig.id);

const springCloudDeploymentProdConfig = springCloudDeploymentProd(springCloudAppConfig.id);

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

const defaultresourcegroup_weu = new resources.ResourceGroup("defaultresourcegroup-weu", {
  location: "westeurope",
  resourceGroupName: "defaultresourcegroup-weu",
}, {
  protect: true,
});
const DefaultWorkspace_0a6582ad_635a_40d7_9ef2_61c9f8501bbc_WEU = new azure.operationalinsights.AnalyticsWorkspace("DefaultWorkspace-0a6582ad-635a-40d7-9ef2-61c9f8501bbc-WEU", {
  location: "westeurope",
  name: "DefaultWorkspace-0a6582ad-635a-40d7-9ef2-61c9f8501bbc-WEU",
  resourceGroupName: "defaultresourcegroup-weu",
  retentionInDays: 30,
  sku: "PerGB2018",
}, {
  protect: true,
});
const insight20230321 = new azure.appinsights.Insights("insight20230321", {
  applicationType: "web",
  dailyDataCapInGb: 100,
  location: "westeurope",
  name: "insight20230321",
  resourceGroupName: "dmt-dev-resourceGroup2211c593",
  workspaceId: "/subscriptions/0a6582ad-635a-40d7-9ef2-61c9f8501bbc/resourceGroups/DefaultResourceGroup-WEU/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-0a6582ad-635a-40d7-9ef2-61c9f8501bbc-WEU",
}, {
  protect: true,
});

export const dmtFrontendRegistryUrl = dmtFrontendRegistryConfig.loginServer;
export const dmtBackendRegistryUrl = dmtBackendRegistryConfig.loginServer;
export const springAppUrl = springCloudAppConfig.url;
