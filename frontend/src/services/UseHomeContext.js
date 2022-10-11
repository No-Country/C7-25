import { useContext } from "react";
import HomeContext from "./HomeContext";

//Se usa para reducir las exportaciones de useContext y RolesContext a solo useRolesContext
const UseHomeContext = () => {
    return useContext(HomeContext);
}

export default UseHomeContext;