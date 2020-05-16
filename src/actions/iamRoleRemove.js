const slsAws = require('@serverless/aws-sdk')
slsAws.config.update({ region: 'us-east-2' })

module.exports = async ({ name }) => {
    return await slsAws.utils.deleteRole({
        name
    })
}
