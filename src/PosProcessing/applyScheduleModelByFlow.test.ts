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

describe("applyScheduleModelByFlow script test", () => {
  it("should", async () => {
    const IDExample = "simple-id";
    const fakeSetFn = jest.fn().mockResolvedValue({});
    const fakeGetFn = jest
      .fn()
      .mockResolvedValueOnce({
        data: () => mockData.flowData,
      })
      .mockResolvedValueOnce({
        data: () => mockData.segmentData,
      })
      .mockResolvedValueOnce({
        data: () => mockData.patientData,
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

    await require("./applyScheduleModelByFlow")("9PTnIYbesQoIypjG3u7k");

    expect(fakeSetFn).toHaveBeenCalledWith({
      ID: "simple-id",
      flowRef: "9PTnIYbesQoIypjG3u7k",
      data: [
        {
          postRef: "upbvIqgPZJL4xfRX02j0",
          status: "initial",
          date: 1703707200000,
          dateRelative: 2419200000,
        },
        {
          postRef: "upbvIqgPZJL4xfRX02j0",
          status: "initial",
          date: 1706126400000,
          dateRelative: 4838400000,
        },
        {
          postRef: "upbvIqgPZJL4xfRX02j0",
          status: "initial",
          date: 1708545600000,
          dateRelative: 7257600000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1709150400000,
          dateRelative: 7862400000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1709755200000,
          dateRelative: 8467200000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1710360000000,
          dateRelative: 9072000000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1710964800000,
          dateRelative: 9676800000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1711569600000,
          dateRelative: 10281600000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1712174400000,
          dateRelative: 10886400000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1712779200000,
          dateRelative: 11491200000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1713384000000,
          dateRelative: 12096000000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1713988800000,
          dateRelative: 12700800000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1714593600000,
          dateRelative: 13305600000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1715198400000,
          dateRelative: 13910400000,
        },
        {
          postRef: "PaL1ovU2eKg7ayKRQ1rw",
          status: "initial",
          date: 1715803200000,
          dateRelative: 14515200000,
        },
      ],
    });
    expect(fakeCollectionFn).toHaveBeenCalledWith("patientFlowScheduleModel");
  });
});
