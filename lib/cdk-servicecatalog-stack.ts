import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as servicecatalog from '@aws-cdk/aws-servicecatalog-alpha'
import { CdkServiceCatalogProduct } from './cdk-servicecatalog-product'
import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
export class CdkServicecatalogStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const portfolio = new servicecatalog.Portfolio(this, 'MyFirstPortfolio', {
            displayName: 'MyFirstPortfolio',
            providerName: 'MyTeam',
            description: 'Portfolio for a project',
            messageLanguage: servicecatalog.MessageLanguage.EN
        })

        const role = iam.Role.fromRoleArn(
            this,
            'PortfolioRole',
            `arn:aws:iam::${Stack.of(this).account}:role/Administrator`
        )
        portfolio.giveAccessToRole(role)

        const product = new servicecatalog.CloudFormationProduct(this, 'MyFirstProduct', {
            productName: 'My CDK Product',
            owner: 'Product Owner',
            productVersions: [
                {
                    productVersionName: 'v1',
                    cloudFormationTemplate: servicecatalog.CloudFormationTemplate.fromProductStack(
                        new CdkServiceCatalogProduct(this, 'CdkServiceCatalogProduct')
                    )
                }
            ]
        })

        portfolio.addProduct(product)
    }
}
