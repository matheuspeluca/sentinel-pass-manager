declare namespace Express {
    export interface Request {
        authUser: {
            id: number,
            roles: string[]
        }
    }
}