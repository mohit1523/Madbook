import { createContext, useState } from "react";

export const publicMsgContext = createContext();

const PublicMsgContext = (props) => {
  const [allMsgs, setAllMsgs] = useState([]);
  const msgCtxValue = {
    allMsgs,
    setAllMsgs,
  };

  return (
    <publicMsgContext.Provider value={msgCtxValue}>
      {props.children}
    </publicMsgContext.Provider>
  );
};

export default PublicMsgContext;
