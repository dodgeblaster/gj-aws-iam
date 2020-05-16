const getIam = require('./src/actions/iamRoleGet')
const slsAws = require('@serverless/aws-sdk')
slsAws.config.update({ region: 'us-east-2' })

module.exports = {
    createRoleForLambda: async (input) => {
        // Validate
        if (!input.name || !input.hasOwnProperty('state')) {
            throw new Error('createRoleForLambda input is invalid')
        }

        // If State exists, return state
        if (input.state.length > 0) {
            return input.state
        }

        // Else if IAM Role exists, return IAM Role
        const existingRole = await getIam(input.name)
        if (existingRole.status === 'RETRIEVED') {
            return input.name
        }

        // Else create the IAM Role
        const params = {
            name: input.name,
            service: 'lambda.amazonaws.com',
            policy: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
        }

        await slsAws.utils.updateOrCreateRole(params)
        return input.name
    },

    createRoleForLambdaDatasource: async (input) => {
        // Validate
        if (!input.name || !input.hasOwnProperty('state')) {
            throw new Error('createRoleForLambda input is invalid')
        }

        // If State exists, return state
        if (input.state.length > 0) {
            return input.state
        }

        // Else if IAM Role exists, return IAM Role
        const existingRole = await getIam(input.name)
        if (existingRole.status === 'RETRIEVED') {
            return input.name
        }

        // Else create the IAM Role
        const params = {
            name: input.name,
            service: 'appsync.amazonaws.com',
            policy: [
                {
                    "Action": [
                        "lambda:InvokeFunction"
                    ],
                    "Resource": "*",
                    "Effect": "Allow"
                }
            ]
        }

        await slsAws.utils.updateOrCreateRole(params)
        return input.name
    },

    createRoleForDynamoDbDatasource: async (input) => {
        // Validate
        if (!input.name || !input.hasOwnProperty('state')) {
            throw new Error('createRoleForDynamoDbDatasource input is invalid')
        }

        // If State exists, return state
        if (input.state.length > 0) {
            return input.state
        }

        // Else if IAM Role exists, return IAM Role
        const existingRole = await getIam(input.name)
        if (existingRole.status === 'RETRIEVED') {
            return input.name
        }

        // Else create the IAM Role
        const params = {
            name: input.name,
            service: 'appsync.amazonaws.com',
            policy: [
                {
                    "Action": [
                        'dynamodb:DeleteItem',
                        'dynamodb:GetItem',
                        'dynamodb:PutItem',
                        'dynamodb:Query',
                        'dynamodb:Scan',
                        'dynamodb:UpdateItem',
                        'dynamodb:BatchGetItem',
                        'dynamodb:BatchWriteItem'
                    ],
                    "Resource": "*",
                    "Effect": "Allow"
                }
            ]
        }

        await slsAws.utils.updateOrCreateRole(params)
        return input.name
    },

    removeRole: async (name) => {
        await slsAws.utils.deleteRole({
            name
        })

        return name
    }
}