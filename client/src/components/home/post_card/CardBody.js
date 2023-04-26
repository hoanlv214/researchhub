import React, { useState } from "react"
import Carousel from "../../Carousel"
import Link from "react-router-dom/Link"
const CardBody = ({ post, theme }) => {
    const [readMore, setReadMore] = useState(false)


    return (
        <div className="card_body">
            <div className="card_body-content"
                style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    color: theme ? "white" : "black",
                }}>
                <Link key={post._id} to={`/post/${post._id}`}>
                    <span>
                        {
                            post.content.length < 60
                                ? post.content
                                : readMore ? post.content + " " : post.content.slice(0, 60) + "....."
                        }
                    </span>
                    {
                        post.content.length > 60 &&
                        <span className="readMore" onClick={() => setReadMore(!readMore)}>
                            {readMore ? "Hide content" : "Read more"}
                        </span>
                    }
                </Link>


            </div>
            {
                post.images.length > 0 && <Carousel images={post.images} id={post._id} />
            }
        </div>
    )
}

export default CardBody