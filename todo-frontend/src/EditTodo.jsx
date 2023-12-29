import {useNavigate, useParams} from "react-router-dom";
import { useState} from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

function EditTodo(){
    const navigate = useNavigate();
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    const {todoNumber} = useParams();


    function handleEdit () {
        fetch("http://localhost:3000/todos/" + todoNumber, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                updatedTitle: updatedTitle,
                updatedDescription: updatedDescription
            })
        }).then((res) => res.json().then((data) => {
            console.log(data);
            navigate("/alltodos")
        }))
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
                    <Typography variant='h6'>Edit your TODO</Typography>
                </center>
                <Card variant="outlined" style={{ width: 300 }}>
                    <TextField fullWidth label="Title" variant="outlined" margin="dense" size='small' onChange={(e) => {
                        setUpdatedTitle(e.target.value);
                    }} />
                    <br />
                    <TextField fullWidth  label="Description" variant="outlined" margin="dense" size='small' onChange={
                        (e) => {
                            setUpdatedDescription(e.target.value);
                        }
                    } />
                    <br />
                    <center>
                        <Button variant="outlined" onClick={handleEdit}>Submit</Button>
                    </center>
                </Card>
            </div>
        </div>
    )
}

export default EditTodo;