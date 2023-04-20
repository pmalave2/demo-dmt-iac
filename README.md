# demo-iac

pulumi login azblob://my-pulumi-state-bucket

pulumi stack init dev

pulumi config set azure-native:location westeurope

az ad sp create-for-rbac --name <service_principal_name> --role Contributor --scopes /subscriptions/<subscription_id> --sdk-auth

az role assignment create \
  --assignee <service_principal_id> \
  --role Owner \
  --scope "/subscriptions/<subscription_id>/resourceGroups/<resource_group_name>" \
  --description "The deployment pipeline for DMT-APP needs to be able to create roles assign within the resource group."

az login --service-principal -u <clientId> -p <clientSecret> --tenant <tenantId>

export ARM_CLIENT_ID=<clientId> && export ARM_CLIENT_SECRET=<clientSecret> && export ARM_TENANT_ID=<tenantId> && export ARM_SUBSCRIPTION_ID=<subscriptionId>

az spring app logs --name <app_name> -g <resource_group_name> -s <app_service_name> -i <app_instance_name> --follow

export AZURE_STORAGE_ACCOUNT=<storage_account_name> && export AZURE_STORAGE_KEY=<storage_account_key>

az spring app deploy \
  --resource-group <rg_name> \
  --service <app_service_name> \
  --name <app_name> \
  --deployment <deployment_name> \
  --artifact-path target/dmt-backend.jar 

crear GitHub token para el Site

OAuth:
  crear tenent AD
  crear usuario en el tenant
  crear App en el tenant
  crear Application ID URI (api://dmt)
  crear Authentication (SPA, single tenant, http://localhost:4200(poner uri del Site) )
  crear Expose an API (Scopes defined by this API, Authorized client applications)