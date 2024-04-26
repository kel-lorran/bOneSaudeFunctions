var admin = require("firebase-admin");
var createPost = require('./createPost');
var flowDataExample = require("./flowDataExample.json");

jest.mock('firebase-admin', () => {
    const originalModule = jest.requireActual('firebase-admin');

    return {
        __esModule: true,
        ...originalModule,
        firestore: jest.fn(),
        initializeApp: jest.fn()
    };
});
admin as jest.Mock

describe('createPost script test', () => {
    it('should call firestore with data post', async () => {
        const IDExample = 'simple-id'
        const fakeSetFn = jest.fn().mockResolvedValue(null)
        const fakeDocFn = jest.fn(() => ({ set: fakeSetFn, id: IDExample }))
        const fakeCollectionFn = jest.fn(() => ({
            doc: fakeDocFn,
        }))
        admin.firestore.mockImplementation(() => ({
            collection: fakeCollectionFn
        }))

        const result = await createPost(flowDataExample.stepList.map(e => e.post))

        expect(fakeSetFn).toHaveBeenCalledWith(result[0])
        expect(fakeCollectionFn).toHaveBeenCalledWith('post')
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({
                ID: expect.any(String),
                title: 'consulta de pré-natal',
                content: 'agende sua consulta de pré-natal com antecedendia, essa é a melhor forma de cuidar do seu bebe',
                categoryList: [ 'forYou', 'consulta' ]
            })
        ]))
    })
})