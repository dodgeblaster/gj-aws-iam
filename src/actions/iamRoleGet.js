/**
 * This script is taken from the this aws tutorial:
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-lambda-iam-role-setup.html
 * 
 * Input:
 * {
 *      name: String required
 * }
 *
 * Output:
 * {
 *      status: Status,
 *      data: Role
 * }
 *
 s*/

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
