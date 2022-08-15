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



                
                <li>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" />
                    </label>
                    <form>
                        <input
                            type="text"
                            className="input"
                            defaultValue="編集中のTODO"
                        />
                    </form>
                    <button className="btn">更新</button>
                </li>
                <li className="done">
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" />
                    </label>
                    <div>
                        <span>実行したTODO</span>
                    </div>
                    <button className="btn is-delete">削除</button>
                </li>
                <li>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" />
                    </label>
                    <div>
                        <span>ゴミ捨て</span>
                    </div>
                    <button className="btn is-delete">削除</button>
                </li>
                <li>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" />
                    </label>
                    <div>
                        <span>掃除</span>
                    </div>
                    <button className="btn is-delete">削除</button>
                </li>
            </ul>
        </div>
    )
}

export default TaskList