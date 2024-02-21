import { Carousel, Image } from "react-bootstrap"
import { useGetTopProductsQuery } from "../features/productSlice/productApiSlice"
import Loader from "./Loader"
import Message from "./Message"
import { Link } from "react-router-dom"

function ProductCarousel() {

    const {data:products, isLoading, error} = useGetTopProductsQuery()
  return isLoading ? "" : error ? <Message variant='danger'>Error fetching top rated products</Message> : (
    <Carousel pause = "hover" className="bg-primary mb-4">
        {products?.map((product) => (
            <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                    <h2>{product.name} ({product.price})</h2>
                </Carousel.Caption>

            </Link>
            
            </Carousel.Item>
        ))}

    </Carousel>
  )

}

export default ProductCarousel
