import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import ErrorBoundaries from "./ErrorBoundaries";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się CSS in JS", totalTimeInMinutes: 25 },
            { id: "b", title: "Uczę się SASS", totalTimeInMinutes: 15 },
            { id: "c", title: "Uczę się BEM", totalTimeInMinutes: 5 },
        ],
        hasError: false
    }
    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }
    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }
    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return { timeboxes };
        })
    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox);
        } catch (error) {
            console.log("Jest błąd podczas tworzenia Timebox-a", error);
            this.setState({ hasError: true });
        }
    }
    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                <ErrorBoundaries message="Cos sie wykrzaczyło w liście..." >
                {
                    this.state.timeboxes.map((timebox, index) => (
                        <ErrorBoundaries key={timebox.id} message="Cos sie wykrzaczyło w timebox-ie..." >
                            <Timebox
                                title={timebox.title}
                                totalTimeInMinutes={timebox.totalTimeInMinutes}
                                onDelete={() => this.removeTimebox(index)}
                                onEdit={() => this.updateTimebox(index, { ...timebox, title: "Updated timebox" })}
                            />
                        </ErrorBoundaries>
                    ))
                }
                </ErrorBoundaries>
            </>
        )
    }
}

export default TimeboxList;
