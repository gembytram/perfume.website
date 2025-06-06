"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface CartItem {
  product_id: string;
  product_name: string;
  product_img: string;
  quantity: number;
  price: number;
}

export default function CustomerHeaderCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Hàm load giỏ hàng từ localStorage
    const loadCart = () => {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    // Load lần đầu
    loadCart();

    // Nghe sự kiện "storage" từ tab khác hoặc sau khi thêm sản phẩm
    window.addEventListener("storage", loadCart);

    // Nghe sự kiện custom từ app sau khi thêm sản phẩm
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const latestItems = cartItems.slice(-3).reverse(); // 3 sản phẩm mới nhất

  return (
    <div className="relative group">
      <a
        href="/cart"
        className="relative flex text-pri-1 dark:text-white hover:text-pri-3 dark:hover:text-teal-300 items-center"
        data-cy="cart-button">
        <div className="relative flex">
          <ShoppingBag />
          {totalQuantity > 0 && (
            <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </div>
        <span className="ml-2 font-semibold tablet:block laptop:block desktop:block">
          Giỏ hàng
        </span>
      </a>

      {/* Dropdown hiển thị sản phẩm */}
      <div className="absolute right-0 mt-4 w-96 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
        <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

        <div className="py-4">
          <h3 className="font-medium text-gray-400 dark:text-white px-4 pb-2">
            Sản phẩm mới thêm
          </h3>
          {latestItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Chưa có sản phẩm nào
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {latestItems.map((item) => (
                <li
                  key={item.product_id}
                  className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <Image
                    src={item.product_img || "/imgs/test.jpg"}
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
                      ₫{item.price.toLocaleString("vi-VN")}{" "}
                      <span className="text-gray-500">x{item.quantity}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex justify-end px-4">
            <a
              href="/cart"
              className="text-sm text-white bg-pri-1 dark:bg-teal-700 px-4 py-2 rounded-md hover:bg-pri-3 dark:hover:bg-teal-500">
              Xem Giỏ Hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
