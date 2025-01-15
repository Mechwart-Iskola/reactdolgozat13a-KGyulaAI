import { useEffect, useState } from "react"

type Product = {
    id: number,
    name: string,
    price: number,
    category: string,
    image: string
}

const ProductCard = () => {
    const [search, setSearch] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const res = await fetch("/products.json");
                const data = await res.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Hiba:", error);
            }
        };
        fetchProductData();
    }, []);

    const handleSearch = () => {
        const foundproduct = products.find((name) =>
            name.name.toLowerCase().includes(search.toLowerCase())
        );
        if (foundproduct) {
            setProduct(foundproduct);
        }
    };

    return (
        <div className="product-card">
            <div className="search-section">
                <label>Enter Product Name:</label>
                <input type="text" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="results-section product-info">
                <img className="product-image" src={product?.image} alt="kép" />
                <div className="product-details">
                    <p>{product?.id}</p>
                    <p>{product?.name}</p>
                    <p>{product?.price}</p>
                    <p>{product?.category}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard