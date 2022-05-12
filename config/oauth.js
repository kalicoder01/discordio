let clientId = '973571169481531412';
let redirectUri = 'http%3A%2F%2F127.0.0.1%3A8000%2Fdiscord%2Foauth';
let scope = 'identify';
let clientSecret = 'bCv_64KCGlYT5bQPKGldqb0sudSpc79i';

module.exports = {  
    'authUrl': `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`,
    'clientId': clientId,
    'clientSecret': clientSecret,
    'scope': scope,
    'redirectUri': redirectUri
}