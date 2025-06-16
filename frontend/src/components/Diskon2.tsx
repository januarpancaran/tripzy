import React from "react";
import { useQuery } from "@apollo/client";
import { GET_DISKON } from "../graphql/queries";

const formatRp = (value: number): string => {
  if (value >= 1_000_000) {
    return `Rp${value / 1_000_000}jt`;
  } else if (value >= 1_000) {
    return `Rp${value / 1_000}rb`;
  } else {
    return `Rp${value}`;
  }
};

export const Diskon: React.FC = () => {
  const { data, loading, error } = useQuery(GET_DISKON);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>Dapatkan Kupon Diskon 10% Khusus Pengguna Baru!*<br/>*Berlaku untuk transaksi pertama</h4>
      {data.allDiskon.length === 0 ? (
        <p>Tidak ada diskon tersedia saat ini.</p>
      ) : (
        <ul>
          {data.allDiskon.map((diskon: any) => (
            <li key={diskon.id}>
              <h4>{diskon.description}</h4>
              <h6>min. transaksi {formatRp(diskon.minTransaksi)}</h6>
              <h4>{diskon.code}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
