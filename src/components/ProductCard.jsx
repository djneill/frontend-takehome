import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState("Default");
  const dispatch = useDispatch();

  // API doesn't have an inventory count. Marking every seventh object as sold out.
  const isAvailable = product.id % 7 !== 0;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("This product is sold out!");
      return;
    }
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  // Duplicate images for carousel
  const productImages = [product.image, product.image, product.image];

  const variants = ["Small", "Medium", "Large", "X-Large"];

  return (
    <div
      className={`card product-card h-100 ${!isAvailable ? "sold-out" : ""}`}
      style={{
        maxWidth: "20rem",
        margin: "1rem auto",
        border: "1px solid #e9ecef",
      }}
    >
      <div
        className="product-image-container"
        style={{ height: "300px", overflow: "hidden" }}
      >
        <Carousel
          indicators={true}
          navButtonsAlwaysVisible={false}
          cycleNavigation={true}
          animation="slide"
          duration={500}
          className="h-100"
        >
          {productImages.map((img, index) => (
            <div
              key={index}
              style={{
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img}
                alt={product.title}
                className="product-image"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  zIndex: 2,
                  position: "relative",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="card-body d-flex flex-column">
        <h5
          className="card-title"
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            minHeight: "2.5rem",
          }}
        >
          {product.title.length > 50
            ? `${product.title.substring(0, 50)}...`
            : product.title}
        </h5>

        <p
          className="card-text text-muted"
          style={{ fontSize: "0.9rem", minHeight: "3rem" }}
        >
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>

        <div className="mb-3">
          <span className="price-section h4">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <div className="rating-section text-muted mt-1">
            ⭐ {product.rating?.rate || 4.5} ({product.rating?.count || 100}{" "}
            reviews)
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Size/Variant:</label>
          <select
            className="form-select variant-select"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            aria-label="Variant select"
          >
            {variants.map((variant, index) => (
              <option value={variant} key={index}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-auto">
          <Link
            className="btn btn-add-cart w-100 text-white"
            onClick={handleAddToCart}
            disabled={!isAvailable}
            style={{
              opacity: !isAvailable ? 0.6 : 1,
              cursor: !isAvailable ? "not-allowed" : "pointer",
            }}
          >
            {isAvailable ? "🛍️ Add to Cart" : "🚫 Sold Out"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
