import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REQUEST_PASSWORD_RESET } from "../graphql/mutations";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const [requestReset] = useMutation(REQUEST_PASSWORD_RESET, {
        onCompleted: () => setSuccess(true),
        onError: (err) => alert(err.message),
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            requestReset({ variables: { email }});
        }}>
            <h2>Lupa Password</h2>
            {success ? (
                <p>Silakan cek email untuk link reset password</p>
            ) : (
                <>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit">Kirim</button>
                </>
            )}
        </form>
    );
}