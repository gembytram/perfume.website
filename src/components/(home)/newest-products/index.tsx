"use client";

import { useEffect, useState } from "react";
import { PRODUCT_LIST_URL } from "@/utils/constants/urls";
import { CardProduct } from "@/components";
import type { Product, IProductProps } from "@/types/product";

const transformProduct = (product: any): IProductProps => {
  const hasMultipleVariants = product.variant_names.length > 1;

  return {
    product_id_hashed: product.product_id_hashed,
    product_slug: product.product_slug,
    product_img: product.product_img,
    product_name: product.product_name,
    category_name: product.category_name,
    product_avg_rating: product.product_avg_rating.rating_point,
    product_sold_quantity: product.product_sold_quantity,
    variant_name: hasMultipleVariants
      ? product.variant_names.map((v: any) => v || "")
      : [],
    product_price: product.product_price,
    lowest_price: product.lowest_price,
    highest_discount: product.highest_discount,
  };
};

export default function NewestProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PRODUCT_LIST_URL}/getNewestProducts`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.slice(0, 9));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-7 md:mb-8">
      {products.map((product, index) => (
        <div key={`new product ${index}`} className="flex justify-center">
          <CardProduct
            product={transformProduct(product) as any}
            className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]"
          />
        </div>
      ))}
    </div>
  );
}
