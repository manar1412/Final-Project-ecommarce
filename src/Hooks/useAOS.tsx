import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

export default function useAOS(duration = 800, once = true): void {
  useEffect(() => {
    Aos.init({ duration, once });
    Aos.refresh();
  }, []);
}
