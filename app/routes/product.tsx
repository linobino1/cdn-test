import { data, Link, type HeadersArgs } from "react-router";
import type { Route } from "./+types/product";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  const product = await res.json();
  console.log(`Product ${product.id} loaded`);

  return data(
    {
      product,
      date: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    }
  );
};

export const action = async ({ request }: Route.ActionArgs) => {
  const url = `${process.env.HOSTNAME}${new URL(request.url).pathname}`;
  console.log(`Purging cache for ${url}`);
  const res = await fetch(`https://api.fastly.com/purge/${url}`, {
    method: "POST",
    headers: {
      "Fastly-Key": process.env.FASTLY_API_KEY!,
    },
  });
  console.log(`Cache purge response: ${res.status} ${res.statusText}`);
};

export function headers({ loaderHeaders }: HeadersArgs) {
  return loaderHeaders;
}

export default function Products({
  loaderData: { product, date },
}: Route.ComponentProps) {
  return (
    <div className="max-w-prose">
      <p className="mb-4 text-sm text-gray-500">Loaded at {date}</p>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mt-2 w-32 h-32 object-cover"
      />
      <p className="mt-4">{product.description}</p>
      <p className="font-bold mt-4">Price: ${product.price}</p>
      <form method="post" className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Purge Cache
        </button>
      </form>
      <Link to="/" className="text-blue-500 mt-8 block hover:underline">
        Back to Products
      </Link>
    </div>
  );
}
