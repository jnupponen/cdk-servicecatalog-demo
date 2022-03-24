import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { aws_servicecatalog as servicecatalog } from 'aws-cdk-lib'

export interface CdkServicecatalogClientStackProps extends StackProps {
    provisionedProductName: string
    bucketName: string
}

export class CdkServicecatalogClientStack extends Stack {
    constructor(scope: Construct, id: string, props: CdkServicecatalogClientStackProps) {
        super(scope, id, props)

        new servicecatalog.CfnCloudFormationProvisionedProduct(
            this,
            'MyCfnCloudFormationProvisionedProduct',
            /* all optional props */ {
                productName: 'MyCDKProduct',
                provisionedProductName: props.provisionedProductName,
                provisioningArtifactName: 'v1',
                provisioningParameters: [
                    {
                        key: 'bucketNameParameter',
                        value: props.bucketName
                    }
                ]
            }
        )
    }
}
