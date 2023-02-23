import {rest} from 'msw'

const baseURL = 'https://easy-shop-be.herokuapp.com/api'

export const handlers = [
	rest.post(`${baseURL}/login`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({user: 'ant'}))
	})
]
