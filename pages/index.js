import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home() {

    const [posts, setPosts] = useState([])


useEffect(() => {
axios.get(`/api/posts`)
.then((result) => {
    console.log(result.data.message)
    setPosts(result.data.message)
})

}, [])


const deleteItem = (postid) => {
axios.delete(`/api/posts`, { data: { _id: postid } }) 
.then(() => {
console.log(posts.filter(el => el._id !== postid.toString()))
setPosts(posts.filter(el => el._id !== postid.toString()))
})
}


    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} deleteItem={deleteItem} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

// export async function getServerSideProps(ctx) {
//     // get the current environment
//     let dev = process.env.NODE_ENV !== 'production';
//     let { DEV_URL, PROD_URL } = process.env;

//     // request posts from api
//     let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
//     // extract the data
//     let data = await response.json();

//     return {
//         props: {
//             posts: data['message'],
//         },
//     };
// }