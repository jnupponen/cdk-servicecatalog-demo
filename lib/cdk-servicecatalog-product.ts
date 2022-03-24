import * as servicecatalog from '@aws-cdk/aws-servicecatalog-alpha'
import { Construct } from 'constructs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { CfnParameter } from 'aws-cdk-lib'
import { ParameterDataType } from 'aws-cdk-lib/aws-ssm'

export class CdkServiceCatalogProduct extends servicecatalog.ProductStack {
    constructor(scope: Construct, id: string) {
        super(scope, id)

        const bucketNameParameter = new CfnParameter(this, 'bucketNameParameter', {
            type: 'String'
        })
        new Bucket(this, 'ServiceCatalogProductBucket', {
            bucketName: bucketNameParameter.valueAsString
        })
    }
}
