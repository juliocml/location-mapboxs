const StoreByInput = ({ storeDetails, error }) => {
  return (
    <div>
      <h1>
        {storeDetails.length
          ? "Tienda para entrega encontrada"
          : "Aún no llegamos a esta ubicación"}
      </h1>
      <h3>Hubo error: {error ? "Sí" : "No"}</h3>
      <div style={{ width: "80%", margin: "auto" }}>
        <pre>{JSON.stringify(storeDetails, null, 2)}</pre>
      </div>
    </div>
  );
};

export default StoreByInput;
