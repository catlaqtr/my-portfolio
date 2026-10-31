import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppRoutes from "./AppRoutes";
import { onReducedMotionChange, reducedMotion } from "./game/motion";

function App() {
  // The OS setting, or the in-game "Reduce motion" toggle if the visitor used it.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(reducedMotion());
    return onReducedMotionChange(setReduced);
  }, []);

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>
        <AppRoutes />
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
