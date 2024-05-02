var admin = require("firebase-admin");
var mockData = require("./mockData.json");

jest.mock("firebase-admin", () => {
  const originalModule = jest.requireActual("firebase-admin");

  return {
    __esModule: true,
    ...originalModule,
    firestore: jest.fn(),
    apps: [{}],
  };
});
admin as jest.Mock;

describe("sendNotification script test", () => {
    it("should call admin.messaging when paitient has stepFlow to expire", async () => {
        const IDExample = "simple-id";
        const fakeSetFn = jest.fn().mockResolvedValue({});
        const fakeGetFn = jest
          .fn()
          .mockResolvedValueOnce({
            data: () => ({
                ...mockData.patientData,
                scheduleModelRefList: [
                    'scheduleModel-id-1'
                ]
            }),
          });
        const fakeDocFn = jest.fn(() => ({
          set: fakeSetFn,
          id: IDExample,
          get: fakeGetFn,
        }));
        const fakeCollectionFn = jest.fn(() => ({
          doc: fakeDocFn,
        }));
        admin.firestore.mockImplementation(() => ({
          collection: fakeCollectionFn,
        }));
        
        await require('./sendNotification')
    })
})