const { OAuth2Client } = require('google-auth-library')

const session = require('../helpers/dbUtility'),
 nconf = require('../config'),
 client = new OAuth2Client(nconf.get('clientid'));

const authUser = async (token) =>{
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: nconf.get('clientid')
    });
    const { name, email, picture } = ticket.getPayload();

    req.session.userId = user.id

    const result = await session.run(`MATCH (people:Person {email: '${email}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const getUser = async () => {
    const result = await session.run(`MATCH (people:Person {id: '${req.session.userId}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const logOut = async () => {
    await req.session.destroy()
}

module.exports = 
{
    authUser: authUser,
    getUser: getUser,
    logOut: logOut
}