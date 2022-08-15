import * as api from "../api/taskApi";
import { useQuery } from "react-query";

const useTasks = () => {
    return useQuery('tasks', () => api.getTasks());
}

export {
    useTasks
}