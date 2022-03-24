#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CdkServicecatalogStack } from '../lib/cdk-servicecatalog-stack'
import { CdkServicecatalogClientStack } from '../lib/cdk-servicecatalog-client-stack'

const app = new cdk.App()
new CdkServicecatalogStack(app, 'CdkServicecatalogStack', {})
new CdkServicecatalogClientStack(app, 'CdkServicecatalogClientStack', {
    provisionedProductName: 'cdk-sc-demo-test-product-1',
    bucketName: 'cdk-sc-demo-test-bucket-1'
})
