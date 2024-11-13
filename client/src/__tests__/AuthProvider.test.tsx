import { render, screen, waitFor, act } from '@testing-library/react'
import { useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
//import { auth } from '../services/google_authentication'
import { addUser } from '../services/userService'
import AuthProvider, { AuthContext } from '../components/context/AuthProvider'

// Mock dependencies
jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn(),
    User: jest.fn(),
}))

jest.mock('../services/google_authentication', () => ({
    auth: jest.fn(),
}))

jest.mock('../services/userService', () => ({
    addUser: jest.fn(),
}))

const MockComponent = () => {
    const context = useContext(AuthContext)
    if (!context) {
        return <div>Context is null</div>
    }
    const { user, loading } = context
    return (
        <div>
            <div data-testid="user">{user ? user.uid : 'null'}</div>
            <div data-testid="loading">{loading.toString()}</div>
        </div>
    )
}

describe('AuthProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('initial state is correct', () => {
        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        )
        expect(screen.getByTestId('user').textContent).toBe('null')
        expect(screen.getByTestId('loading').textContent).toBe('true')
    })

    test('onAuthStateChanged sets user', async () => {
        const mockUser = { uid: '123', getIdToken: jest.fn().mockResolvedValue('token') }
        ;(onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
            callback(mockUser)
            return jest.fn()
        })

        await act(async () => {
            render(
                <AuthProvider>
                    <MockComponent />
                </AuthProvider>
            )
        })

        expect(screen.getByTestId('user').textContent).toBe('123')
    })

    test('addUser is called when user is set', async () => {
        const mockUser = { uid: '123', getIdToken: jest.fn().mockResolvedValue('token') }
        ;(onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
            callback(mockUser)
            return jest.fn()
        })

        await act(async () => {
            render(
                <AuthProvider>
                    <MockComponent />
                </AuthProvider>
            )
        })

        expect(mockUser.getIdToken).toHaveBeenCalled()
        await waitFor(() => expect(addUser).toHaveBeenCalledWith('token'))
    })

    test('loading is set to false after user is added', async () => {
        const mockUser = { uid: '123', getIdToken: jest.fn().mockResolvedValue('token') }
        ;(onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
            callback(mockUser)
            return jest.fn()
        })

        await act(async () => {
            render(
                <AuthProvider>
                    <MockComponent />
                </AuthProvider>
            )
        })

        await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('false'))
    })

    test('error is logged if addUser fails', async () => {
        const mockUser = { uid: '123', getIdToken: jest.fn().mockResolvedValue('token') }
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        ;(addUser as jest.Mock).mockRejectedValue(new Error('Failed to add user'))
        
        ;(onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
            callback(mockUser)
            return jest.fn()
        })

        await act(async () => {
            render(
                <AuthProvider>
                    <MockComponent />
                </AuthProvider>
            )
        })

        await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding user to the database:', expect.any(Error)))
        consoleErrorSpy.mockRestore()
    })
})