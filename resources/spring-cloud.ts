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
    jvmOptions: '-XX:+PrintGC',
    quota: {
      cpu: '1',
      memory: '1Gi',
    },
    runtimeVersion: 'Java_17',
    environmentVariables: {
      MONGO_URI: process.env.MONGO_URI || '',
    }
  });
}

export function springCloudDeploymentProd(springCloudAppId: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudJavaDeployment('springCloudDeploymentProd', {
    name: 'prod',
    springCloudAppId: springCloudAppId,
    instanceCount: 2,
    jvmOptions: '-XX:+PrintGC',
    quota: {
      cpu: '1',
      memory: '1Gi',
    },
    runtimeVersion: 'Java_17',
    environmentVariables: {
      MONGO_URI: process.env.MONGO_PROD_URI || '',
    }
  });
}
