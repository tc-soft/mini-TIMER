import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import EditableTimebox from "../../components/EditableTimebox";


describe("<EditableTimebox />", () => {
    afterEach(cleanup)

    it("fails for now", () => {
        const { debug, getByText } = render(<EditableTimebox />)

        expect(() => {
            getByText("Edytuj")
        }).not.toThrow()
    })

    it("allows editing the timebox", () => {
        const { getByText } = render(<EditableTimebox />)

        //Naciskamy Edytuj
        fireEvent.click(getByText("Edytuj"))
        //Naciskamy Zatwierdź zmiany
        fireEvent.click(getByText(/zmiany/))

        //Sprawdzxamy czy jest dostępny przycisk Edytuj
        expect(() => {
            getByText("Edytuj")
        }).not.toThrow()
    })

    it("allows editing the change timebox", () => {
        const { getByText, getByTestId } = render(<EditableTimebox />)

        //Naciskamy Edytuj
        fireEvent.click(getByText("Edytuj"))

        //Edycja pola
        const input = getByTestId("labelInput");
        fireEvent.change(input, { target: { value: "Testowa zmiana" } });

        //Naciskamy [Zatwierdź zmiany]
        fireEvent.click(getByText(/zmiany/))

        //Sprawdzamy aync czy jest dostępny przycisk Edytuj
        const output = getByTestId("labelOutput");

        expect(() => {
            console.log("Wartość output : ", output.childNodes[0].textContent)
            expect(output.childNodes[0].textContent).toEqual("Testowa zmiana")
        }).not.toThrow();
        
    })

})