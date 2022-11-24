import { getToken } from '@/utils/auth'

const token = getToken()

switch (token) {
    case 'invalid-jwt':
        console.log("new")
        break
    default:
        console.log('ga')
        break
}
