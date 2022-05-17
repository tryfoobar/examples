import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import stylesheetUrl from "./global.css";

export const links = () => [{ rel: "stylesheet", href: stylesheetUrl }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export type Person = { first: string; last: string };
export type ContextType = {
  people: Person[];
  create: (person: Person) => void;
  update: ({ selected, first, last }: { selected: Person } & Person) => void;
  remove: ({ selected }: { selected: Person }) => void;
};

export default function App() {
  const navigate = useNavigate();

  const [people, setPeople] = useState([
    { first: "Hans", last: "Emil" },
    { first: "Max", last: "Mustermann" },
    { first: "Roman", last: "Tisch" },
  ]);

  const selectedPersonIndex = useCallback(
    (selected: Person) =>
      people.findIndex(
        (person) =>
          person.first === selected.first && person.last === selected.last
      ),
    [people]
  );

  const create = useCallback(
    ({ first: _first, last: _last }: Person) =>
      setPeople([...people, { first: _first, last: _last }]),
    [people]
  );
  const update = useCallback(
    ({
      selected: _selected,
      first: _first,
      last: _last,
    }: { selected: Person } & Person) =>
      setPeople(
        people.map((person, i) =>
          i === selectedPersonIndex(_selected)
            ? { first: _first, last: _last }
            : person
        )
      ),
    [people, selectedPersonIndex]
  );
  const remove = useCallback(
    ({ selected: _selected }: { selected: Person }) =>
      setPeople(() => {
        const index = selectedPersonIndex(_selected);
        return [...people.slice(0, index), ...people.slice(index + 1)];
      }),
    [people, selectedPersonIndex]
  );

  const context: ContextType = { people, create, update, remove };
  const outlet = <Outlet context={context} />;

  useEffect(() => {
    void window.CommandBar.boot("me");
    return window.CommandBar.shutdown;
  }, []);

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
  }, [people]);

  useEffect(() => {
    window.CommandBar.addCallback("create", create);
  }, [create]);

  useEffect(() => {
    window.CommandBar.addCallback("update", update);
  }, [update]);

  useEffect(() => {
    window.CommandBar.addCallback("remove", remove);
  }, [remove]);

  useEffect(() => {
    void window.CommandBar.addCommand({
      name: "Home",
      text: "Home",
      category: "Navigation",
      template: { type: "link", value: "/", operation: "router" },
    });
    void window.CommandBar.addCommand({
      name: "Foo",
      text: "Foo",
      category: "Navigation",
      template: { type: "link", value: "/foo", operation: "router" },
    });

    void window.CommandBar.addCommand({
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
    void window.CommandBar.addCommand({
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

    void window.CommandBar.addCommand({
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
      window.CommandBar.removeCommand("home");
      window.CommandBar.removeCommand("foo");
      window.CommandBar.removeCommand("create");
      window.CommandBar.removeCommand("update");
      window.CommandBar.removeCommand("remove");
    };
  }, []);

  useEffect(() => {
    window.CommandBar.addRouter(navigate);
  }, [navigate]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/foo">Foo</NavLink>
        </nav>
        {outlet}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
