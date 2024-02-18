import { Form, Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../features/productSlice/productApiSlice";
import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

import { toast } from "react-toastify";

function ProductEditPage() {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,

    error,
  } = useGetProductsDetailQuery(productId ?? "");
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId ?? "",
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      user: product?.user ?? "",
      rating: 0,
      numReviews: 0,
      reviews: [],
      __v: 0,
      createdAt: "",
      updatedAt: "",
    };
    try {
      await updateProduct(updatedProduct).unwrap();
      navigate("/admin/productlist");
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Failed to update the product", error);
      toast.error("Failed to update the product");
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    try {
      const result = await uploadProductImage(formData).unwrap();
      toast.success(result.message);
      console.log(result.image, "result");

      setImage(result.image);
    } catch (error) {
      console.error("Failed to upload the image", error);
      toast.error("Failed to upload the image");
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/productlist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {"internal server error"}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-2">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="price" className="my-2">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </FormGroup>
            <FormGroup className="my-2">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <FormControl
                type="file"
                id="image-file"
                onChange={uploadFileHandler}
              />
             
            </FormGroup>
            <FormGroup controlId="brand" className="my-2">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="category" className="my-2">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="countInStock" className="my-2">
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
            </FormGroup>
            <FormGroup controlId="description" className="my-2">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditPage;
