import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CHANGE_PASSWORD } from "../graphql/mutations";

export default function ChangePasswordForm() {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [changePassword] = useMutation(CHANGE_PASSWORD);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = async () => {
        try {
            const { data } = await changePassword({
                variables: {
                    oldPassword: form.oldPassword,
                    newPassword: form.newPassword,
                },
            });

            if (data.changePassword.success) {
                alert("Password berhasil diubah");
                setForm({ oldPassword: "", newPassword: "" });
            } else {
                alert("Gagal mengubah password: " + JSON.stringify(data.changePassword.console.errors));
            }
        } catch (error) {
            alert("Terjadi kesalahan saat mengubah password");
            console.error(error);
        }
    };
    
    return (
        <div>
            <h3>Ubah Password</h3>
            <label>Password Lama:</label>
            <input type="password" name="oldPassword" value={form.oldPassword} onChange={handleChange} />

            <label>Password Baru:</label>
            <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} />

            <button onClick={handleSubmit}>Simpan</button>
        </div>
    )
}