import { Col, Row } from "react-bootstrap";

const TodoItem = ({ text, isComplete, onCompleteClick, onDeleteClick }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{text}</div>

          <div>
            <button className="button-delete" onClick={onDeleteClick}>
              삭제
            </button>
            <button
              className={`button-delete ${isComplete && "end"}`}
              onClick={onCompleteClick}
            >
              {isComplete ? "끝남" : "안끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
