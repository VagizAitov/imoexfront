import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../Navbar/Nav'
import classes from './posts.module.scss'

export default function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://45.67.59.245:8082/posts')
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className={classes.main}>
                <div>
                    <Link to='/add-post'>Add new post</Link>
                </div>
                <div>
                    <ul className={classes.postsContainer}>
                        {(posts[0] == undefined) ? <p>Loading...</p> : 
                        posts.map(post => 
                            <li>
                                <div className={classes.wrapper}>
                                    <p className={classes.title}>
                                        <Link to={`/post/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </p>
                                    <p className={classes.text}>{post.text}</p>
                                </div>
                            </li>
                        )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
