export default class TokenService
{
    async getToken() {
        try {
            const session = await Auth.currentSession();
            const token = session.getAccessToken().getJwtToken();
            // You can now use the token or return it
            return token;
        } catch (error) {
            // Handle the error as you see fit, e.g., log it or throw it
            console.error('Failed to get token:', error);
        }
    }

}