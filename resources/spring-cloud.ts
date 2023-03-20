import * as pulumi from '@pulumi/pulumi';
import * as azure from '@pulumi/azure';

export function springCloudService(appName: string, resourceGroupName: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudService(appName + '-service', {
    resourceGroupName: resourceGroupName,
  });
}

export function springCloudApp(appName: string, resourceGroupName: pulumi.Output<string>, serviceName: pulumi.Output<string>) {
  return new azure.appplatform.SpringCloudApp(appName + '-ms', {
    resourceGroupName: resourceGroupName,
    serviceName: serviceName,
    httpsOnly: true
  });
}
