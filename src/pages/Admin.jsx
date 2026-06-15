import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("nexoraToken");

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  const loadProducts = () => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadOrders = () => {
    axios
      .get("http://localhost:3000/orders/admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadUsers();
    loadProducts();
    loadOrders();
  }, []);

  const resetProductForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setPrice("");
    setImage("");
    setStock("");
    setEditingId(null);
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/products/${editingId}`,
          {
            title,
            category,
            description,
            price,
            image,
            stock
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        await axios.post(
          "http://localhost:3000/products",
          {
            title,
            category,
            description,
            price,
            image,
            stock
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      resetProductForm();
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category);
    setDescription(product.description || "");
    setPrice(product.price);
    setImage(product.image);
    setStock(product.stock);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img
            src="/logo.png"
            alt="Nexora"
            className="admin-logo-image"
          />

          <span>Nexora</span>

          <small>
            Fashion • Streetwear • Lifestyle
          </small>
        </div>

        <nav className="admin-nav">
          <a href="#overview">Vue d'ensemble</a>
          <a href="#users">Utilisateurs</a>
          <a href="#products">Produits</a>
          <a href="#orders">Commandes</a>
          <a href="#add-product">Ajouter produit</a>
        </nav>
      </aside>

      <section className="admin-content">
        <header className="admin-header" id="overview">
          <div>
            <p className="admin-subtitle">
              Dashboard administrateur
            </p>

            <h1>
              Bienvenue dans Nexora Admin
            </h1>
          </div>
        </header>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>👥</span>
            <p>Utilisateurs</p>
            <h2>{users.length}</h2>
          </div>

          <div className="admin-stat-card">
            <span>📦</span>
            <p>Produits</p>
            <h2>{products.length}</h2>
          </div>

          <div className="admin-stat-card">
            <span>🛍️</span>
            <p>Commandes</p>
            <h2>{orders.length}</h2>
          </div>

          <div className="admin-stat-card">
            <span>💰</span>
            <p>Revenus</p>
            <h2>{totalRevenue.toFixed(2)}€</h2>
          </div>
        </section>

        <section className="admin-card" id="add-product">
          <h2>
            {editingId
              ? "Modifier un produit"
              : "Ajouter un produit"}
          </h2>

          <form
            className="admin-form"
            onSubmit={saveProduct}
          >
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="text"
              placeholder="URL image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <button type="submit">
              {editingId
                ? "Mettre à jour le produit"
                : "Ajouter le produit"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetProductForm}
              >
                Annuler la modification
              </button>
            )}
          </form>
        </section>

        <section className="admin-card" id="users">
          <h2>Utilisateurs</h2>

          <div className="admin-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="admin-badge">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-card" id="products">
          <h2>Produits</h2>

          <div className="admin-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        className="admin-product-image"
                        src={product.image}
                        alt={product.title}
                      />
                    </td>

                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>{product.price}€</td>
                    <td>{product.stock}</td>

                    <td>
                      <button
                        type="button"
                        onClick={() => editProduct(product)}
                      >
                        Modifier
                      </button>

                      <button
                        className="admin-delete-btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-card" id="orders">
          <h2>Commandes</h2>

          <div className="admin-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const orderUser =
                    users.find(
                      (user) =>
                        user.id === order.user_id
                    );

                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>

                      <td>
                        {orderUser
                          ? `${orderUser.firstName} ${orderUser.lastName}`
                          : "Utilisateur inconnu"}
                      </td>

                      <td>
                        {Number(order.total).toFixed(2)}€
                      </td>

                      <td>
                        <span className="admin-status">
                          {order.status}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString(
                          "fr-FR"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Admin;