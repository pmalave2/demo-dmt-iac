import * as pulumi from "@pulumi/pulumi";
import {
  DatabaseAccount, 
  DatabaseAccountKind,
  DatabaseAccountOfferType,
  BackupPolicyType,
  ServerVersion
} from "@pulumi/azure-native/documentdb";

export function databaseAccount(appName: string, resourceGroupName: pulumi.Output<string>) {
  const cosmosdbAccountName = `${appName}-database-account`;

  return new DatabaseAccount(cosmosdbAccountName, {
    kind: DatabaseAccountKind.MongoDB,
    accountName: cosmosdbAccountName,
    resourceGroupName: resourceGroupName,
    databaseAccountOfferType: DatabaseAccountOfferType.Standard,
    locations: [{
      failoverPriority: 0,
      isZoneRedundant: false,
      locationName: 'West Europe'
    }],
    backupPolicy: {
      type: BackupPolicyType.Periodic,
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
    apiProperties: { serverVersion: ServerVersion.ServerVersion_4_0 },
    enableFreeTier: true
  });
}