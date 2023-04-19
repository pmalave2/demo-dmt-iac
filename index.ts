import * as pulumi from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StaticSite } from '@pulumi/azure-native/web';
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

const appName = `${pulumi.getProject()}-${pulumi.getStack()}`;
const resourceGroupName = `${appName}-resourceGroup`;

const resourceGroup = new ResourceGroup(resourceGroupName, {
  resourceGroupName: resourceGroupName
});

const cosmosdbAccount = databaseAccount(appName, resourceGroup.name);

const mongoDBConfig = mongoDB(appName, resourceGroup.name, cosmosdbAccount.name);
// const mongoDBProdConfig = mongoDBProd(appName, resourceGroup.name, cosmosdbAccount.name);

// const dmtFrontendRegistryConfig = dmtFrontendRegistry(appName, resourceGroup.name);

// const dmtBackendRegistryConfig = dmtBackendRegistry(appName, resourceGroup.name);

const springCloudServiceConfig = springCloudService(appName, resourceGroup.name);

const springCloudAppConfig = springCloudApp(appName, resourceGroup.name, springCloudServiceConfig.name);

const springCloudDeploymentConfig = springCloudDeployment(springCloudAppConfig.id);
const springCloudDevConnectionConfig = springCloudDevConnection(springCloudDeploymentConfig.id, mongoDBConfig.id);

// const springCloudDeploymentProdConfig = springCloudDeploymentProd(springCloudAppConfig.id);
// const springCloudProdConnectionConfig = springCloudProdConnection(springCloudDeploymentProdConfig.id, mongoDBProdConfig.id);

// const analyticsWorkspace = new azure.operationalinsights.AnalyticsWorkspace('analyticsWorkspace-01', {
//   resourceGroupName: resourceGroup.name,
//   retentionInDays: 15,
//   sku: 'PerGB2018',
// });
// const insight01 = new azure.appinsights.Insights('insight01', {
//   applicationType: 'web',
//   dailyDataCapInGb: 100,
//   location: 'westeurope',
//   resourceGroupName: resourceGroup.name,
//   workspaceId: analyticsWorkspace.id,
// });

// const staticSite = new StaticSite('staticSite', {
//   branch: 'main',
//   name: 'dmt-frontend',
//   repositoryUrl: 'https://github.com/pmalave2/demo-dmt-frontend',
//   repositoryToken: process.env.GH_TOKEN,
//   resourceGroupName: resourceGroup.name,
//   sku: {
//     name: 'Free',
//     tier: 'Free',
//   },
//   buildProperties: {
//     outputLocation: 'dist/dmt-frontend',
//     appBuildCommand: 'npm run build'
//   }
// });


// export const dmtFrontendRegistryID = dmtFrontendRegistryConfig.id;
// export const dmtBackendRegistryID = dmtBackendRegistryConfig.id;
export const resourceGroupID = resourceGroup.id;
export const databaseAccountID = cosmosdbAccount.id;
export const mongoDBID = mongoDBConfig.id;
// export const mongoDBProdID = mongoDBProdConfig.id;
export const springCloudServiceID = springCloudServiceConfig.id;
export const springCloudAppID = springCloudAppConfig.id;
export const springCloudDeploymentID = springCloudDeploymentConfig.id;
export const springCloudDevConnectionID = springCloudDevConnectionConfig.id;
// export const springCloudDeploymentProdID = springCloudDeploymentProdConfig.id;
// export const springCloudProdConnectionID = springCloudProdConnectionConfig.id;
// export const analyticsWorkspaceID = analyticsWorkspace.id;
// export const insight01ID = insight01.id;
// export const staticSiteID = staticSite.id;

// export const dmtFrontendRegistryUrl = dmtFrontendRegistryConfig.loginServer;
// export const dmtBackendRegistryUrl = dmtBackendRegistryConfig.loginServer;
