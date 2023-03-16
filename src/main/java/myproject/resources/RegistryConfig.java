package myproject.resources;

import com.pulumi.azurenative.containerregistry.Registry;
import com.pulumi.azurenative.containerregistry.RegistryArgs;
import com.pulumi.azurenative.containerregistry.enums.SkuName;
import com.pulumi.azurenative.containerregistry.inputs.PoliciesArgs;
import com.pulumi.azurenative.containerregistry.inputs.RetentionPolicyArgs;
import com.pulumi.azurenative.containerregistry.inputs.SkuArgs;
import com.pulumi.core.Output;

public class RegistryConfig {
  private RegistryConfig() {}

  public static Registry dmtFrontendRegistry(String appName, Output<String> resourceGroupName) {
    String dmtFrontendRegistryName = appName + "-frontend-registry";
    dmtFrontendRegistryName = dmtFrontendRegistryName.replace("-", "");

    return new Registry(
        dmtFrontendRegistryName,
        RegistryArgs.builder()
            .adminUserEnabled(true)
            .registryName(dmtFrontendRegistryName)
            .resourceGroupName(resourceGroupName)
            .sku(SkuArgs.builder().name(SkuName.Basic).build())
            .policies(
                PoliciesArgs.builder()
                    .retentionPolicy(RetentionPolicyArgs.builder().days(1).build())
                    .build())
            .build());
  }

  public static Registry dmtBackendRegistry(String appName, Output<String> resourceGroupName) {
    String dmtBackendRegistryName = appName + "-backend-registry";
    dmtBackendRegistryName = dmtBackendRegistryName.replace("-", "");

    return new Registry(
        dmtBackendRegistryName,
        RegistryArgs.builder()
            .adminUserEnabled(true)
            .registryName(dmtBackendRegistryName)
            .resourceGroupName(resourceGroupName)
            .sku(SkuArgs.builder().name(SkuName.Basic).build())
            .policies(
                PoliciesArgs.builder()
                    .retentionPolicy(RetentionPolicyArgs.builder().days(1).build())
                    .build())
            .build());
  }
}
