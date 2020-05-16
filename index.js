const createIam = require('./src/actions/iamRoleCreate')
const removeIam = require('./src/actions/iamRoleRemove')
const getIam = require('./src/actions/iamRoleGet')

const slsAws = require('@serverless/aws-sdk')
slsAws.config.update({ region: 'us-east-2' })


const iamRole = statements => ({
    service: 'appsync.amazonaws.com',
    policy: {
        Version: '2012-10-17',
        Statement: statements
    },
    region: 'us-east-2'
})

const datasourceInvokeLambda = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}

const datasourceDynamo = {
    "Version": "2012-10-17",
    "Statement": [
        {
            Action: [
                'dynamodb:DeleteItem',
                'dynamodb:GetItem',
                'dynamodb:PutItem',
                'dynamodb:Query',
                'dynamodb:Scan',
                'dynamodb:UpdateItem',
                'dynamodb:BatchGetItem',
                'dynamodb:BatchWriteItem'
            ],
            Effect: 'Allow',
            "Resource": "*"
        }
    ]
}

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


        console.log('slsAws - - ',slsAws.utils.updateOrCreateRole)

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


    removeRole: async (name) => await removeIam({
        name: name
    }),


    slsCreateLambdaRole: async (name) => {
        const params = {
            name: name,
            service: 'lambda.amazonaws.com',
            policy: [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "lambda.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }

        await slsAws.utils.updateOrCreateRole(params)
    }
}