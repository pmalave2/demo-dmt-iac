import * as pulumi from '@pulumi/pulumi';
import * as azure_native from '@pulumi/azure-native';

export function dmtFrontendRegistry(appName: string, resourceGroupName: pulumi.Output<string>) {
  const registry = appName + 'registryfrontend';
  const registryName = registry.replace('-', '');

  return new azure_native.containerregistry.Registry(registryName, {
    adminUserEnabled: true,
    registryName: registryName,
    resourceGroupName: resourceGroupName,
    sku: {
      name: azure_native.containerregistry.SkuName.Basic
    },
    policies: {
      retentionPolicy: {
        days: 1
      }
    }
  });
}

export function dmtBackendRegistry(appName: string, resourceGroupName: pulumi.Output<string>) {
  const registry = appName + 'registrybackend';
  const registryName = registry.replace('-', '');

  return new azure_native.containerregistry.Registry(registryName, {
    adminUserEnabled: true,
    registryName: registryName,
    resourceGroupName: resourceGroupName,
    sku: {
      name: azure_native.containerregistry.SkuName.Basic
    },
    policies: {
      retentionPolicy: {
        days: 1
      }
    }
  });
}