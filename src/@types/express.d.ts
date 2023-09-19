declare namespace Express {
    export interface Request {
        authUser: {
            id: string
            roles: string[]
        }
    }
}