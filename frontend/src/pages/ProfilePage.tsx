import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UPDATE_PROFILE } from "../graphql/mutations";
import ChangePasswordForm from "../components/ChangePasswordForm";

export default function ProfilePage() {
    const { data, loading, error } = useQuery(ME_QUERY);
    const [updateProfile] = useMutation(UPDATE_PROFILE);
    const client = useApolloClient();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        noHp: '',
        jenisKelamin: '',
        tanggalLahir: '',
        kotaTinggal: '',
    });

    useEffect(() => {
        if (data?.me) {
            setForm({
                noHp: data.me.noHp || "",
                jenisKelamin: data.me.jenisKelamin || "",
                tanggalLahir: data.me.tanggalLahir || "",
                kotaTinggal: data.me.kotaTinggal || "",
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const formattedTanggal = form.tanggalLahir ? new Date(form.tanggalLahir).toISOString : null;
            const variables = {
                ...(form.noHp !== "" && { noHp: form.noHp }),
                ...(form.jenisKelamin !== "" && { jenisKelamin: form.jenisKelamin }),
                ...(form.tanggalLahir !== "" && { tanggalLahir: formattedTanggal }),
                ...(form.kotaTinggal !== "" && { kotaTinggal: form.kotaTinggal }),
            };

            await updateProfile({ variables });
            setTimeout(() => {
                alert("Profil berhasil diperbaharui");
            }, 100);
        } catch (error) {
            console.error(error);
            alert("Gagal memperbaharui profil");
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem("token");
        await client.clearStore();
        navigate("/login");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { username, email, firstName, lastName } = data.me;

    return (
        <div>
            <h2>Akun Saya</h2>
            <p><strong>Nama Lengkap</strong></p>
            <p>{firstName} {lastName}</p>

            <p><strong>Username</strong></p>
            <p>{username}</p>

            <label>Jenis Kelamin:</label>
            <select name="jenisKelamin" value={form.jenisKelamin} onChange={handleChange}>
                <option value="">Pilih</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
            </select>

            <label>Tanggal Lahir:</label>
            <input type="date" name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} />

            <br />
            <label>Kota Tempat Tinggal:</label>
            <input type="text" name="kotaTinggal" value={form.kotaTinggal} onChange={handleChange} />

            <p><strong>Email</strong></p>
            <p>{email}</p>

            <label>No. Handphone:</label>
            <input type="text" name="noHp" value={form.noHp} onChange={handleChange} />

            <br />

            <button onClick={handleSave}>Simpan</button>
            <ChangePasswordForm />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}