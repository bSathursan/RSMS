import { useState } from "react";
import { login } from "../api/authApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleToast } from "../helper/helper";
import Grid from '@mui/material/Grid';
import './Login.css'

const Login = () => {
    const [credentials, setCredentials] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(credentials)
            .then(res => {
                console.log(res)
                if (res.data.isSuccessful) {
                    localStorage.setItem('authentication', res.data.responseData.accessToken);
                    window.location.href = '/';
                } else {
                    handleToast('Login failed!', 'info');
                }
            })
            .catch(() => handleToast('Login failed! Please try again', 'info'));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email': {
                setCredentials({ ...credentials, email: value });
                break;
            }
            case 'password': {
                setCredentials({ ...credentials, password: value });
                break;
            }
            default: { }
        }
    }

    return (
        <>
            <Grid style={{marginTop:"190px",width:'500px',marginLeft:'350px'}}
                direction="row"
            >
                <Grid item xs={0} md={4}></Grid>
                <Grid  px={3} py={3} xs={12} md={4} style={{borderRadius:"20px", background:"#f2f2f2"}}>
                    <center>
                        <h1 className="heading" style={{color:'#707070'}} >Login</h1>
                    </center>
                    <TextField style={{marginTop:"-30px",marginLeft:'20px'}}
                        autoFocus
                        className="input_style"
                        margin="dense"
                        name="email"
                        placeholder="Email address"
                        // fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField style={{marginLeft:'20px'}}
                        autoFocus
                        className="input_style"
                        name="password"
                        margin="dense"
                        placeholder="Password"
                        type="password"
                        //fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <center>
                        <Button style={{marginTop:"30px",marginBottom:"30px", color:"white", fontSize:"18px", fontWeight:"500", borderRadius:"15px", width:"420px"}} className="login_button" onClick={handleSubmit}>Sign in</Button>
                    </center>
                </Grid>
                <Grid item xs={0} md={4}></Grid>
            </Grid>
        </>
    );
}

export default Login;