import { useCallback, useEffect, useState } from "react";
import { Person, useCrud } from "../CrudProvider";

const Home = () => {
  const [people, dispatch] = useCrud();

  const [prefix, setPrefix] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [index, setIndex] = useState(0);

  const [filteredPeople, setFilteredPeople] = useState(
    prefix
      ? people.filter((person) => {
          const name = `${person.last}, ${person.first}`;
          return name.toLowerCase().startsWith(prefix.toLowerCase());
        })
      : people
  );
  const [selected, setSelected] = useState(filteredPeople[index]);

  useEffect(() => {
    setFilteredPeople(
      prefix
        ? people.filter((person) => {
            const name = `${person.last}, ${person.first}`;
            return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : people
    );
  }, [people, prefix]);

  useEffect(() => {
    setSelected(filteredPeople[index]);
  }, [filteredPeople, index]);

  const reset_inputs = useCallback((person: Person) => {
    setFirst(person ? person.first : "");
    setLast(person ? person.last : "");
  }, []);

  useEffect(() => {
    reset_inputs(selected);
  }, [reset_inputs, selected]);

  const create = () => {
    dispatch({ type: "CREATE", payload: { first, last } });
    setIndex(people.length - 1);
    setFirst("");
    setLast("");
  };

  const update = () => {
    dispatch({ type: "UPDATE", payload: { selected, first, last } });
    setSelected({ first, last });
  };

  const remove = () => {
    dispatch({ type: "REMOVE", payload: { selected } });
    setFirst("");
    setLast("");
    setIndex((_index) => Math.min(_index, filteredPeople.length - 2));
  };

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
        {filteredPeople.map((person, i) => (
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
        <button onClick={create} disabled={!first || !last}>
          create
        </button>
        <button onClick={update} disabled={!first || !last || !selected}>
          update
        </button>
        <button onClick={remove} disabled={!selected}>
          delete
        </button>
      </div>
    </main>
  );
};

export default Home;
