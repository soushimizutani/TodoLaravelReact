import * as api from "../api/taskApi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useTasks = () => {
    return useQuery('tasks', () => api.getTasks());
}

const useUpdateDoneTask = () => {
    const QueryClient = useQueryClient();
    
    return useMutation(api.updateDoneTask, {
        onSuccess: () => {
            QueryClient.invalidateQueries('tasks');
        },
        onError: () => {
            toast.error('更新に失敗しました');
        }
    })
}

export {
    useTasks,
    useUpdateDoneTask
}