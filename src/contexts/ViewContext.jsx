import { createContext, useContext } from "react";
import { setViewsAPI } from "../service/operations/GeneralOpern";

const ViewContext = createContext();

function ViewContextProvider({ children }) {
  async function handleView(postId) {
    try {
      await setViewsAPI(postId);
    } catch (error) {
      // Silently handle the error
    }
  }

  return (
    <ViewContext.Provider value={{ handleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export const useView = () => useContext(ViewContext);

export default ViewContextProvider;
