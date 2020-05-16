const iam = require('../index')
const getRole = require('../src/actions/iamRoleGet')
describe('returns state if state exists', () => {
    test('will return state if state exists', async (done) => {
        const createInput = {
            name: 'NAME',
            state: 'STATE'
        }

        const result = await iam.createRoleForLambda(createInput)
        expect(result).toBe('STATE')
        done()
    })

    test('will create if state is empty and getRole fails', async (done) => {
        const roleName = 'TEST_ROLE'
        const createInput = {
            state: '',
            name: roleName
        }

        const beforeCreate = await getRole(roleName)
        console.log(beforeCreate.data)
        expect(beforeCreate.status).toBe('DOESNT_EXIST')


        const result = await iam.createRoleForLambda(createInput)
        expect(result).toBe(roleName)

        const afterCreate = await getRole(roleName)
        expect(afterCreate.data.Role.RoleName).toBe(roleName)
        done()
    })

    test('will return name if state doesnt exist but getRole succeeds', async (done) => {
        const roleName = 'TEST_ROLE'
        const createInput = {
            state: '',
            name: roleName
        }

        const beforeCreate = await getRole(roleName)
        expect(beforeCreate.data.Role.RoleName).toBe(roleName)

        const result = await iam.createRoleForLambda(createInput)
        expect(result).toBe(roleName)

        const afterCreate = await getRole(roleName)
        expect(afterCreate.data.Role.RoleName).toBe(roleName)
        await iam.removeRole(roleName)
        done()
    })
})