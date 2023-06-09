import React, { useEffect } from "react"

import Status from "../components/home/Status"
import Posts from "../components/home/Posts"
import RightSideBar from "../components/home/RightSideBar"
import LeftSideBar from "../components/home/LeftSideBar"

import { useSelector } from "react-redux"
import LoadIcon from "../images/loading.gif"


let scroll = 0;

const Home = () => {
    const { homePosts } = useSelector(state => state)

    window.addEventListener("scroll", () => {
        if (window.location.pathname === "/") {
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: "smooth" })
        }, 100)
    }, [])

    return (
        <div className="container_home">
            <LeftSideBar />
            <div className="home row mx-0 col-md-6">
                <Status />
                {
                    homePosts.loading
                        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                        : (homePosts.result === 0 && homePosts.posts.length === 0)
                            ? <h2 className="nopost">No Post</h2>
                            : <Posts />
                }
            </div>
            <RightSideBar />
        </div>
    )
}

export default Home
