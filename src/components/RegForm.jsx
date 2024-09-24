import React from "react";
import { useState } from "react";
import classes from '../style.module.css'
import { useDispatch } from "react-redux";

function RegForm(props) {

    const cssForm = [classes.Form]
    if(props.page == 'reg') {
        cssForm.push(classes.active)
    }
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [err, setErr] = useState([])

    function call() {
        const baseURL = 'http://127.0.0.1:8000/'
        const options = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept':  'application/json'
            },
            'body': JSON.stringify({
                'name': name,
                'email': email,
                'password': password
            })
        }
        fetch(baseURL + 'reg', options)
        .then(response => {
            response.json()
            .then(body => {
                if(response.status == 201) {
                    dispatch({
                        type: 'set',
                        payload: {
                            token: body['data']['user_token'],
                            username: name
                        }
                    })
                    props.setPage('main')
                }
                if(response.status == 422) {
                    setErr([body['error']['errors']['email'], body['error']['errors']['password'], body['error']['errors']['name']])
                }
            })
        })
    }

    return (
        <div className={cssForm.join(' ')}>
            <input type="text" placeholder="Имя" onChange={e => setName(e.target.value)}/> <br />
            <input type="email" placeholder="Емейл" onChange={e => setEmail(e.target.value)}/> <br />
            <input type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)}/> <br />
            <button onClick={e => [e.preventDefault(), call()]}>Зарегистрироваться</button> <br />
            <button onClick={e => [e.preventDefault(), props.setPage('auth')]}>У меня есть аккаунт</button>
            {err.map((er, i) => <h1 key={i}>{er}</h1>)}
        </div>
    )

}

export default RegForm