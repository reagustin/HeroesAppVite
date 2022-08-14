import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))


describe('pruebas en SearchPage', () => { 
    
    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar correctamente con valores por defecto', () => {        
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {        
        render(
            <MemoryRouter initialEntries={['/search?q=Batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('Batman');
        // screen.debug();

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
        
        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');
    })

    test('debe de mostrar un error si no se encuentra el heroe (batman123)', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );  
        

        const alert = screen.getByLabelText('alert-display');
        expect(alert.style.display).toBeFalsy();

    })

    test('debe de llamar al navigate a la pantalla nueva', () => { 
        
        const inputValue = 'superman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );  
        
        const input = screen.getByRole('textbox');
        fireEvent.input( input, { target: { name: 'searchText', value: inputValue } });
        console.log(input.value);

        const form = screen.getByLabelText('form');
        fireEvent.submit( form );
 
        screen.debug();

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    })

})