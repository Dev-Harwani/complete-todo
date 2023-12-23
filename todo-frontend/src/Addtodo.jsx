import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";


function Addtodo(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleTodo() {
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body:JSON.stringify({
                title: title,
                description: description,

            })
        }).then((res) => res.json().then((data) => {
            console.log(data);
            alert("todo added");
        } ))
    }

    function showTodos() {
        window.location = "/alltodos";
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#eeeeee",

        }}>

            <div style={{
                marginTop: 250,
            }}>
                <center>
                    <Typography variant='h6'>Add a Todo</Typography>
                </center>
                <Card variant="outlined" style={{width: 300}}> {/* Set maxWidth instead of width */}
                    <TextField fullWidth label="title" variant="outlined" margin="dense" size='small' onChange={
                        (e) => {
                            setTitle(e.target.value);
                        }
                    }/>
                    <br/>
                    <TextField fullWidth label="Description" variant="outlined" margin="dense" size='small' onChange={
                        (e) => {
                            setDescription(e.target.value);
                        }
                    }/>
                    <br/>
                    <center>
                        <Button variant="outlined" onClick={handleTodo}>Add Todo</Button>
                        <Button variant={"outlined"} onClick={showTodos}>All Todos</Button>
                    </center>
                </Card>
            </div>
        </div>
    )
}

export default Addtodo;