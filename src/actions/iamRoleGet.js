const AWS = require('aws-sdk');
const iam = new AWS.IAM({ apiVersion: '2010-05-08', region: 'us-east-2' });

module.exports = async (name) => {
    try {
        const res = await iam.getRole({
            RoleName: name
        }).promise()

        return {
            status: 'RETRIEVED',
            data: res
        }
    } catch (e) {
        if (e.code === 'NoSuchEntity') {
            return {
                status: 'DOESNT_EXIST',
                data: {
                    message: 'Does not exist'
                }
            }
        }

        throw new Error(e)
    }
}
