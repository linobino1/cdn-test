import { Link } from "react-router";
import type { Route } from "./+types/home";

export const loader = async () => {
  const res = await fetch("https://dummyjson.com/products");

  const products = (await res.json()).products || [];
  console.log(`${products.length} products loaded`);

  return {
    products,
    date: new Date().toISOString(),
  };
};

export default function Products({
  loaderData: { products, date },
}: Route.ComponentProps) {
  return (
    <div>
      <p className="mb-4 text-sm text-gray-500">Loaded at {date}</p>
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="mt-4">
        {products.map((product: any) => (
          <li key={product.id} className="list-disc list-inside">
            <Link
              to={`/product/${product.id}`}
              className="text-blue-500 hover:underline"
            >
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
