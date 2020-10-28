import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginUser } from '../../ducks/authReducer'
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
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import blueGrey from '@material-ui/core/colors/blueGrey'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

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
        marginTop: theme.spacing(3),
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

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirm_password: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleRegister = () => {
        const { email, first_name, last_name, password } = this.state
        if (this.state.password !== this.state.confirm_password) {
            alert("Passwords don't match")
            return
        }
        axios
            .post('/api/auth/newuser', { email, first_name, last_name, password })
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    handleUserChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleConfirmPassword = (e) => {
        if (e.target.value !== this.state.password) {
            alert('error')
            this.setState({ confirmPassword: e.target.value })
        }
    }

    render() {
        const classes = styles
        return (
            <MuiThemeProvider theme={theme} >
                <Container component="main" maxWidth="xs" style={{ position: 'relative', top: '8rem', left: '-2rem' }}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} style={{ color: '#607d8b' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="first_name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e) => {
                                            this.handleInput(e)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="last_name"
                                        autoComplete="lname"
                                        onChange={(e) => {
                                            this.handleInput(e)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => {
                                            this.handleInput(e)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => {
                                            this.handleInput(e)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => {
                                            this.handleInput(e)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails"
                                            style={{ color: '#607d8b' }} color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { this.handleRegister() }}
                            >
                                Sign Up
                        </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="./login" variant="body2"
                                        style={{ color: '#607d8b' }}>
                                        Already have an account? Sign in
                                </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    {/* <Box mt={5}>
                    <Copyright />
                </Box> */}
                </Container>
            </MuiThemeProvider>
        );
    }
}

export default connect(null, { loginUser })(Register)