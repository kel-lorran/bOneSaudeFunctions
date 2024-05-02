var admin = require('firebase-admin');
var createPatient = require('./createPatient')

var patientDataExample = require('./patientDataExample.json');

jest.mock('firebase-admin', () => {
    const originalModule = jest.requireActual('firebase-admin');

    return {
        __esModule: true,
        ...originalModule,
        firestore: jest.fn(),
        apps: [{}]
    };
});
admin as jest.Mock

describe('createPatient script', () => {
    it('should insert patient in firestore when that is called', async () => {
        const IDExample = 'simple-id'
        const fakeSetFn = jest.fn().mockResolvedValue({})
        const fakeDocFn = jest.fn(() => ({ set: fakeSetFn, id: IDExample }))
        const fakeCollectionFn = jest.fn(() => ({
            doc: fakeDocFn,
        }))
        admin.firestore.mockImplementation(() => ({
            collection: fakeCollectionFn
        }))

        const result = await createPatient(undefined, 3)
        
        expect(fakeSetFn).toHaveBeenCalledWith({
            "ID": "simple-id",
            "appTokenList": [],
            "cpf": expect.any(String),
            "email": expect.any(String),
            "scheduleModelList": [],
            "scheduleModelRefList": []
        })
        expect(fakeCollectionFn).toHaveBeenCalledWith('patient')
    })
})