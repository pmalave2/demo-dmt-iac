import * as pulumi from '@pulumi/pulumi';
import { Registry, SkuName } from "@pulumi/azure-native/containerregistry";

export function dmtFrontendRegistry(appName: string, resourceGroupName: pulumi.Output<string>) {
  const registry = appName + 'registryfrontend';
  const registryName = registry.replace('-', '');

  return new Registry(registryName, {
    adminUserEnabled: true,
    registryName: registryName,
    resourceGroupName: resourceGroupName,
    sku: {
      name: SkuName.Basic
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

  return new Registry(registryName, {
    adminUserEnabled: true,
    registryName: registryName,
    resourceGroupName: resourceGroupName,
    sku: {
      name: SkuName.Basic
    },
    policies: {
      retentionPolicy: {
        days: 1
      }
    }
  });
}