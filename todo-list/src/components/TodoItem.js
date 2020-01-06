import React, {Component} from "react";
import './TodoItem.css';

class TodoItem extends Component {
    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 이 실행되지 않도록 하는 함수
                    onRemove(id)}
                }>&times;</div>
                <div className={'todo-text ${checked && "checked"}'}>
                    <div>{text}</div>
                </div>

            </div>
        );
    }
}

export default TodoItem;