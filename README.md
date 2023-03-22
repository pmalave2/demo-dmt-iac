# demo-iac

az ad sp create-for-rbac --name "dmt-app-iac" --role Contributor --scopes /subscriptions/<subscription_id> --sdk-auth

az role assignment create \
  --assignee <service_principal_id> \
  --role Owner \
  --scope "/subscriptions/<subscription_id>" \
  --description "The deployment pipeline for DMT-APP needs to be able to create roles assign within the resource group."

az spring app logs --name <app_name> -g <resource_group_name> -s <app_service_name> -i <app_instance_name> --follow

export AZURE_STORAGE_ACCOUNT=<storage_account_name>
export AZURE_STORAGE_KEY=<storage_account_key>