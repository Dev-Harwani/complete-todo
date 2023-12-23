import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function AllTodos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/todos", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 75,
                backgroundColor: "black",
                color: "white",
            }}>
                <Typography variant={"h3"} >
                    My Todo List
                </Typography>
            </div>

            <div>

                {todos.map((todo, index) => (
                    <Card key={index}>
                        <Typography variant="body1">
                         {index + 1}.) {todo.title} - {todo.description}

                        </Typography>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default AllTodos;
