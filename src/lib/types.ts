interface TodoList {
    title: string,
    id: string,
    todos: TodoItem[]
}

interface TodoItem {
    title: string,
    isFinished: boolean,
    description?: string,
    deadLine?: Date,
    id: string
}