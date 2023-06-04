import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import UserCard from "../components/UserCard";
import LoadIcon from "../images/loading.gif";

const SearchPage = () => {
    const location = useLocation();
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(0); // 0 for users, 1 for posts

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get("type");
        const query = queryParams.get("q");

        setSearch(query);

        const searchUsers = async () => {
            try {
                setLoading(true);
                const res = await getDataAPI(`search?type=${type}&q=${query}`, auth.token);
                setUsers(res.data.users);
                setLoading(false);
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err?.response?.data.msg },
                });
                setLoading(false);
            }
        };

        const searchPosts = async () => {
            try {
                setLoading(true);
                const res = await getDataAPI(`search?type=${type}&q=${query}`, auth.token);
                setPosts(res.data.posts);
                setLoading(false);
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err?.response?.data.msg },
                });
                setLoading(false);
            }
        };

        if (type === "user" && query) {
            searchUsers();
        } else if (type === "post" && query) {
            searchPosts();
        }
    }, [location.search, auth.token, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        const formattedQuery = search.replace(/\s+/g, '%20');
        const url = `/search?type=post&q=${formattedQuery}`;
        window.location.href = url;
    };

    return (
        <div className="search_page">
            <div className="search_header">
                <h1>Search in ResearchHub</h1>
                <form className="search_form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="query"
                        value={search}
                        id="search"
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                    <div className="search_icon" style={{ opacity: search }}>
                        <button type="submit">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="search_results">
                <div className="search_tab">
                    <button
                        className={tab === 0 ? "active" : ""}
                        onClick={() => {
                            setTab(0);
                            history.push(`/search?type=user&q=${search}`);
                        }}
                    >
                        Users
                    </button>
                    <button
                        className={tab === 1 ? "active" : ""}
                        onClick={() => {
                            setTab(1);
                            history.push(`/search?type=post&q=${search}`);
                        }}
                    >
                        Posts
                    </button>
                </div>
                {loading ? (
                    <img className="loading" src={LoadIcon} alt="loading" />
                ) : (
                    <>
                        {tab === 0 && (
                            <div className="users">
                                {users.length === 0 ? (
                                    <h2>No User Found</h2>
                                ) : (
                                    users.map((user) => (
                                        <UserCard key={user._id} user={user} />
                                    ))
                                )}
                            </div>
                        )}
                        {tab === 1 && (
                            <div className="posts">
                                {posts.length === 0 ? (
                                    <h2>No Post Found</h2>
                                ) : (
                                    posts.map((post) => (
                                        <Link to={`/post/${post._id}`} key={post._id}>
                                            <div key={post._id}>
                                                <h3>{post.content}</h3>
                                                <UserCard user={post.user} />
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
