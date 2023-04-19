import * as pulumi from '@pulumi/pulumi';
import * as azure from '@pulumi/azure';

export function springCloudService(appName: string, resourceGroupName: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudService(appName + '-service', {
    resourceGroupName: resourceGroupName
  });
}

export function springCloudApp(appName: string, resourceGroupName: pulumi.Output<string>, serviceName: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudApp(appName + '-ms', {
    resourceGroupName: resourceGroupName,
    serviceName: serviceName,
    identity: {
      type: 'SystemAssigned',
    },
    httpsOnly: true
  });
}

export function springCloudDeployment(springCloudAppId: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudJavaDeployment('springCloudDeployment', {
    name: 'develop',
    springCloudAppId: springCloudAppId,
    instanceCount: 1,
    jvmOptions: '-Xlog:gc',
    quota: {
      cpu: '1',
      memory: '1Gi',
    },
    runtimeVersion: 'Java_17',
    environmentVariables: {
      MONGO_URI: '',
      AZ_AD_CLIENT_ID: '54d3cbe5-aea3-4623-93b6-7ee609fa0611',
      AZ_AD_APP_ID: 'api://54d3cbe5-aea3-4623-93b6-7ee609fa0611'
    }
  });
}

export function springCloudDeploymentProd(springCloudAppId: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudJavaDeployment('springCloudDeploymentProd', {
    name: 'prod',
    springCloudAppId: springCloudAppId,
    instanceCount: 2,
    jvmOptions: '-Xlog:gc',
    quota: {
      cpu: '1',
      memory: '1Gi',
    },
    runtimeVersion: 'Java_17',
    environmentVariables: {
      MONGO_URI: '',
      AZ_AD_CLIENT_ID: '54d3cbe5-aea3-4623-93b6-7ee609fa0611',
      AZ_AD_APP_ID: 'api://54d3cbe5-aea3-4623-93b6-7ee609fa0611'
    }
  });
}

export function springCloudDevConnection(springCloudDeploymentId: pulumi.Output<string>, targetResourceId: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudConnection('springCloudDevMongoConnection', {
    name: 'springCloudDevMongoConnection',
    springCloudId: springCloudDeploymentId,
    targetResourceId: targetResourceId,
    authentication: {
      type: 'secret'
    },
    clientType: 'springBoot'
  });
}

export function springCloudProdConnection(springCloudDeploymentId: pulumi.Output<string>, targetResourceId: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudConnection('springCloudProdMongoConnection', {
    name: 'springCloudProdMongoConnection',
    springCloudId: springCloudDeploymentId,
    targetResourceId: targetResourceId,
    authentication: {
      type: 'secret'
    },
    clientType: 'springBoot'
  });
}