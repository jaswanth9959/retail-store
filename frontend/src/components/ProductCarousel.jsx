import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className='className="d-block mx-auto my-auto"'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img
              width={700}
              height={700}
              className="d-block"
              src={product.image}
              alt={product.name}
              style={{ margin: "auto" }} // Center the image horizontally
            />
            {/* <Image
              src={product.image}
              alt={product.name}
              fluid
              className="mx-8 justify-content-md-center"
            /> */}
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
