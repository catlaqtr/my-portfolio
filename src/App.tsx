import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppRoutes from "./AppRoutes";
import { useReduceMotion } from "./hooks/useReduceMotion";

function App() {
  const reduced = useReduceMotion();
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>
        <AppRoutes />
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
