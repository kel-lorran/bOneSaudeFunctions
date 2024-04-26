var admin = require("firebase-admin");
var mockData = require('./mockData.json')

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

describe('createSegments script test', () => {
    it('should call firestore with data segment', async () => {
        jest.useFakeTimers().setSystemTime(new Date(1714143222718));
        const fakeSetFn = jest.fn().mockResolvedValue(null)
        const fakeDocFn = jest.fn(() => ({ set: fakeSetFn }))
        const fakeCollectionFn = jest.fn(() => ({
            doc: fakeDocFn,
            get: () => ({
                size: 30,
                docs: mockData.sis.map(e => ({
                    data: () => e
                }))
            })
        }))
        admin.firestore.mockImplementation(() => ({
            collection: fakeCollectionFn
        }))

        await require('./createSegments');

        expect(fakeSetFn).toHaveBeenNthCalledWith(1, mockData.sementedPatients.prenatal)
        expect(fakeSetFn).toHaveBeenNthCalledWith(2, mockData.sementedPatients.postChildbirth)
        expect(fakeCollectionFn).toHaveBeenCalledWith('segmentedPatients')
        jest.useRealTimers()
    })
})