import React from "react";
import TaskInput from "./components/taskInput"
import TaskList from "./components/taskList"

const TaskPage: React.VFC = () => {
    return (
        <>
            <TaskInput />
            <TaskList />
        </>
    );
};

export default TaskPage;
