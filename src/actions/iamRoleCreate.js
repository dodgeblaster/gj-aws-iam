const slsAws = require('@serverless/aws-sdk')
slsAws.config.update({ region: 'us-east-2' })

module.exports = async ({ name, service, policy }) => {
    return await slsAws.utils.updateOrCreateRole({
        name,
        service,
        policy
    })
}