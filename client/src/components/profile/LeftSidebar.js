import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

const LeftSideBar = () => {
    const { auth, suggestions } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className="mt-3">
            <UserCard user={auth.user} />
            <div
                className="d-flex justify-content-between align-items-center my-2"
                style={{ paddingLeft: "5px", border: "1px solid black" }}
            >
                <h5 className="text-danger">Suggestions for you</h5>
                {!suggestions.loading && (
                    <i
                        className="fas fa-redo"
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(getSuggestions(auth.token))}
                    />
                )}
            </div>

            {suggestions.loading ? (
                <img
                    src={LoadIcon}
                    alt="loading"
                    className="d-flex justify-content-between align-items-center my-2"
                />
            ) : (
                <div className="suggestions">
                    {suggestions.users.map((user) => (
                        <UserCard key={user._id} user={user}>
                            <FollowBtn user={user} />
                        </UserCard>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LeftSideBar;