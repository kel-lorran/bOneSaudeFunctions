var admin = require("firebase-admin");

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

describe('createSISData script test', () => {
  it('should call firestore many times when script run', () => {
    const fakeSetFn = jest.fn()
    const fakeDocFn = jest.fn(() => ({ set: fakeSetFn }))
    const fakeCollectionFn = jest.fn(() => ({ doc: fakeDocFn }))
    admin.firestore.mockImplementation(() => ({
      collection: fakeCollectionFn
    }))

    require('./createSISData');

    expect(fakeSetFn).toHaveBeenCalledWith(expect.objectContaining({
      "CPF": expect.any(String),
      "DUM": expect.any(String),
    }))
    expect(fakeCollectionFn).toHaveBeenCalledWith('sis')
  })
})