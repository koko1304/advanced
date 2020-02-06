export function authHandler(isLogin) {
	return {
		type: 'AUTH_HANDLER',
		payload: isLogin
	}
}