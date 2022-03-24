import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as servicecatalog from '@aws-cdk/aws-servicecatalog-alpha'
import { CdkServiceCatalogProduct } from './cdk-servicecatalog-product'
import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Group } from 'aws-cdk-lib/aws-iam'
export class CdkServicecatalogStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const portfolio = new servicecatalog.Portfolio(this, 'MyFirstPortfolio', {
            displayName: 'MyFirstPortfolio',
            providerName: 'MyTeam',
            description: 'Portfolio for a project',
            messageLanguage: servicecatalog.MessageLanguage.EN
        })

        const group = new Group(this, 'PortfolioUserGroup', {
            groupName: 'portfolio-user-group'
        })
        portfolio.giveAccessToGroup(group)

        const role = iam.Role.fromRoleArn(
            this,
            'PortfolioRole',
            `arn:aws:iam::${Stack.of(this).account}:role/Administrator`
        )

        portfolio.giveAccessToRole(role)

        const product = new servicecatalog.CloudFormationProduct(this, 'MyFirstProduct', {
            productName: 'MyCDKProduct',
            owner: 'Product Owner',

            productVersions: [
                {
                    productVersionName: 'v1',
                    validateTemplate: true,
                    cloudFormationTemplate: servicecatalog.CloudFormationTemplate.fromProductStack(
                        new CdkServiceCatalogProduct(this, 'CdkServiceCatalogProduct')
                    )
                }
            ]
        })

        portfolio.addProduct(product)
    }
}
