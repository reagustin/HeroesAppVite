import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en el componente de navbar', () => { 
    
    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Juan Carlos'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario logueado', () => { 
        
        render( 
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        screen.debug();
        
        /* const spanElement = screen.getByLabelText('username');        
        expect(spanElement.textContent).toContain('Juan Carlos');
 */
        expect(screen.getByText('Juan Carlos')).toBeTruthy();

    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton ', () => { 

        render( 
            <MemoryRouter >
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
 
    })
})