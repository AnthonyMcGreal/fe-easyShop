import {rest} from 'msw'

const baseURL = 'http://10.0.2.2:9090/api'

export const handlers = [
	rest.post(`${baseURL}/login`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({user: 'ant'}), ctx.set('set-cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliMWRlYjRkLTNiN2QtNGJhZC05YmRkLTJiMGQ3YjNkY2I2ZCIsImVtYWlsIjoiYW50aG9ueW1jZ3JlYWxAaG90bWFpbC5jby51ayIsImlhdCI6MTY4MTMzMjc2OSwiZXhwIjoxNjgxMzQzNTY5fQ.m4vkHrlsu8uRPHoTzixRxE137-kv5htI-n_HySml9tA; Path=/'))
	})
]
