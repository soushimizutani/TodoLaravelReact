import * as api from "../api/taskApi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Axios, AxiosError } from "axios";

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

const useCreateTask = () => {
    const QueryClient = useQueryClient();
    
    return useMutation(api.createTask, {
        onSuccess: () => {
            QueryClient.invalidateQueries('tasks');
            toast.success('登録に成功しました！');
        },
        onError: (error: AxiosError) => {
            const response: any = error.response;
            if (response.data.errors){
                Object.values(response.data.errors).map(
                    (messages: any) => {
                        messages.map((message:string) => {
                            toast.error(message);
                        })
                    }
                )
            } else {
                toast.error('登録に失敗しました');
            }
        }
    })
}

const useUpdateTask = () => {
    const QueryClient = useQueryClient();
    
    return useMutation(api.updateTask, {
        onSuccess: () => {
            QueryClient.invalidateQueries('tasks');
            toast.success('更新に成功しました！');
        },
        onError: (error: AxiosError) => {
            const response: any = error.response;
            if (response.data.errors){
                Object.values(response.data.errors).map(
                    (messages: any) => {
                        messages.map((message:string) => {
                            toast.error(message);
                        })
                    }
                )
            } else {
                toast.error('登録に失敗しました');
            }
        }
    })
}

const useDeleteTask = () => {
    const QueryClient = useQueryClient();
    
    return useMutation(api.deleteTask, {
        onSuccess: () => {
            QueryClient.invalidateQueries('tasks');
            toast.success('削除に成功しました！');
        },
        onError: () => {
            toast.error('削除に失敗しました');
        }
    })
}

export {
    useTasks,
    useUpdateDoneTask,
    useCreateTask,
    useUpdateTask,
    useDeleteTask
}