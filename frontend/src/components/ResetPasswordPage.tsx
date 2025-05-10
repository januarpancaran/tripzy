import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "../graphql/mutations";

export default function ResetPasswordPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const uid = params.get("uid") || "";
    const token = params.get("token") || "";

    const [newPassword, setNewPassword] = useState("");
    const [resetPassword] = useMutation(RESET_PASSWORD, {
        onCompleted: () => {
            alert("Password berhasil diubah. Silakan login");
            navigate("/login");
        },
        onError: (err) => alert(err.message),
    });

    return (
        <form onSubmit={e => {
            e.preventDefault();
            resetPassword({ variables: { uid, token, newPassword }});
        }}>
            <h2>Reset Password</h2>
            <input type="password" placeholder="Password Baru" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <button type="submit">Ubah Password</button>
        </form>
    );
}