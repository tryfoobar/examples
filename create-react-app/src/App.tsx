import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { init } from "commandbar";

init("5ba0a816");

type App = <T>({ children }: { children: T }) => T;
const App: App = ({ children }) => {
  const navigate = useNavigate();
  const [commandBarReady, setCommandBarReady] = useState(false);

  useEffect(() => {
    window.CommandBar.boot("me").then(() => {
      setCommandBarReady(true);
    });

    return window.CommandBar.shutdown;
  }, []);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addCommand({
        name: "Home",
        text: "Home",
        category: "Navigation",
        template: { type: "link", value: "/", operation: "router" },
      });
      window.CommandBar.addCommand({
        name: "Fop",
        text: "Fop",
        category: "Navigation",
        template: { type: "link", value: "/fop", operation: "router" },
      });
    }
  }, [commandBarReady]);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addRouter(navigate);
    }
  }, [navigate, commandBarReady]);

  return children;
};

export default App;
