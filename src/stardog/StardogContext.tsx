import { createContext, FC } from 'react'
import { Connection } from 'stardog'

export interface StardogContextProps {
    connection: Connection
}

export const StardogContext = createContext<StardogContextProps>({
    connection: {} as Connection,
})

export interface StardogProviderProps {
    username: string
    password: string
    endpoint: string
}

export const StardogProvider: FC<StardogProviderProps> = ({
    username,
    password,
    endpoint,
    children,
}) => {
    const connection = new Connection({
        username,
        password,
        endpoint,
    })

    return (
        <StardogContext.Provider
            value={{
                connection,
            }}
        >
            {children}
        </StardogContext.Provider>
    )
}
