import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import axios from 'axios'
import './login.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import blueGrey from '@material-ui/core/colors/blueGrey'

const styles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
    },
})

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//         </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleLogin = () => {
        const { email, password } = this.state
        axios.post('/api/auth/login', { email, password }).then((res) => {
            this.props.loginUser(res.data)
            this.props.history.push('/')
        }).catch((err) => {
            alert(err.message)
        })
    }

    render() {
        const classes = styles
        return (
            <MuiThemeProvider theme={theme} >
                <Container style={{ position: 'relative', top: '8rem', left: '-2rem' }} component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} style={{ color: '#607d8b' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                    </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => { this.handleInput(e) }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => { this.handleInput(e) }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" style={{ color: '#607d8b' }} />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color='primary'
                                onClick={() => { this.handleLogin() }}>
                                Sign In
                            </Button>
                            {/* <Grid container> */}
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="./register" style={{ color: '#607d8b' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                            {/* </Grid> */}
                        </form>
                    </div>
                    {/* <Box mt={8}>
                    <Copyright />
                </Box> */}
                </Container>
            </MuiThemeProvider >
        )
    }
}

export default connect(null, { loginUser })(Login);