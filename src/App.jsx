import React from "react"
import { useState } from "react"
import classes from './style.module.css'
import RegForm from "./components/RegForm"
import { useSelector } from "react-redux"
import Main from "./components/Main"
import LogForm from "./components/LogForm"

function App() {
	
	const token = useSelector(state => state.token)
	const username = useSelector(state => state.username)
	const [page, setPage] = useState('reg')
	const cssApp = [classes.App]
	
	return (
		<div className={cssApp.join(' ')}>
			<RegForm page={page} setPage={setPage} />
			<LogForm page={page} setPage={setPage} />
			<Main page={page} setPage={setPage} />
		</div>
	);
}

export default App;
