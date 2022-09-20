import React, { useState } from "react";

const Context = React.createContext([null, () => {}]);

export const ModalFormProvider = (props) => {
  const [totalPrice, setTotalPrice] = useState(null);

  return (
    <Context.Provider value={[totalPrice, setTotalPrice]}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
