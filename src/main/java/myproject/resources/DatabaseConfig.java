package myproject.resources;

import com.pulumi.azurenative.documentdb.MongoDBResourceMongoDBCollection;
import com.pulumi.azurenative.documentdb.MongoDBResourceMongoDBCollectionArgs;
import com.pulumi.azurenative.documentdb.MongoDBResourceMongoDBDatabase;
import com.pulumi.azurenative.documentdb.MongoDBResourceMongoDBDatabaseArgs;
import com.pulumi.azurenative.documentdb.enums.IndexKind;
import com.pulumi.azurenative.documentdb.inputs.MongoDBCollectionResourceArgs;
import com.pulumi.azurenative.documentdb.inputs.MongoDBDatabaseResourceArgs;
import com.pulumi.azurenative.documentdb.inputs.MongoIndexArgs;
import com.pulumi.azurenative.documentdb.inputs.MongoIndexKeysArgs;
import com.pulumi.core.Output;
import java.util.Map;

public class DatabaseConfig {
  private DatabaseConfig() {}

  public static MongoDBResourceMongoDBDatabase mongoDB(
      String appName, Output<String> resourceGroupName, Output<String> databaseAccountName) {
    String cosmosdbName = appName + "-mongoDB";

    return new MongoDBResourceMongoDBDatabase(
        cosmosdbName,
        MongoDBResourceMongoDBDatabaseArgs.builder()
            .accountName(databaseAccountName)
            .databaseName("dev")
            .resourceGroupName(resourceGroupName)
            .resource(MongoDBDatabaseResourceArgs.builder().id("dev").build())
            .build());
  }

  public static MongoDBResourceMongoDBCollection mongoDBCollection(
      String appName,
      Output<String> resourceGroupName,
      Output<String> databaseAccountName,
      Output<String> mongoDBName) {
    String cosmosCollectionName = appName + "-collection";

    return new MongoDBResourceMongoDBCollection(
        cosmosCollectionName,
        MongoDBResourceMongoDBCollectionArgs.builder()
            .accountName(databaseAccountName)
            .collectionName(cosmosCollectionName)
            .databaseName(mongoDBName)
            .resource(
                MongoDBCollectionResourceArgs.builder()
                    .id(cosmosCollectionName)
                    .indexes(
                        MongoIndexArgs.builder()
                            .key(MongoIndexKeysArgs.builder().keys("id").build())
                            .build())
                    .shardKey(Map.of("id", IndexKind.Hash.getValue()))
                    .build())
            .resourceGroupName(resourceGroupName)
            .build());
  }
}
