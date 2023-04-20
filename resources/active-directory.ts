import * as pulumi from "@pulumi/pulumi";

import * as azuread from '@pulumi/azuread';
import { v4 as uuidv4 } from 'uuid';

export function dmtApplicationRegistration(): azuread.Application {
  return new azuread.Application('dmt-app-sp-2', {
    displayName: 'dmt-app-sp-2',
    identifierUris: ['api://dmt2'],
    owners: [
      'df809b6b-cff8-4370-88af-efa8458498bd',
      'd4223f81-b11e-4f8e-9b0c-5a275f616c92'
    ],
    signInAudience: 'AzureADMyOrg',
    api: {
      oauth2PermissionScopes: [
        {
          adminConsentDescription: 'rack.read',
          adminConsentDisplayName: 'rack.read',
          enabled: true,
          id: uuidv4(),
          type: 'User',
          userConsentDescription: 'rack.read',
          userConsentDisplayName: 'rack.read',
          value: 'rack.read',

        },
        {
          adminConsentDescription: 'warehouse.read',
          adminConsentDisplayName: 'warehouse.read',
          enabled: true,
          id: uuidv4(),
          type: 'User',
          userConsentDescription: 'warehouse.read',
          userConsentDisplayName: 'warehouse.read',
          value: 'warehouse.read',
        }
      ]
    },
    appRoles: [],
    web: {
      redirectUris: [
        'http://localhost:4200/',
        'https://mango-water-01eed9c03.3.azurestaticapps.net/'
      ],
      implicitGrant: {
        accessTokenIssuanceEnabled: false,
        idTokenIssuanceEnabled: false,
      },
    },
  });
}