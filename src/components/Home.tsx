import { useEffect, useState } from "react";
import { listBoards, listTasks } from "../utils/ApiUtils";
import {
  isAuthenticated,
  updateLocalBoards,
  updateLocalTasks,
} from "../utils/StorageUtils";
import DashboardBase from "./DashboardBase";

type StatsOverview = { tasks_total: number; tasks_completed: number };
const initialStats: StatsOverview = { tasks_total: -1, tasks_completed: -1 };

async function fetchStats(updateStatsCB: (value: StatsOverview) => void) {
  let tasks_completed = 0;
  let tasks_total = 0;

  const boards = await listBoards();
  updateLocalBoards(boards);

  for (const board of boards) {
    const tasks = await listTasks(board.id);
    updateLocalTasks(board.id, tasks);

    for (const task of tasks) {
      tasks_total += 1;
      if (task.status_object!.is_completed) tasks_completed += 1;
      await new Promise((r) => setTimeout(r, 50));
      updateStatsCB({ tasks_total, tasks_completed });
    }
  }
}

export default function Home() {
  const [stats, setStats] = useState(() => initialStats);

  useEffect(() => {
    if (isAuthenticated()) fetchStats(setStats);
  }, []);

  const tasks_pending = stats.tasks_total - stats.tasks_completed;
  const progress = Math.round(
    (stats.tasks_completed * 100.0) / stats.tasks_total
  );

  return (
    <DashboardBase selectedTabName="Home">
      <div className="p-6 flex flex-wrap items-center gap-6">
        <ProgressCard label="Tasks Pending" value={String(tasks_pending)} />
        <ProgressCard
          label="Tasks Completed"
          value={String(stats.tasks_completed)}
        />
        <ProgressCard label="Total Tasks" value={String(stats.tasks_total)} />
        <ProgressCard label="Progress" value={String(progress) + "%"} />
      </div>
    </DashboardBase>
  );
}

function ProgressCard(props: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 w-56 py-6 flex flex-col items-center gap-3">
      <p className="font-bold text-4xl">{props.value}</p>
      <p>{props.label}</p>
    </div>
  );
}
