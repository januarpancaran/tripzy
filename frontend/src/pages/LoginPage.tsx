import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LOGIN_USER } from "../graphql/mutations";

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({username: '', password: ''});
    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: ({tokenAuth}) => {
            localStorage.setItem("token", tokenAuth.token);
            navigate("/profile");
        },
        onError: (err) => alert(err.message),
    });

    return (
        <form onSubmit={e => {
            e.preventDefault();
            loginUser({ variables: form });
        }}>
            <h2>Login</h2>
            <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
            <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}