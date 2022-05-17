import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "@remix-run/react";
import type { ContextType, Person } from "~/root";

export default function Index() {
  const context = useOutletContext<ContextType>();
  const [prefix, setPrefix] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [index, setIndex] = useState(0);
  const [filteredPeople, setFilteredPeople] = useState(
    prefix
      ? context?.people.filter((person) => {
          const name = `${person.last}, ${person.first}`;
          return name.toLowerCase().startsWith(prefix.toLowerCase());
        })
      : context?.people
  );
  const [selected, setSelected] = useState<Person>();

  useEffect(() => {
    setFilteredPeople(
      prefix
        ? context?.people.filter((person) => {
            const name = `${person.last}, ${person.first}`;
            return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : context?.people
    );
  }, [context?.people, prefix]);

  useEffect(() => {
    if (filteredPeople) {
      setSelected(filteredPeople[index]);
    }
  }, [filteredPeople, index]);

  const reset_inputs = useCallback((person: Person) => {
    setFirst(person ? person.first : "");
    setLast(person ? person.last : "");
  }, []);

  useEffect(() => {
    if (selected) {
      reset_inputs(selected);
    }
  }, [reset_inputs, selected]);

  return (
    <main>
      <input
        placeholder="filter prefix"
        onChange={(e) => {
          setPrefix(e.target.value);
        }}
        value={prefix}
      />

      <select
        onChange={(e) => {
          setIndex(Number(e.target.value));
        }}
        size={5}
      >
        {filteredPeople?.map((person, i) => (
          <option key={i} value={i}>
            {person.last}, {person.first}
          </option>
        ))}
      </select>

      <label>
        <input
          onChange={(e) => {
            setFirst(e.target.value);
          }}
          value={first}
          placeholder="first"
        />
      </label>
      <label>
        <input
          onChange={(e) => {
            setLast(e.target.value);
          }}
          value={last}
          placeholder="last"
        />
      </label>

      <div className="buttons">
        <button
          onClick={() => {
            context?.create({ first, last });
          }}
          disabled={!first || !last}
        >
          create
        </button>
        <button
          onClick={() => {
            if (selected) {
              context?.update({ selected, first, last });
            }
          }}
          disabled={!first || !last || !selected}
        >
          update
        </button>
        <button
          onClick={() => {
            if (selected) {
              context?.remove({ selected });
            }
          }}
          disabled={!selected}
        >
          delete
        </button>
      </div>
    </main>
  );
}
