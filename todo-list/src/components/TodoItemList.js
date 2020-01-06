import React, {Component} from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props;

        return (
            <div>
                <TodoItem text="영거"/>
                <TodoItem text="띵거"/>
                <TodoItem text="새요"/>
            </div>
        );
    }
}

export default TodoItemList;