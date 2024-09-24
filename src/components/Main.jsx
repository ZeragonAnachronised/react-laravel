import React from "react";
import classes from '../style.module.css'
import { useSelector } from "react-redux";

export default function Main(props) {

    const cssMain = [classes.Main]
    if(props.page == 'main') {
        cssMain.push(classes.active)
    }
    
	const token = useSelector(state => state.token)
	const username = useSelector(state => state.username)

    function logout() {
        const baseURL = 'http://127.0.0.1:8000/'
        const options = {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Accept':  'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        fetch(baseURL + 'logout', options)
        .then(response => {
            response.json()
            .then(body => {
                if(response.status == 201) {
                    props.setPage('auth')
                }
            })
        })
    }

    return (
        <div className={cssMain.join(' ')}>
            <div className={classes.Header}>
                <div>Блог</div>
                <div>Форум</div>
                <div><button>{username}</button></div>
                <div><button onClick={e => [e.preventDefault(), logout()]}><img src="logout.png" width="40" /></button></div>
            </div>
            <div className={classes.MenuWelcome}>
                <div>Добро пожаловать на ZeraUni</div>
                <div><img src="b2.png" alt="" /></div>
            </div>
            <div className={classes.MenuFeatures}>
                <h1>ZeraUni для вас!</h1>
                <ul>
                    <li>Общайтесь с друзьями</li>
                    <li>Обсуждайте</li>
                    <li>Делитесь мыслями</li>
                    <li>Читайте блог</li>
                </ul>
            </div>
        </div>
    )

}