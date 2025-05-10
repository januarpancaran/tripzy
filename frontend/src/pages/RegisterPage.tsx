import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REGISTER_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '', email: '', password: '', firstName: '', lastName: '', noHp: '',
    });
    const [registerUser] = useMutation(REGISTER_USER, {
        onCompleted: () => navigate("/login"),
        onError: (err) => alert(err.message),
    });

    return (
        <form onSubmit={e => {
            e.preventDefault();
            registerUser({ variables: form });
        }}>
            <h2>Register</h2>
            {Object.entries(form).map(([key, val]) => (
                <input key={key} placeholder={key} value={val} onChange={e => setForm({ ...form, [key]: e.target.value })} />
            ))}
            <button type="submit">Register</button>
        </form>
    )
}