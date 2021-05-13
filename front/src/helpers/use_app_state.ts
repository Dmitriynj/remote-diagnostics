import { useContext } from "react";
import { AppStateContext } from "./AppContext";

const useAppState = () => useContext(AppStateContext);

export { useAppState };
