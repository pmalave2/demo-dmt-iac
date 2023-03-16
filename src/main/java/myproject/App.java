package myproject;

import com.pulumi.Pulumi;
import com.pulumi.azurenative.resources.ResourceGroup;
import com.pulumi.azurenative.storage.StorageFunctions;
import com.pulumi.azurenative.storage.inputs.ListStorageAccountKeysArgs;
import com.pulumi.azurenative.storage.outputs.EndpointsResponse;
import com.pulumi.core.Output;
import myproject.resources.DatabaseAccountConfig;
import myproject.resources.DatabaseConfig;
import myproject.resources.RegistryConfig;
import myproject.resources.StorageAccountConfig;

/* TODO:
 * Resourcce Group
 * CosmoDB
 * Docker Registry
 * App Images
 * App Service
 */

public class App {
  public static void main(String[] args) {
    Pulumi.run(
        ctx -> {
          String appName = String.format("%s-%s", ctx.projectName(), ctx.stackName());
          String resourceGroupName = appName + "-resourceGroup";

          var resourceGroup = new ResourceGroup(resourceGroupName);

          var storageAccount = StorageAccountConfig.storageAccount(appName, resourceGroup.name());

          var cosmosdbAccount =
              DatabaseAccountConfig.databaseAccount(appName, resourceGroup.name());

          var mongoDB =
              DatabaseConfig.mongoDB(appName, resourceGroup.name(), cosmosdbAccount.name());

          var dmtFrontendRegistry =
              RegistryConfig.dmtFrontendRegistry(appName, resourceGroup.name());
          var dmtBackendRegistry = RegistryConfig.dmtBackendRegistry(appName, resourceGroup.name());

          var primaryStorageKey =
              getStorageAccountPrimaryKey(resourceGroup.name(), storageAccount.name());

          ctx.export("primaryStorageKey", primaryStorageKey);
          ctx.export(
              "staticEndpoint",
              storageAccount.primaryEndpoints().applyValue(EndpointsResponse::web));
          ctx.export("dmtFrontendRegistry", dmtFrontendRegistry.loginServer());
          ctx.export("dmtBackendRegistry", dmtBackendRegistry.loginServer());
        });
  }

  private static Output<String> getStorageAccountPrimaryKey(
      Output<String> resourceGroupName, Output<String> accountName) {
    return StorageFunctions.listStorageAccountKeys(
            ListStorageAccountKeysArgs.builder()
                .resourceGroupName(resourceGroupName)
                .accountName(accountName)
                .build())
        .applyValue(r -> r.keys().get(0).value())
        .asSecret();
  }
}
