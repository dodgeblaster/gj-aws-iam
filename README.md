# gj-aws-iam

## Installation
In order to add this package to your service, run the following command:
```
npm i gj-aws-iam
```

## Usage

```js
const iam = require('gj-aws-iam')

const main = async main() => {
    await iam.createRoleForLambda({
        state: 'existingName',
        name: 'newName'
    })
    /* 
    return String // name
    */

    await iam.createRoleForLambdaDatasource({
        state: 'existingName',
        name: 'newName'
    })
    /* 
    return String // name
    */

    await iam.createRoleForDynamoDbDatasource({
        state: 'existingName',
        name: 'newName'
    })
    /* 
    return String // name
    */

    await iam.removeRole({
        name: 'newName'
    })
    /* 
    return String // name
    */
}
```
