import { render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

describe('pruebas en SearchPage', () => { 
    
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
        screen.debug();

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
        
        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');


    })

})