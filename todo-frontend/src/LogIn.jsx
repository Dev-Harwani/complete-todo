import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState} from "react";

function LogIn() {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const handleLogin = () => {
        fetch("http://localhost:3000/login", {
            method:"POST",
            body: JSON.stringify({
                username: Email,
                password: Password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("token", data.token);
                window.location = "/Addtodo";
            })
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
                    <Typography variant='h6'>Welcome back. Login below</Typography>
                </center>
                <Card variant="outlined" style={{ width: 300 }}>
                    <TextField fullWidth label="Username" variant="outlined" margin="dense" size='small' onChange={(e) => {
                        setEmail(e.target.value);
                    }}  />
                    <br />
                    <TextField fullWidth  label="Password" variant="outlined" margin="dense" size='small' type={"password"} onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    }/>
                    <br />

                    <center>
                        <Button variant="outlined" onClick={handleLogin}>Submit</Button>
                    </center>
                </Card>
            </div>
        </div>
    )
}

export default LogIn;
