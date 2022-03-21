import * as servicecatalog from '@aws-cdk/aws-servicecatalog-alpha'
import { Construct } from 'constructs'
import { Bucket } from 'aws-cdk-lib/aws-s3'

export class CdkServiceCatalogProduct extends servicecatalog.ProductStack {
    constructor(scope: Construct, id: string) {
        super(scope, id)

        new Bucket(this, 'ServiceCatalogProductBucket')
    }
}
