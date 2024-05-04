describe('util function transformStepListToScheduleModel', () => {
    it('should transform when have one step', () => {
        jest.useFakeTimers().setSystemTime(new Date(1714143222718));
        const transformStepListToScheduleModel = require('./transformStepListToScheduleModel')

        const stepListExample = [
            {
                "duration": {
                    "unit": "week",
                    "value": 11
                },
                "interval": {
                    "unit": "week",
                    "value": 4
                },
                "postRef": "upbvIqgPZJL4xfRX02j0"
            }
        ]
        const startCondition = {
            "type": "gestation",
            "unit": "week",
            "value": 0
        }
        expect(transformStepListToScheduleModel(stepListExample, startCondition)).toEqual([
            {
                status: 'initial',
                date: 0,
                dateRelative: 604800000 * 4,
                postRef: "upbvIqgPZJL4xfRX02j0"
            },
            {
                status: 'initial',
                date: 0,
                dateRelative: 604800000 * 8,
                postRef: "upbvIqgPZJL4xfRX02j0" 
            },
            {
                status: 'initial',
                date: 0,
                dateRelative: 604800000 * 11,
                postRef: "upbvIqgPZJL4xfRX02j0"
            }
        ])
        jest.useRealTimers()
    })
    it('should transform when have two steps', () => {
        jest.useFakeTimers().setSystemTime(new Date(1714143222718));
        const transformStepListToScheduleModel = require('./transformStepListToScheduleModel')

        const stepListExample = [
            {
                "duration": {
                    "unit": "week",
                    "value": 4
                },
                "interval": {
                    "unit": "week",
                    "value": 4
                },
                "postRef": "upbvIqgPZJL4xfRX02j0"
            },
            {
                "duration": {
                    "unit": "week",
                    "value": 4
                },
                "interval": {
                    "unit": "week",
                    "value": 4
                },
                "postRef": "upbvIqgPZJL4xfRX02j0"
            }
        ]
        const startCondition = {
            "type": "gestation",
            "unit": "week",
            "value": 0
        }
        expect(transformStepListToScheduleModel(stepListExample, startCondition)).toEqual([
            {
                status: 'initial',
                date: 0,
                dateRelative: 604800000 * 4,
                postRef: "upbvIqgPZJL4xfRX02j0"
            },
            {
                status: 'initial',
                date: 0,
                dateRelative: 604800000 * 8,
                postRef: "upbvIqgPZJL4xfRX02j0" 
            }
        ])
        jest.useRealTimers()
    })
})