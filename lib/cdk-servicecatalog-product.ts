import * as servicecatalog from '@aws-cdk/aws-servicecatalog'
import { Construct } from '@aws-cdk/core'
import { Bucket } from '@aws-cdk/aws-s3'

export class CdkServiceCatalogProduct extends servicecatalog.ProductStack {
    constructor(scope: Construct, id: string) {
        super(scope, id)

        new Bucket(this, 'ServiceCatalogProductBucket')
    }
}
