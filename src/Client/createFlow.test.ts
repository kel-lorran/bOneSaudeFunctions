var admin = require("firebase-admin");
var createPost = require('./createPost')

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
jest.mock('./createPost', () => {
    return jest.fn((() => {
        let counter = 0
        return () => Promise.resolve([
            {
                ID: `simple-id-post-${++counter}`,
            }
        ])
    })());
});

describe('createFlow script test', () => {
    it('should call firestore with data flow', async () => {
        const IDExample = 'simple-id'
        const fakeSetFn = jest.fn().mockResolvedValue({})
        const fakeDocFn = jest.fn(() => ({ set: fakeSetFn, id: IDExample }))
        const fakeCollectionFn = jest.fn(() => ({
            doc: fakeDocFn,
        }))
        admin.firestore.mockImplementation(() => ({
            collection: fakeCollectionFn
        }))

        await (require('./createFlow'))();

        const {
            name,
            segment,
            startCondition,
            stepList
        } = flowDataExample

        expect(createPost).toHaveBeenCalledWith([stepList[0].post])
        expect(fakeSetFn).toHaveBeenCalledWith(expect.objectContaining({
            ID: IDExample,
            name,
            segment,
            startCondition,
            stepList: expect.arrayContaining([
                {
                    ...stepList[0],
                    post: undefined,
                    postRef: 'simple-id-post-1'
                }
            ])
        }))
        expect(fakeCollectionFn).toHaveBeenCalledWith('flow')
    })
})