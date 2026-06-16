import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.css";
import toast from "react-hot-toast";
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
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("nexoraToken");

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const getUserName = (user) => {
    if (!user) return "Utilisateur inconnu";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  const getUserInitials = (user) => {
    const firstInitial = (user?.firstName || "").charAt(0).toUpperCase();
    const lastInitial = (user?.lastName || "").charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}` || "?";
  };

  const getOrderUser = (order) => {
    return users.find((user) => user.id === order.user_id);
  };

  const formatDate = (date) => {
    if (!date) return "Date inconnue";
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const loadProducts = () => {
    axios
      .get("https://nexora-1e3z.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  const loadOrders = () => {
    axios
      .get("https://nexora-1e3z.onrender.com/orders/admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => setOrders(response.data))
      .catch((error) => console.error(error));
  };

  const loadUsers = () => {
    axios
      .get("https://nexora-1e3z.onrender.com/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
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

  const closeModal = () => {
    resetProductForm();
    setShowModal(false);
  };

  const openAddModal = () => {
    resetProductForm();
    setShowModal(true);
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `https://nexora-1e3z.onrender.com/products/${editingId}`,
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
          "https://nexora-1e3z.onrender.com/products",
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

      closeModal();
      loadProducts();
    } catch (error) {
      console.error(error);
    }
    const updateOrderStatus = async (id, status) => {
  try {

    await axios.patch(
      `https://nexora-1e3z.onrender.com/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    loadOrders();

    toast.success(
      "Statut mis à jour avec succès"
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Erreur lors de la mise à jour"
    );

  }
};
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category);
    setDescription(product.description || "");
    setPrice(product.price);
    setImage(product.image);
    setStock(product.stock);
    setShowModal(true);
  };

const deleteProduct = async (id) => {
  try {

    await axios.delete(
      `https://nexora-1e3z.onrender.com/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success(
      "Produit supprimé avec succès"
    );

    loadProducts();

  } catch (error) {

    console.error(error);

    toast.error(
      "Impossible de supprimer ce produit"
    );

  }
};

const updateOrderStatus = async (id, status) => {
  try {

    await axios.patch(
      `https://nexora-1e3z.onrender.com/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    loadOrders();

    toast.success(
      "Statut mis à jour avec succès"
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Erreur lors de la mise à jour"
    );

  }
};
  const logout = () => {
    localStorage.removeItem("nexoraToken");
    window.location.href = "/login";
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

          <small>Fashion • Streetwear • Lifestyle</small>
        </div>

        <nav className="admin-nav">
          <a href="#overview">Vue d'ensemble</a>
          <a href="#users">Utilisateurs</a>
          <a href="#products">Produits</a>
          <a href="#orders">Commandes</a>
        </nav>

        <button
          className="admin-logout-btn"
          onClick={logout}
        >
          Déconnexion
        </button>
      </aside>

      <section className="admin-content">
        <header className="admin-header" id="overview">
          <div>
            <p className="admin-subtitle">
              Dashboard administrateur
            </p>

            <h1>Bienvenue dans Nexora Admin</h1>
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

        <section className="admin-card" id="users">
          <div className="admin-card-header">
            <h2>Utilisateurs</h2>
            <span>{users.length} compte(s)</span>
          </div>

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

          <div className="admin-mobile-list">
            {users.map((user) => (
              <article
                className="admin-mobile-item"
                key={user.id}
              >
                <div className="admin-mobile-avatar">
                  {getUserInitials(user)}
                </div>

                <div className="admin-mobile-info">
                  <h3>{getUserName(user)}</h3>
                  <p>{user.email}</p>
                  <small>ID : {user.id}</small>
                </div>

                <span className="admin-badge">
                  {user.role}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-card" id="products">
          <div className="admin-card-header">
            <h2>Produits</h2>

            <button
              className="admin-add-btn"
              onClick={openAddModal}
            >
              + Ajouter un produit
            </button>
          </div>

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
                    <td>{Number(product.price).toFixed(2)}€</td>
                    <td>{product.stock}</td>

                    <td>
                      <div className="admin-actions">
                        <button
                          type="button"
                          onClick={() => editProduct(product)}
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-mobile-list">
            {products.map((product) => (
              <article
                className="admin-mobile-item admin-mobile-product"
                key={product.id}
              >
                <img
                  className="admin-mobile-product-image"
                  src={product.image}
                  alt={product.title}
                />

                <div className="admin-mobile-info">
                  <h3>{product.title}</h3>
                  <p>{product.category}</p>
                  <small>
                    {Number(product.price).toFixed(2)}€ • Stock : {product.stock}
                  </small>
                </div>

                <div className="admin-mobile-actions">
                  <button
                    type="button"
                    onClick={() => editProduct(product)}
                  >
                    ✎
                  </button>

                  <button
                    type="button"
                    className="admin-mobile-delete"
                    onClick={() => deleteProduct(product.id)}
                  >
                    🗑
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-card" id="orders">
          <div className="admin-card-header">
            <h2>Commandes</h2>
            <span>{orders.length} commande(s)</span>
          </div>

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
                  const orderUser = getOrderUser(order);

                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{getUserName(orderUser)}</td>
                      <td>{Number(order.total).toFixed(2)}€</td>
                      <td>
                        <select
                          className={`admin-status-select status-${order.status}`}
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="preparing">Preparing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                            </td>
                      <td>{formatDate(order.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="admin-mobile-list">
            {orders.map((order) => {
              const orderUser = getOrderUser(order);

              return (
                <article
                  className="admin-mobile-item"
                  key={order.id}
                >
                  <div className="admin-mobile-avatar">
                    🛒
                  </div>

                  <div className="admin-mobile-info">
                    <h3>Commande #{order.id}</h3>
                    <p>{getUserName(orderUser)}</p>
                    <small>{formatDate(order.created_at)}</small>
                  </div>

                  <div className="admin-mobile-order-total">
                    <span className="admin-status">
                    <select
                      className={`admin-status-select status-${order.status}`}
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="preparing">Preparing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    </span>
                    <strong>
                      {Number(order.total).toFixed(2)}€
                    </strong>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <p>Gestion produit</p>
                <h2>
                  {editingId
                    ? "Modifier un produit"
                    : "Ajouter un produit"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <form
              className="admin-modal-form"
              onSubmit={saveProduct}
            >
              <div className="admin-modal-preview">
                {image ? (
                  <img
                    src={image}
                    alt={title || "Prévisualisation produit"}
                  />
                ) : (
                  <span>Aperçu image</span>
                )}
              </div>

              <div className="admin-modal-fields">
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
                  type="file"
                  accept="image/*"
                  className="admin-file-input"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-modal-cancel"
                  onClick={closeModal}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="admin-modal-save"
                >
                  {editingId
                    ? "Sauvegarder"
                    : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Admin;