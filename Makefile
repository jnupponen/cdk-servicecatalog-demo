.DEFAULT_GOAL := help

# VARIABLES
#env?=

# TARGETS
# See details at from http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Prints this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Automatically fix code style with eslint and prettier.
	npm run lint

init: ## init accountId=<accountId> env=<env>. Init cdk stack to new AWS account
	npm run build \
		&& cdk synth \
		--context environment=${env} \
		&& aws-vault exec ${env} \
		-- cdk bootstrap \
		--context environment=${env} aws://${accountId}/eu-west-1 \ 
		
synth: ## Run CDK synth.
	npm run build \
		&& cdk synth \
		--context environment=${env}

diff: ## Check modifications before deploy.
	npm run build \
		&& cdk synth \
		--context environment=${env} \
		&& aws-vault exec ${env} \
		-- cdk diff \
		--context environment=${env} \

deploy: ## Deploy to env=<env>.
	npm run build \
		&& cdk synth \
		--context environment=${env} \
		&& aws-vault exec ${env} \
		-- cdk deploy \
		--all \
		--require-approval never \
		--context environment=${env}
