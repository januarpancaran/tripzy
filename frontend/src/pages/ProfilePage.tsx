import { useApolloClient, useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { data, loading, error } = useQuery(ME_QUERY);
    const client = useApolloClient();
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        await client.clearStore();
        navigate("/login");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { username, email, firstName, lastName, noHp } = data.me;

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username</strong></p>
            <p>{username}</p>

            <p><strong>Email</strong></p>
            <p>{email}</p>

            <p><strong>Nama</strong></p>
            <p>{firstName} {lastName}</p>

            <p><strong>No HP</strong></p>
            <p>{noHp}</p>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}