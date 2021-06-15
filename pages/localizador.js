import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import StoreByInput from "../components/StoreByInput";

const Locator = () => {
  const [location, setLocation] = useState("");
  const [showStore, setShowStore] = useState(false);
  const [storeDetails, setStoreDetails] = useState("Estoy buscando...");
  const [error, setError] = useState(false);
  const URL = "https://apiv4.ordering.co/v400/es/farmazone/business/";
  const params = {
    params: {
      params: "id,name,slug,address,location",
      location,
      type: 1,
    },
  };
  const requestDetails = () => {
    axios
      .get(URL, params)
      .then((res) => setStoreDetails(res.data.result))
      .catch((err) => setError(true));
  };

  const findStore = () => {
    requestDetails();
    setShowStore(true);
  };

  const handleChange = (ev) => {
    setShowStore(false);
    setLocation(ev.target.value);
  };

  return (
    <div>
      <input type="text" value={location} onChange={handleChange} />
      <button onClick={findStore}>Buscar tienda más cercana</button>
      <br />
      <button onClick={() => setLocation("")}>Borrar</button>
      <br />
      <Link href="/">Inicio</Link>
      <div>
        {showStore ? (
          <StoreByInput storeDetails={storeDetails} error={error} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Locator;
