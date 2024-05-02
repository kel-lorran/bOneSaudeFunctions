describe('util function computeScheduleModelAbsDate', () => {
    it('should compute date abse in date relative and dum', () => {
        const computeScheduleModelAbsDate = require('./computeScheduleModelAbsDate')

        expect(computeScheduleModelAbsDate(
            [
                {
                    status: 'initial',
                    date: '',
                    dateRelative: 604800000 * 4,
                    postRef: "upbvIqgPZJL4xfRX02j0"
                },
                {
                    status: 'initial',
                    date: '',
                    dateRelative: 604800000 * 8,
                    postRef: "upbvIqgPZJL4xfRX02j0" 
                },
                {
                    status: 'initial',
                    date: '',
                    dateRelative: 604800000 * 11,
                    postRef: "upbvIqgPZJL4xfRX02j0"
                }
            ],
            1695938579474
        )).toEqual(
            [
                {
                    status: 'initial',
                    date: (1695931200 * 1000) + 604800000 * 4,
                    dateRelative: 604800000 * 4,
                    postRef: "upbvIqgPZJL4xfRX02j0"
                },
                {
                    status: 'initial',
                    date: (1695931200 * 1000) + 604800000 * 8,
                    dateRelative: 604800000 * 8,
                    postRef: "upbvIqgPZJL4xfRX02j0" 
                },
                {
                    status: 'initial',
                    date: (1695931200 * 1000) + 604800000 * 11,
                    dateRelative: 604800000 * 11,
                    postRef: "upbvIqgPZJL4xfRX02j0"
                }
            ]
        )
    })
}) 