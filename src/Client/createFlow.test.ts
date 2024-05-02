var admin = require("firebase-admin");
var createPost = require("./createPost");

var flowDataExample = require("./flowDataExample.json");

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
jest.mock("./createPost", () => {
  return jest.fn(
    (() => {
      let counter = 0;
      return () =>
        Promise.resolve([
          {
            ID: `simple-id-post-${++counter}`,
          },
        ]);
    })()
  );
});

describe("createFlow script test", () => {
  it("should call firestore with data flow", async () => {
    const IDExample = "simple-id";
    const fakeSetFn = jest.fn().mockResolvedValue({});
    const fakeDocFn = jest.fn(() => ({ set: fakeSetFn, id: IDExample }));
    const fakeCollectionFn = jest.fn(() => ({
      doc: fakeDocFn,
    }));
    admin.firestore.mockImplementation(() => ({
      collection: fakeCollectionFn,
    }));

    await require("./createFlow")(flowDataExample);

    const { name, segment, startCondition, stepList } = flowDataExample;

    expect(createPost).toHaveBeenCalledWith([stepList[0].post]);
    expect(fakeSetFn).toHaveBeenLastCalledWith(
      expect.objectContaining({
        ID: IDExample,
        name,
        segment,
        startCondition,
        stepList: expect.arrayContaining([
          {
            ...stepList[0],
            post: undefined,
            postRef: "simple-id-post-1",
          },
        ]),
        scheduleModel: {
          ID: "simple-id",
          data: [
            {
              postRef: "simple-id-post-1",
              status: "initial",
              date: "",
              dateRelative: 2419200000,
            },
            {
              postRef: "simple-id-post-1",
              status: "initial",
              date: "",
              dateRelative: 4838400000,
            },
            {
              postRef: "simple-id-post-1",
              status: "initial",
              date: "",
              dateRelative: 7257600000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 7862400000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 8467200000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 9072000000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 9676800000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 10281600000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 10886400000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 11491200000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 12096000000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 12700800000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 13305600000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 13910400000,
            },
            {
              postRef: "simple-id-post-2",
              status: "initial",
              date: "",
              dateRelative: 14515200000,
            },
          ],
        },
      })
    );
    expect(fakeCollectionFn).toHaveBeenCalledWith("flow");
  });
});
