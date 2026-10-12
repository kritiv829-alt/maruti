const STORAGE_KEY = 'everyday-tasks';

export function loadTasks() {
  try {
    const raw = globalThis.localStorage.getItem(STORAGE_
    return { tasks, error: tasks.length !== parsed.length };
  } catch {
    return { tasks: [], error: true };
  }
}

