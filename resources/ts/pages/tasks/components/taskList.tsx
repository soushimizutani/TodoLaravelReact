import React from "react";
import { useTasks } from "../../../queries/taskQuery";
import TaskItem from "./taskItem";

const TaskList: React.VFC = () => {
    /*
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = async () => {
        const { data } = await axios.get("api/tasks");
        setTasks(data);
    };

    useEffect(() => {
        getTasks();
    });
    */

    const { data:tasks, status } = useTasks();

    if (status === 'loading') {
        return <div className="loader" />
    } else if (status === 'error') {
        return <div className="align-center">読み込みに失敗</div>
    } else if (!tasks || tasks.length <= 0) {
        return <div className="align-center">登録されたデータがありません</div>
    }

    return (
        <div className="inner">
            <ul className="task-list">
                {
                    tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))
                }
            </ul>
        </div>
    )
}

export default TaskList