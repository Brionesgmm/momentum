import { useState } from "react";

const Message = ({ type, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={"alert alert-dismissible fade show alert-" + type}>
      {children}
      <button
        type="button"
        className="btn-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      ></button>
    </div>
  );
};

const Messages = ({ messages }) => (
  <>
    {messages.errors &&
      messages.errors.map((el, i) => (
        <Message key={`${el.msg}-${i}`} type="danger">
          {el.msg}
        </Message>
      ))}
    {messages.success &&
      messages.success.map((el, i) => (
        <Message key={`${el.msg}-${i}`} type="success">
          {el.msg}
        </Message>
      ))}
    {messages.info &&
      messages.info.map((el, i) => (
        <Message key={`${el.msg}-${i}`} type="info">
          {el.msg}
        </Message>
      ))}
  </>
);

export default Messages;
