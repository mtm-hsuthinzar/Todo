import { useEffect, useRef, useState } from "react";

import {
  Box,
  IconButton,
  List,
  OutlinedInput,
  InputAdornment,
  Alert,
} from "@mui/material"; // Import from Material UI

import { Add as AddIcon } from "@mui/icons-material"; // Import Icon

import Item from "./Item";
import Header from "./Header";

const api = "http://localhost:8080/tasks";

export default function App() {
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(api);
        if (res.ok) {
          setData(await res.json());
          setIsLoading(false);
        } else {
          sethasError(true);
        }
      } catch (e) {
        sethasError(false);
      }
    })();
  }, []);

  const remove = (_id) => {
    setData(data.filter((item) => item._id !== _id));
    fetch(`${api}/${_id}`, { method: "DELETE" });
  };

  const toggle = (_id) => {
    setData(
      data.map((item) => {
        if (item._id === _id) item.done = !item.done;
        return item;
      })
    );

    fetch(`${api}/${_id}/toggle`, { method: "PUT" });
  };

  const add = async (name) => {
    const res = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const item = await res.json();
    const _id = data[data.length - 1]._id + 1;
    setData([...data, item]);
  };

  return (
    <Box>
      <Header count={data.filter((item) => !item.done).length} />
      <Box sx={{ mx: "auto", maxWidth: "md", mt: 4 }}>
        {IsLoading && <Box sx={{ mb: 2, textAlign: "center" }}>Loading...</Box>}

        {hasError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Something went wrong
          </Alert>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const name = inputRef.current.value;
            if (!name) return false;

            add(name);

            inputRef.current.value = "";
            inputRef.current.focus();
          }}
        >
          <OutlinedInput
            fullWidth
            inputRef={inputRef}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
        <List>
          {data
            .filter((item) => !item.done)
            .map((item) => {
              return (
                <Item
                  key={item._id}
                  item={item}
                  remove={remove}
                  toggle={toggle}
                />
              );
            })}
        </List>
        <hr />
        <List>
          {data
            .filter((item) => item.done)
            .map((item) => {
              return (
                <Item
                  key={item._id}
                  item={item}
                  remove={remove}
                  toggle={toggle}
                />
              );
            })}
        </List>
      </Box>
    </Box>
  );
}
