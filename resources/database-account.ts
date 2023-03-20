import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

export function databaseAccount(appName: string, resourceGroupName: pulumi.Output<string>) {
  const cosmosdbAccountName = `${appName}-database-account`;

  return new azure_native.documentdb.DatabaseAccount(cosmosdbAccountName, {
    kind: azure_native.documentdb.DatabaseAccountKind.MongoDB,
    accountName: cosmosdbAccountName,
    resourceGroupName: resourceGroupName,
    databaseAccountOfferType: azure_native.documentdb.DatabaseAccountOfferType.Standard,
    locations: [{
      failoverPriority: 0,
      isZoneRedundant: false,
      locationName: 'West Europe'
    }],
    backupPolicy: {
      type: azure_native.documentdb.BackupPolicyType.Periodic,
      periodicModeProperties: {
        backupIntervalInMinutes: 240,
        backupRetentionIntervalInHours: 8
      }
    },
    isVirtualNetworkFilterEnabled: false,
    capabilities: [
      { name: 'EnableMongo' },
      { name: 'DisableRateLimitingResponses' },
      { name: 'EnableServerless' }
    ],
    apiProperties: { serverVersion: azure_native.documentdb.ServerVersion.ServerVersion_4_0 },
    enableFreeTier: false
  });
}