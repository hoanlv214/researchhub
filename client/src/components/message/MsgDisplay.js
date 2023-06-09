import React from "react"
import { imageShow, videoShow, PdfShow } from "../../utils/mediaShow"
import { useSelector, useDispatch } from "react-redux"
import { deleteMessages } from "../../redux/actions/messageAction"
import Times from "./Times"

const MsgDisplay = ({ user, msg, theme, data }) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteMessages = () => {
        if (!data) return;

        if (window.confirm("Do you want to delete message?")) {
            dispatch(deleteMessages({ msg, data, auth }))
        }
    };

    return (
        <>
            <div className="you_content">
                {
                    user._id === auth.user._id &&
                    <i className="fas fa-trash text-danger"
                        onClick={handleDeleteMessages} />
                }

                <div>
                    {
                        msg.text &&
                        <div className="chat_text"
                            style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                            {msg.text}
                        </div>
                    }
                    {
                        msg.media.map((item, index) => (
                            <div key={index}>
                                {
                                    item.url.match(/(video|\.pdf|\.png|\.jpg|\.jpeg|\.gif)$/i) ? (
                                        <>
                                            {item.url.match(/video/i) ? (
                                                videoShow(item.url, theme)
                                            ) : item.url.match(/\.pdf$/i) ? (
                                                <PdfShow url={item.url} theme={theme} />
                                            ) : (
                                                imageShow(item.url, theme)
                                            )}
                                        </>
                                    ) : (
                                        // Handle unsupported file types
                                        <p>Unsupported file type</p>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>

                {
                    msg.call &&
                    <button className="btn d-flex align-items-center py-3"
                        style={{ background: "white", borderRadius: "10px" }}>
                        <span className="material-icons font-weight-bold mr-1"
                            style={{
                                fontSize: "1.75rem", color: msg.call.times === 0 ? "tomato" : "green",
                                filter: theme ? "invert(1)" : "invert(0)"
                            }}>
                            {
                                msg.call.times === 0
                                    ? msg.call.video ? "videocam_off" : "phone_disabled"
                                    : msg.call.video ? "video_camera_front" : "call"
                            }
                        </span>

                        <div className="text-left">
                            <h6>{msg.call.video ? "Video Call" : "Audio Call"}</h6>
                            <small>
                                {
                                    msg.call.times > 0
                                        ? <Times total={msg.call.times} />
                                        : new Date(msg.createdAt).toLocaleTimeString()
                                }
                            </small>
                        </div>
                    </button>
                }
            </div>
        </>
    )
}

export default MsgDisplay
