import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";


function AllTodos() {

    const navigate = useNavigate();
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
                    <Card key={index} style={{display: "flex", justifyContent: "space-evenly"}}>
                        <Typography variant="body1">
                            <div>
                                TITLE: {todo.title} DESCRIPTION: {todo.description}

                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <Button onClick={() => {
                                    navigate("/EditTodos/" + todo.number)
                                }
                                }>Edit</Button>
                            </div>

                        </Typography>
                    </Card>
                ))}
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Button onClick={() => {
                        navigate("/Addtodo")
                    }}>ADD A TODO</Button>
                </div>
            </div>
        </>
    )
}

export default AllTodos;
