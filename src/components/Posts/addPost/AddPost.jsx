import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../../Navbar/Nav'
import classes from './addPost.module.scss'

export default function AddPost() {
    const nav = useNavigate()
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('token')).id)

    const submit = () => {
        axios.post('http://45.67.59.245:8082/posts', {
            id: Date.now(),
            iduser: userId,
            title: title,
            text: text
        }).then(res => console.log(res))
        nav('/posts')
    }
  return (
    <div>
      <Nav/>
      <div className={classes.main}>
        <Link to='/posts'>Posts</Link> 
        <Link to='/main'>Main</Link>
        <br />

        <input type="text" name="" id="" placeholder='Title' onChange={() => setTitle(event.target.value)}/>
        <br />
        <textarea type="textarea" name="" id="" placeholder='Your text' onChange={() => setText(event.target.value)}/>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  )
}
