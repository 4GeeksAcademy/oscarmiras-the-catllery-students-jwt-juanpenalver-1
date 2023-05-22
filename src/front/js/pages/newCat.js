import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserCats = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("miTokenJWT");

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchUserCats = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/cats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCats(data);
        } else {
          setError("Error al obtener los gatos del usuario");
        }
      } catch (error) {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCats();
  }, [token]);

<<<<<<< HEAD
  if (loading) {
    return <p>Cargando gatos...</p>;
  }
=======
    const response = await fetch(process.env.BACKEND_URL + "/api/cat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, imageUrl }),
    });
>>>>>>> 56b4a7b (Ejercicios hasta el 5)

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Mis Gatos</h2>
      {cats.length === 0 ? (
        <p>No tienes gatos</p>
      ) : (
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>
              <h3>{cat.name}</h3>
              <img src={cat.image_url} alt={cat.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
