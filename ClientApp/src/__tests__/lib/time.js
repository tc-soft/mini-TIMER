import { getMinutesAndSecondsFromDurationInSeconds } from "../../lib/time"

//Wykorzystujemy test JEST
describe("getMinutesAndSecondsFromDurationInSeconds", () => {

    describe("for durations shorter than one minute", () => {

        it("works for 30 seconds", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(30)
            ).toEqual([0, 30])
        });

        it("returns 30 seconds for 30 seconds-duration", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(30)[1]
            ).toBe(30)
        });

        it("returns 0 minutes for 30 seconds-duration", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(30)[0]
            ).toBe(0)
        });
    })

    describe("for durations longer or equal to minute", () => {

        it("works for 140 seconds", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(140)
            ).toEqual([2, 20])
        });
    })
})

