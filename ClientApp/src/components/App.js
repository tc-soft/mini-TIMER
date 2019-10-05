import React from "react";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundaries from "./ErrorBoundaries";

function App() {
    return (
        <div className="App">
            <ErrorBoundaries message="Coś nie działa w całej aplikacji..." >
                <TimeboxList />
                <EditableTimebox />
            </ErrorBoundaries>
        </div>
    )
}

export default App;
