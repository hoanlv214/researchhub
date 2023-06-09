import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import axios from "axios";

const Register = () => {
    const { auth, alert } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        cf_password: "",
        institution: "",
        gender: "male",
    };
    const [userData, setUserData] = useState(initialState);
    const {
        fullname,
        username,
        email,
        password,
        cf_password,
        institution,
    } = userData;

    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);
    const [institutionOptions, setInstitutionOptions] = useState([]);

    useEffect(() => {
        if (auth.token) history.push("/");
    }, [auth.token, history]);

    let timeoutId = null;

    const handleInstitutionSearch = (query) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/hoanlv214/university-domains-list/master/world_universities_and_domains.json"
                );

                const institutions = response.data.filter(
                    (item) => item.name.toLowerCase().includes(query.toLowerCase())
                );

                const institutionNames = institutions.map((item) => item.name);
                setInstitutionOptions(institutionNames);
            } catch (error) {
                console.error("Error fetching institutions:", error);
            }
        }, 2000);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the institution field
        if (!institution) {
            console.error("Institution is required");
            return;
        }

        const updatedUserData = { ...userData, institution };
        dispatch(register(updatedUserData));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h1 className="text-uppercase text-center mb-4">Research Hub</h1>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        onChange={handleChangeInput}
                        value={fullname}
                        style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
                    />

                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={handleChangeInput}
                        value={username.toLowerCase().replace(/ /g, "")}
                        style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
                    />

                    <small className="form-text text-danger">
                        {alert.username ? alert.username : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        onChange={handleChangeInput}
                        value={email}
                        style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
                    />

                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="institution">Institution</label>
                    <input
                        type="text"
                        className="form-control"
                        id="institution"
                        name="institution"
                        onChange={handleChangeInput}
                        value={institution}
                        style={{ background: `${alert.institution ? "#fd2d6a14" : ""}` }}
                        autoComplete="off"
                        list="institutionOptions"
                        onKeyUp={(e) => handleInstitutionSearch(e.target.value)}
                    />

                    <datalist id="institutionOptions">
                        {institutionOptions.map((option) => (
                            <option key={option} value={option} />
                        ))}
                    </datalist>

                    <small className="form-text text-danger">
                        {alert.institution ? alert.institution : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        <input
                            type={typePass ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={handleChangeInput}
                            value={password}
                            name="password"
                            style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
                        />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? "Hide" : "Show"}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>

                    <div className="pass">
                        <input
                            type={typeCfPass ? "text" : "password"}
                            className="form-control"
                            id="cf_password"
                            onChange={handleChangeInput}
                            value={cf_password}
                            name="cf_password"
                            style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
                        />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? "Hide" : "Show"}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ""}
                    </small>
                </div>

                <div className="gender">
                    <label htmlFor="male">
                        Male:{" "}
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            defaultChecked
                            onChange={handleChangeInput}
                        />
                    </label>

                    <label htmlFor="female">
                        Female:{" "}
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleChangeInput}
                        />
                    </label>

                    <label htmlFor="other">
                        Other:{" "}
                        <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            onChange={handleChangeInput}
                        />
                    </label>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Register
                </button>

                <p className="my-2">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "tomato" }}>
                        Login Now
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
