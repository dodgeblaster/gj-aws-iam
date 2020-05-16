## Temp docs

```js
const iam = require('gj-aws-iam')

const main = async main() => {
    await iam.createRoleForLambda({
        state: 'existingName',
        name: 'newName'
    })

    await iam.createRoleForLambdaDatasource({
        state: 'existingName',
        name: 'newName'
    })

    await iam.createRoleForDynamoDbDatasource({
        state: 'existingName',
        name: 'newName'
    })

    await iam.slsCreateLambdaRole('newName')
    await iam.removeRole({
        name: 'newName'
    })
}


module.exports = main



```
