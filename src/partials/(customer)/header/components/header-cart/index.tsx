"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

// Kiểu dữ liệu sản phẩm trong giỏ hàng
interface CartItem {
  product_id: string;
  product_name: string;
  product_img: string;
  quantity: number;
  price: number;
}

export default function CustomerHeaderCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    };

    loadCart(); // Load ban đầu

    // Lắng nghe sự kiện khi có sản phẩm mới được thêm
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  return (
    <div className="relative group">
      {/* Icon Giỏ Hàng */}
      <Link
        href="/cart"
        className="relative flex text-pri-1 dark:text-white hover:text-pri-3 dark:hover:text-teal-300 items-center"
        data-cy="cart-button">
        <div className="relative flex">
          <ShoppingBag />
          <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        </div>
        <span className="ml-2 font-semibold tablet:block laptop:block desktop:block">
          Giỏ hàng
        </span>
      </Link>

      {/* Dropdown giỏ hàng */}
      <div className="absolute right-0 mt-4 w-96 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
        <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

        <div className="py-4">
          <h3 className="font-medium text-gray-400 dark:text-white px-4 pb-2">
            Sản phẩm mới thêm
          </h3>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">
              Chưa có sản phẩm nào
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-72 overflow-y-auto">
              {[...cartItems].reverse().slice(0, 3).map((item) => (
                <li
                  key={item.product_id}
                  className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <Image
                    src={item.product_img}
                    alt={item.product_name}
                    width={50}
                    height={50}
                    className="rounded mr-3 object-cover w-[50px] h-[50px]"
                  />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-white font-semibold">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-red-500">
                      ₫{item.price.toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex justify-end px-4">
            <Link
              href="/cart"
              className="text-sm text-white bg-pri-1 dark:bg-teal-700 px-4 py-2 rounded-md hover:bg-pri-3 dark:hover:bg-teal-500">
              Xem Giỏ Hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
