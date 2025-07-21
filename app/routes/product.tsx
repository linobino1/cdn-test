import { Link } from "react-router";
import type { Route } from "./+types/product";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  const product = await res.json();
  console.log(`Product ${product.id} loaded`);

  return {
    product,
  };
};

export default function Products({
  loaderData: { product },
}: Route.ComponentProps) {
  return (
    <div className="max-w-prose">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mt-2 w-32 h-32 object-cover"
      />
      <p className="mt-4">{product.description}</p>
      <p className="font-bold mt-4">Price: ${product.price}</p>
      <Link to="/" className="text-blue-500 mt-8 block hover:underline">
        Back to Products
      </Link>
    </div>
  );
}
