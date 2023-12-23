import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function AppBar(){
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/me", {
            method: "GET",
            headers: {
                "Authorization" :"Bearer " +localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                if (data.username){
                    setUserEmail(data.username);
                }
            })
        })
    }, []);

    if (userEmail){
        return (
            <>
                <div style={{
                    // width: "100vw",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#eeeeee",
                }}>
                    <div>
                        <Typography variant={"h5"}>Todos by Dev</Typography>
                    </div>
                    <div>
                        <div>
                        {userEmail}
                        </div>
                        <Button variant="outlined" onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/login";
                        }}>LogOut</Button>
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            <div style={{
                // width: "100vw",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#eeeeee",
            }}>
                <div>
                    <Typography variant={"h5"}>Welcome</Typography>
                </div>
                <div>
                <Button variant="outlined" onClick={() => {
                    navigate("/signup");
                }}>SignUp</Button>
                <Button variant="outlined" onClick={() => {
                    navigate("/login");
                }}>LogIn</Button>
                </div>
            </div>
        </>
    )
}


export default AppBar;