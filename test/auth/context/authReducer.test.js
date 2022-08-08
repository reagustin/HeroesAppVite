const { authReducer, types } = require("../../../src/auth");


describe('Test en authReducer', () => {

    const initialState = {
        logged: false
    }
    
    test('debe de retornar el estado por defecto', () => { 
        
        const newState = authReducer(initialState, {});
        // console.log(newState);
        expect(newState).toBe(initialState);


    })
    
    test('debe de (login) llamar el login autenticar y establecer el user', () => { 
        
        const user = { id: 'ABC', name: 'Juan Carlos'}
        
        const action = {
            type: types.login,
            payload: user            
        }

        const newState = authReducer(initialState, action)
        expect(newState).toEqual({            
            logged: true,
            user: action.payload
        })
        // expect(newState).toContain(action.payload);

    })
    
    test('debe de (logout) borrar el name del usuario y logged en false', () => { 
        
        const state = {
            logged: true,
            name: {id: '123', name: 'Juan'}
        }
        const action = {
            type: types.logout                     
        }

        const newState = authReducer(state, action);
        console.log(newState);
        expect(newState).toEqual({            
            logged: false  
        })

    })
})