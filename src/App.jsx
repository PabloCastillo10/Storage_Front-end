import {useRoutes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import routes from "./routes.jsx"

<<<<<<< Updated upstream
export const App = () => {
    let element = useRoutes(routes);

    return (
        <>
        {element}
        <Toaster
            position="bottom-right"

            reverseOrder={false}
        />
        </>
    )
}

export default App;
=======
>>>>>>> Stashed changes
