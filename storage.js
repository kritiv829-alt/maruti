const STORAGE_KEY = 'everyday-tasks';

export function loadTasks() {
  try {
    const raw = globalThis.localStorage.getItem(STORAGE_
    return { tasks, error: tasks.length !== parsed.length };
  } catch {
    return { tasks: [], error: true };
  }
}

export function saveTasks(tasks) {
  try {
    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
