import * as pulumi from '@pulumi/pulumi';
import * as azure_native from '@pulumi/azure-native';
import * as azure from '@pulumi/azure';
import {
  databaseAccount,
  mongoDB,
  dmtBackendRegistry,
  dmtFrontendRegistry,
  springCloudApp,
  springCloudService,
  springCloudDeployment,
  springCloudDeploymentProd,
  mongoDBProd,
  springCloudDevConnection,
  springCloudProdConnection
} from './resources';

/**NOTE
 * Create Service Pricipal
 * Assign role 'DocumentDBAccountContributor'
 */

const appName = `${pulumi.getProject()}-${pulumi.getStack()}`;
const resourceGroupName = `${appName}-resourceGroup`;

const resourceGroup = new azure_native.resources.ResourceGroup(resourceGroupName);

const cosmosdbAccount = databaseAccount(appName, resourceGroup.name);

const mongoDBConfig = mongoDB(appName, resourceGroup.name, cosmosdbAccount.name);
const mongoDBProdConfig = mongoDBProd(appName, resourceGroup.name, cosmosdbAccount.name);

const dmtFrontendRegistryConfig = dmtFrontendRegistry(appName, resourceGroup.name);

const dmtBackendRegistryConfig = dmtBackendRegistry(appName, resourceGroup.name);

const springCloudServiceConfig = springCloudService(appName, resourceGroup.name);

const springCloudAppConfig = springCloudApp(appName, resourceGroup.name, springCloudServiceConfig.name);

const springCloudDeploymentConfig = springCloudDeployment(springCloudAppConfig.id);
const springCloudDevConnectionConfig = springCloudDevConnection(springCloudDeploymentConfig.id, mongoDBConfig.id);

const springCloudDeploymentProdConfig = springCloudDeploymentProd(springCloudAppConfig.id);
const springCloudProdConnectionConfig = springCloudProdConnection(springCloudDeploymentProdConfig.id, mongoDBProdConfig.id);

const defaultresourcegroup_weu = new azure_native.resources.ResourceGroup('defaultresourcegroup-weu', {
  location: 'westeurope',
  resourceGroupName: 'defaultresourcegroup-weu',
}, {
  protect: true,
});
const DefaultWorkspace_0a6582ad_635a_40d7_9ef2_61c9f8501bbc_WEU = new azure.operationalinsights.AnalyticsWorkspace('DefaultWorkspace-0a6582ad-635a-40d7-9ef2-61c9f8501bbc-WEU', {
  location: 'westeurope',
  name: 'DefaultWorkspace-0a6582ad-635a-40d7-9ef2-61c9f8501bbc-WEU',
  resourceGroupName: 'defaultresourcegroup-weu',
  retentionInDays: 30,
  sku: 'PerGB2018',
}, {
  protect: true,
});
const insight20230321 = new azure.appinsights.Insights('insight20230321', {
  applicationType: 'web',
  dailyDataCapInGb: 100,
  location: 'westeurope',
  name: 'insight20230321',
  resourceGroupName: 'dmt-dev-resourceGroup2211c593',
  workspaceId: '/subscriptions/0a6582ad-635a-40d7-9ef2-61c9f8501bbc/resourceGroups/DefaultResourceGroup-WEU/providers/Microsoft.OperationalInsights/workspaces/DefaultWorkspace-0a6582ad-635a-40d7-9ef2-61c9f8501bbc-WEU',
}, {
  protect: true,
});

const staticSite = new azure_native.web.StaticSite('staticSite', {
  branch: 'main',
  name: 'dmt-frontend',
  repositoryUrl: 'https://github.com/pmalave2/demo-dmt-frontend',
  repositoryToken: process.env.GH_TOKEN,
  resourceGroupName: resourceGroup.name,
  sku: {
    name: 'Free',
    tier: 'Free',
  },
  buildProperties: {
    outputLocation: 'dist/dmt-frontend',
    appBuildCommand: 'npm run build'
  }
});

export const dmtFrontendRegistryUrl = dmtFrontendRegistryConfig.loginServer;
export const dmtBackendRegistryUrl = dmtBackendRegistryConfig.loginServer;

export const dmtFrontendRegistryID = dmtFrontendRegistryConfig.id;
export const dmtBackendRegistryID = dmtBackendRegistryConfig.id;
export const resourceGroupID = resourceGroup.id;
export const databaseAccountID = cosmosdbAccount.id;
export const mongoDBID = mongoDBConfig.id;
export const mongoDBProdID = mongoDBProdConfig.id;
export const springCloudServiceID = springCloudServiceConfig.id;
export const springCloudAppID = springCloudAppConfig.id;
export const springCloudDeploymentID = springCloudDeploymentConfig.id;
export const springCloudDevConnectionID = springCloudDevConnectionConfig.id;
export const springCloudDeploymentProdID = springCloudDeploymentProdConfig.id;
export const springCloudProdConnectionID = springCloudProdConnectionConfig.id;
export const defaultresourcegroup_weu_ID = defaultresourcegroup_weu.id;
export const defaultWorkspace_0a6582ad_635a_40d7_9ef2_61c9f8501bbc_WEU = DefaultWorkspace_0a6582ad_635a_40d7_9ef2_61c9f8501bbc_WEU.id;
export const insight20230321ID = insight20230321.id;
export const staticSiteID = staticSite.id;
export const staticSiteURL = staticSite.contentDistributionEndpoint;
