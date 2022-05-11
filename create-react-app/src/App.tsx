import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { init } from "commandbar";
import { useCrud, type Person } from "./CrudProvider";

init("5ba0a816");

const App = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [commandBarReady, setCommandBarReady] = useState(false);
  const [people, dispatch] = useCrud();

  useEffect(() => {
    window.CommandBar.boot("me").then(() => {
      setCommandBarReady(true);
    });

    return window.CommandBar.shutdown;
  }, []);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addCommand({
        name: "home",
        text: "Go to Home",
        category: "Navigation",
        icon: "https://openmoji.org/data/color/svg/E269.svg",
        template: { type: "link", value: "/", operation: "router" },
        availability_rules: [
          {
            type: "url",
            operator: "isNot",
            value: "/",
          },
        ],
      });
      window.CommandBar.addCommand({
        name: "foo",
        text: "Go to Foo",
        category: "Navigation",
        icon: "https://openmoji.org/data/color/svg/E269.svg",
        template: { type: "link", value: "/foo", operation: "router" },
        availability_rules: [
          {
            type: "url",
            operator: "isNot",
            value: "/foo",
          },
        ],
      });

      return () => {
        window.CommandBar.removeCommand("home");
        window.CommandBar.removeCommand("foo");
      };
    }
  }, [commandBarReady]);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addRouter(navigate);
    }
  }, [navigate, commandBarReady]);

  useEffect(() => {
    window.CommandBar.addContext(
      "people",
      () =>
        people.map(({ first, last }, id) => ({
          id,
          label: `${first} ${last}`,
          first,
          last,
        })),
      {
        quickFindOptions: { quickFind: true },
      }
    );

    window.CommandBar.addCallback("create", (payload: Person) => {
      dispatch({ type: "CREATE", payload });
    });
    window.CommandBar.addCallback(
      "update",
      (payload: { selected: Person } & Person) => {
        dispatch({ type: "UPDATE", payload });
      }
    );
    window.CommandBar.addCallback("remove", (payload: { selected: Person }) => {
      dispatch({ type: "REMOVE", payload });
    });
    window.CommandBar.addCommand({
      name: "create",
      text: "Add a person",
      category: "CRUD",
      icon: "https://openmoji.org/data/color/svg/E268.svg",
      template: { type: "callback", value: "create" },
      arguments: {
        first: { order_key: 0, value: "text", type: "provided" },
        last: { order_key: 1, value: "text", type: "provided" },
      },
    });
    window.CommandBar.addCommand({
      name: "update",
      text: "Update a person",
      category: "CRUD",
      icon: "https://openmoji.org/data/color/svg/E25D.svg",
      template: { type: "callback", value: "update" },
      arguments: {
        selected: {
          order_key: 0,
          value: "people",
          type: "context",
          label: "Person to update",
        },
        first: {
          order_key: 1,
          value: "text",
          type: "provided",
          label: "New first name",
        },
        last: {
          order_key: 2,
          value: "text",
          type: "provided",
          label: "New last name",
        },
      },
    });

    window.CommandBar.addCommand({
      name: "remove",
      text: "Remove a person",
      category: "CRUD",
      icon: "https://openmoji.org/data/color/svg/E262.svg",
      template: { type: "callback", value: "remove" },
      arguments: {
        selected: {
          order_key: 0,
          value: "people",
          type: "context",
          label: "Person to update",
        },
      },
    });

    return () => {
      window.CommandBar.removeCommand("create");
      window.CommandBar.removeCommand("update");
      window.CommandBar.removeCommand("remove");
    };
  }, [dispatch, people]);

  return <>{children}</>;
};

export default App;
