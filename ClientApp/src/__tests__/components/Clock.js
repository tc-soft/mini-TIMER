import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer"
import Clock from "../../components/Clock";

var root = null;
var clockRenderer = null;
describe("<Clock />", () => {

    describe("when given minutes and seconds (TEST DOM)", () => {
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes={10} seconds={20} />, root
            )
        })

        it("renders an h2 element", () => {
            expect(root.childNodes[0].nodeName).toEqual("H2")
        })

        it("renders a Clock className", () => {
            expect(root.childNodes[0].className).toMatch(/Clock/)
        })

        it("renders time properly", () => {
            expect(root.childNodes[0].textContent).toMatch(/10:20/)
        })

        
    });

    describe("when given minutes and seconds (TestRenderer)", () => {
        beforeEach(() => {
            clockRenderer = renderer.create(
                <Clock minutes={10} seconds={20} />
            );
            
        })

        it("renders an h2 element", () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
        })

        it("renders an h2 element", () => {
            expect(clockRenderer.toJSON().type).toEqual("h2")
        })

        it("sets a Clock className", () => {
            expect(clockRenderer.toJSON().props).toMatchObject({ "className": expect.stringMatching(/Clock/) })
        })

        it("renders time properly", () => {
            expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining(["10", "20"]))
        })

    });



})