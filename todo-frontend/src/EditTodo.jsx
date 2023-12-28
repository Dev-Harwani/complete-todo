import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {useState} from "react";


function EditTodo() {
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    let {todoNumber} = useParams();
    const HandleEdit = () => {

        fetch("http://localhost:3000/todos/" + todoNumber, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json"
            },
            method: "PUT",
            body:JSON.stringify({
                updatedTitle: updatedTitle,
                updatedDescription: updatedDescription

            })
        }).then((res) => res.json().then((data) => {
                console.log(data);
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
            {}
            <div style={{
                marginTop: 250,
            }}>
                <center>
                    <Typography variant='h6'>Edit your TODO</Typography>
                </center>
                <Card variant="outlined" style={{width: 300}}> {/* Set maxWidth instead of width */}
                    <TextField fullWidth label="title" variant="outlined" margin="dense" size='small' onChange={
                        (e) => {
                            setUpdatedTitle(e.target.value);
                        }
                    }/>
                    <br/>
                    <TextField fullWidth label="Description" variant="outlined" margin="dense" size='small' onChange={
                        (e) => {
                            setUpdatedDescription(e.target.value);
                        }
                    }/>
                    <br/>
                    <center>
                        <Button variant="outlined" onClick={HandleEdit}>Submit</Button>
                    </center>
                </Card>
            </div>
        </div>
    )
}


export default EditTodo;