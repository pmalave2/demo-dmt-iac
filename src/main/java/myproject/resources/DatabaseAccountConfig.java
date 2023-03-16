package myproject.resources;

import com.pulumi.azurenative.documentdb.DatabaseAccount;
import com.pulumi.azurenative.documentdb.DatabaseAccountArgs;
import com.pulumi.azurenative.documentdb.enums.BackupPolicyType;
import com.pulumi.azurenative.documentdb.enums.DatabaseAccountKind;
import com.pulumi.azurenative.documentdb.enums.DatabaseAccountOfferType;
import com.pulumi.azurenative.documentdb.enums.ServerVersion;
import com.pulumi.azurenative.documentdb.inputs.ApiPropertiesArgs;
import com.pulumi.azurenative.documentdb.inputs.CapabilityArgs;
import com.pulumi.azurenative.documentdb.inputs.LocationArgs;
import com.pulumi.azurenative.documentdb.inputs.PeriodicModeBackupPolicyArgs;
import com.pulumi.azurenative.documentdb.inputs.PeriodicModePropertiesArgs;
import com.pulumi.core.Output;

public class DatabaseAccountConfig {
  private DatabaseAccountConfig() {}

  public static DatabaseAccount databaseAccount(String appName, Output<String> resourceGroupName) {
    String cosmosdbAccountName = appName + "-database-account";

    return new DatabaseAccount(
        cosmosdbAccountName,
        DatabaseAccountArgs.builder()
            .kind(DatabaseAccountKind.MongoDB)
            .accountName(cosmosdbAccountName)
            .resourceGroupName(resourceGroupName)
            .databaseAccountOfferType(DatabaseAccountOfferType.Standard)
            .locations(
                LocationArgs.builder()
                    .failoverPriority(0)
                    .isZoneRedundant(false)
                    .locationName("West Europe")
                    .build())
            .backupPolicy(
                PeriodicModeBackupPolicyArgs.builder()
                    .periodicModeProperties(
                        PeriodicModePropertiesArgs.builder()
                            .backupIntervalInMinutes(240)
                            .backupRetentionIntervalInHours(8)
                            .build())
                    .type(BackupPolicyType.Periodic.getValue())
                    .build())
            .isVirtualNetworkFilterEnabled(false)
            .capabilities(
                CapabilityArgs.builder()
                    .name("EnableMongo")
                    .name("DisableRateLimitingResponses")
                    .name("EnableServerless")
                    .build())
            .apiProperties(ApiPropertiesArgs.builder().serverVersion(ServerVersion._4_0).build())
            .enableFreeTier(false)
            .build());
  }
}
