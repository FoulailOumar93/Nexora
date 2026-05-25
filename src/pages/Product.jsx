import { useParams } from "react-router-dom";

function Product() {

  const { id } = useParams();

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#0d0d0d",
        color:"white",
        padding:"100px 10%"
      }}
    >

      <h1>
        Produit #{id}
      </h1>

      <p>
        Future page produit premium 😭🔥
      </p>

    </div>

  );
}

export default Product;