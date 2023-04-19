import * as pulumi from "@pulumi/pulumi";
import { MongoDBResourceMongoDBDatabase } from "@pulumi/azure-native/documentdb";

export function mongoDB(appName: string, resourceGroupName: pulumi.Output<string>, databaseAccountName: pulumi.Output<string>) {
  const cosmosdbName = appName + "-mongoDB";

  return new MongoDBResourceMongoDBDatabase(cosmosdbName, {
    accountName: databaseAccountName,
    databaseName: 'dev',
    resourceGroupName: resourceGroupName,
    resource: { id: 'dev' }
  });
}

export function mongoDBProd(appName: string, resourceGroupName: pulumi.Output<string>, databaseAccountName: pulumi.Output<string>) {
  const cosmosdbName = appName + "-prod-mongoDB";

  return new MongoDBResourceMongoDBDatabase(cosmosdbName, {
    accountName: databaseAccountName,
    databaseName: 'prod',
    resourceGroupName: resourceGroupName,
    resource: { id: 'prod' }
  });
}