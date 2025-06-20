import Link from "next/link";
import React from "react";

export default function CustomerHeaderNavigation() {
  return (
    <>
      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <Link
          href="/blogs"
          className="phone:hidden laptop:block text-pri-1 dark:text-white hover:text-pri-3 dark:hover:text-teal-300 font-semibold laptop:text-base desktop:text-base tablet:text-sm">
          Bài viết
        </Link>

        <Link
          href="/coupons"
          className="phone:hidden desktop:block text-pri-1 dark:text-white hover:text-pri-3 dark:hover:text-teal-300 font-semibold tablet:hidden">
          Phiếu giảm giá
        </Link>
      </nav>
    </>
  );
}
