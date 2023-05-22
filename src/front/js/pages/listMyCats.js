import React, { useState, useEffect } from "react";

export const ListMyCats = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const token = localStorage.getItem("miTokenJWT");

      if (!token) {
        // Mmmmm... no tengo el token, no debería poder acceder a está página de React
        navigate('/login');
        return;
      }

      const response = await fetch(process.env.BACKEND_URL + "/api/cats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCats(data);
      } else {
      setAlertVariant("danger");
      setAlertMessage(data.error || "Error gatuno");
      }
    };

    fetchCats();
  }, []);

  return (
    <div>
      <h1>My Cats</h1>
      {cats.map((cat, index) => (
        <div key={index}>
          <p>{cat.name}</p>
          <img src={cat.image_url} alt={cat.name} />
        </div>
      ))}
    </div>
  );
};
