package myproject.resources;

import com.pulumi.azurenative.storage.StorageAccount;
import com.pulumi.azurenative.storage.StorageAccountArgs;
import com.pulumi.azurenative.storage.enums.Kind;
import com.pulumi.azurenative.storage.enums.SkuName;
import com.pulumi.azurenative.storage.inputs.SkuArgs;
import com.pulumi.core.Output;

public class StorageAccountConfig {
  private StorageAccountConfig() {}

  public static StorageAccount storageAccount(String appName, Output<String> resourceGroupName) {
    String storageAccountName = appName.replace("-", "") + "0cc175";

    return new StorageAccount(
        storageAccountName,
        StorageAccountArgs.builder()
            .resourceGroupName(resourceGroupName)
            .sku(SkuArgs.builder().name(SkuName.Standard_LRS).build())
            .kind(Kind.StorageV2)
            .build());
  }
}
