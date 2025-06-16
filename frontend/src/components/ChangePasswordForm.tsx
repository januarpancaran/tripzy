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
            <h4 className="text-l font-small text-gray-700 mb-4">Ubah Password</h4>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="old_pass" className="block text-gray-600 text-sm font-medium mb-1">
                Password Lama
              </label>
              <input
                type="password"
                id="old_pass"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

                        <div className="col-span-1 md:col-span-2">
              <label htmlFor="old_pass" className="block text-gray-600 text-sm font-medium mb-1">
                Password Baru
              </label>
              <input
                type="password"
                id="old_pass"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="w-20 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md mt-1" onClick={handleSubmit}>Simpan</button>
        </div>
    )
}