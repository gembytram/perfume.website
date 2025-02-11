"use client";

// import libs
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ChevronRight, Ticket } from "lucide-react";
import { useSession } from "next-auth/react";

// import components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";
import { PRODUCT_ORDER_URL, USER_URL } from "@/utils/constants/urls";
import { SHIPPING_COST } from "@/utils/constants/variables";

// import types
import { IOrderProduct } from "@/types/interfaces";
import { Address } from "@/types/address";

const demoCoupons = [
  {
    id: 1,
    title: "Khuyến mãi ngày 11/1",
    description: "Siêu ưu đãi, mua ngay giá cực hời.",
    discount: "20%",
    maxDiscount: "200.000đ",
    type: "Giảm giá đơn hàng",
    image: "/imgs/test.jpg",
  },
  {
    id: 2,
    title: "Miễn phí vận chuyển",
    description: "Miễn trừ tất cả các chi phí khi vận chuyển hàng.",
    discount: "20K",
    maxDiscount: "20.000đ",
    type: "Miễn phí vận chuyển",
    image: "/imgs/test.jpg",
  },
];

export default function OrderInformationPage() {
  const { data: session } = useSession(); // Lấy thông tin session

  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [productInfo, setProductInfo] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [orderNote, setOrderNote] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([]);

  const shippingFee = SHIPPING_COST; // Fixed shipping fee
  const couponDiscount = 0; // Example coupon discount
  const freeShippingDiscount = 0; // Example free shipping discount

  useEffect(() => {
    // Fetch administrative data
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => setCities(response.data))
      .catch((error) =>
        console.error("Error fetching administrative data:", error)
      );
  }, []);

  const handleCityChange = (value: string) => {
    const selected = cities.find((city) => city.Id === value);
    console.log("selected", selected);
    setSelectedCity(selected?.Name || "");
    setDistricts(selected?.Districts || []);
    setWards([]);
  };

  const handleDistrictChange = (value: string) => {
    const selected = districts.find((district) => district.Id === value);
    setSelectedDistrict(selected?.Name || "");
    setWards(selected?.Wards || []);
  };

  const handleWardChange = (value: string) => {
    const selected = wards.find((ward) => ward.Id === value);
    setSelectedWard(selected?.Name || "");
  };

  const validateInputs = () => {
    if (!userName.trim()) {
      alert("Vui lòng nhập họ và tên.");
      return false;
    }

    if (!userPhone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(userPhone.trim())) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.");
      return false;
    }

    if (
      !selectedCity ||
      !selectedDistrict ||
      !selectedWard ||
      !streetAddress.trim()
    ) {
      alert("Vui lòng điền đầy đủ địa chỉ nhận hàng.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const savedProducts = localStorage.getItem("buyNowProducts");

      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);

        try {
          const response = await fetch(PRODUCT_ORDER_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(parsedProducts),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }

          const data = await response.json();
          // console.log("dataaaaaa", data);
          // console.log("Fetched products:", data.data.products);
          setProductInfo(data.data.products); // Lưu thông tin sản phẩm để hiển thị
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    const fetchAddresses = async () => {
      if (!session?.user?.accessToken) return;
      try {
        const response = await fetch(
          `${USER_URL}/${session?.user?.id}/addresses`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setAddresses(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchProductInfo();
    fetchAddresses();
  }, []);

  const calculateOriginalPrice = () => {
    if (!productInfo || productInfo.length === 0) return 0;

    return productInfo.reduce(
      (total: any, product: any) =>
        total + product.product_variant.variant_price * product.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    if (!productInfo || productInfo.length === 0) return 0;

    return productInfo.reduce(
      (total: any, product: any) =>
        total +
        (product.product_variant.variant_price *
          product.quantity *
          product.product_variant.variant_discount_percent) /
          100,
      0
    );
  };

  const calculateTotalPrice = () => {
    if (!productInfo || productInfo.length === 0) return 0;

    const originalPrice = calculateOriginalPrice();
    const discount = calculateDiscount();

    return (
      originalPrice -
      discount +
      shippingFee -
      couponDiscount -
      freeShippingDiscount
    );
  };

  const handleOrder = async (): Promise<void> => {
    if (!validateInputs()) return; // Validate user inputs

    try {
      if (!productInfo || productInfo.length === 0) {
        alert("Không có sản phẩm nào để đặt hàng!");
        return;
      }

      // Generate a unique order ID
      const orderId = `DH${Date.now()}${
        session
          ? `.${session.user.id}`
          : `.guest${userPhone}_${Math.round(Math.random() * 1000)}`
      }`;

      // Prepare order products data
      const orderProducts = productInfo.map((product: any) => ({
        product_hashed_id: product.product_hashed_id,
        variant_id: product.product_variant._id,
        quantity: product.quantity,
        unit_price: product.product_variant.variant_price,
        discount_percent: product.product_variant.variant_discount_percent,
      }));

      // Define payment data structure
      const newPaymentData = {
        order_id: orderId,
        user_id: session ? session.user.id : undefined,
        order_products: orderProducts,
        order_buyer: {
          name: userName,
          phone_number: userPhone,
          address: {
            province: selectedCity,
            district: selectedDistrict,
            ward: selectedWard,
            street: streetAddress,
          },
        },
        order_note: orderNote || "",
        shipping_cost: shippingFee,
        payment_method: "onl",
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-history?selectedTab=unpaid`, // Cancel URL
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-success?orderId=${encodeURIComponent(orderId)}`, // Success redirect
      };

      // Save payment data to local storage
      localStorage.setItem("paymentData", JSON.stringify(newPaymentData));
      // console.log("dataaaaaaaaa neeeeee", newPaymentData);

      // Redirect to the payment page
      window.location.href = "/payment";
    } catch (error) {
      console.error("Error processing the order:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Thông tin người nhận hàng */}
      <section className="lg:col-span-3 rounded-lg p-6 shadow-md dark:bg-gray-800">
        <h3 className="font-bold mb-2 text-center">
          Thông tin người nhận hàng
        </h3>
        <hr className="mb-4 dark:border-white" />
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Họ và tên</label>
            <Input
              type="text"
              placeholder="Nhập họ và tên"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={50}
              name="userName"
              className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Số điện thoại</label>
            <Input
              type="text"
              placeholder="Nhập số điện thoại"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              maxLength={10}
              className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"
              name="userPhone"
            />
          </div>
          <div className="flex flex-col md:col-span-2 gap-2">
            <label className="text-sm font-medium">Địa chỉ</label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={cities.find((city) => city.Name === selectedCity)?.Id}
                onValueChange={handleCityChange}
                name="city">
                <SelectTrigger className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm">
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city) => (
                      <SelectItem key={city.Id} value={city.Id}>
                        {city.Name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={handleDistrictChange}
                value={
                  districts.find(
                    (district) => district.Name === selectedDistrict
                  )?.Id
                }
                disabled={!districts.length && selectedCity == ""}
                name="district">
                <SelectTrigger className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm">
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {districts.map((district) => (
                      <SelectItem key={district.Id} value={district.Id}>
                        {district.Name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={handleWardChange}
                value={wards.find((ward) => ward.Name === selectedWard)?.Id}
                disabled={!wards.length}
                name="ward">
                <SelectTrigger className="w-full border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm">
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wards.map((ward) => (
                      <SelectItem key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                name="streetAddress"
                type="text"
                placeholder="Nhập số nhà, đường..."
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                maxLength={100}
                className="w-full border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"
              />
            </div>

            <div className="w-full flex gap-2">
              {addresses.map((address, index) => (
                <button
                  key={`saved location ${index}`}
                  title={`${address.detail_address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}
                  type="button"
                  className="p-2 text-sm w-[30%] border-2 rounded-lg bg-transparent dark:bg-pri-7 border-pri-1/40 hover:bg-pri-2 hover:text-gray-600 dark:border-pri-7 dark:hover:text-black"
                  onClick={() => {
                    handleCityChange(
                      cities.find((city) => city.Name === address.province.name)
                        ?.Id
                    );
                    handleDistrictChange(
                      districts.find(
                        (district) => district.Name == address.district.name
                      )?.Id
                    );
                    handleWardChange(
                      wards.find((ward) => ward.Name == address.ward.name)?.Id
                    );
                    setStreetAddress(address.detail_address);
                  }}>
                  <span className="line-clamp-1">{`${address.detail_address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col md:col-span-2 gap-2">
              <label className="text-sm font-medium">Ghi chú</label>
              <Textarea
                name="orderNote"
                placeholder="Nhập ghi chú cho đơn hàng..."
                maxLength={100}
                rows={5}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"></Textarea>
            </div>
          </div>
        </form>

        {/* Mã giảm giá */}
        <div className="mt-6">
          <h3 className="font-bold mb-2 text-center">Phiếu giảm giá</h3>
          <hr className="mb-4 dark:border-white" />
          {["Giảm giá đơn hàng", "Miễn phí vận chuyển"].map((type) => (
            <div key={type} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{type}</h3>
              <div className="flex items-center border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-lg px-3 py-2 mb-3 gap-2">
                <Ticket className="text-gray-600 dark:text-white" />
                <span className="text-sm text-gray-600 dark:text-white">
                  Chọn mã giảm giá
                </span>
                <ChevronRight className="ml-auto text-gray-500 text-sm dark:text-white" />
              </div>
              {demoCoupons
                .filter((coupon) => coupon.type === type)
                .map((coupon) => (
                  <div
                    key={coupon.id}
                    className="flex items-stretch border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="w-24 flex-shrink-0">
                      <img
                        src={coupon.image}
                        alt="coupon"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Content Section */}
                    <div className="flex flex-col flex-grow p-4">
                      <h4 className="font-bold text-base text-gray-800 dark:text-white">
                        {coupon.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {coupon.description}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-300">
                        Tối đa: {coupon.maxDiscount}
                      </p>
                    </div>
                    {/* Discount Section */}
                    <div className="bg-orange-500 text-white px-4 flex items-center justify-center text-lg font-bold">
                      {coupon.discount}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </section>

      {/* Sản phẩm đặt mua */}
      <section className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md h-fit dark:bg-gray-800">
        <h3 className="font-bold mb-2 text-center">Sản phẩm đặt mua</h3>
        <hr className="mb-4 dark:border-white" />
        {productInfo ? (
          productInfo.map((product: IOrderProduct, index: number) => (
            <div
              key={index}
              className="flex items-center bg-pri-3 p-2 rounded-md dark:bg-pri-6">
              <div className="w-24 h-24 overflow-hidden rounded-md">
                <Image
                  src={product.product_variant.variant_img}
                  alt={product.product_variant.variant_name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-bold text-sm dark:text-white line-clamp-2 mr-6">
                  {product.product_name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-white">
                  Phân loại hàng: {product.product_variant.variant_name}
                </p>
                <div className="flex gap-2 mt-1">
                  {product.product_variant.variant_discount_percent > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      {convertNumberToVND(
                        product.product_variant.variant_price
                      )}
                    </span>
                  )}
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                    {convertNumberToVND(
                      product.product_variant.variant_price *
                        (1 -
                          product.product_variant.variant_discount_percent /
                            100)
                    )}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-white">
                x{product.quantity}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có sản phẩm nào được đặt.</p>
        )}

        <div className="border-t mt-6 pt-4 text-sm">
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Giá gốc</span>
              <span>{convertNumberToVND(calculateOriginalPrice())}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Giảm giá</span>
              <span>-{convertNumberToVND(calculateDiscount())}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Phí vận chuyển
              </span>
              <span>{convertNumberToVND(shippingFee)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Mã giảm giá
              </span>
              <span>-{convertNumberToVND(couponDiscount)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Miễn phí vận chuyển
              </span>
              <span>-{convertNumberToVND(freeShippingDiscount)}</span>
            </p>
          </div>
          <div className="flex justify-between items-center mt-4 border-t pt-4 dark:border-white">
            <span className="text-lg font-semibold">Tổng tiền</span>
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
              {convertNumberToVND(calculateTotalPrice())}
            </span>
          </div>
          <Button
            className="mt-4 w-full py-3 font-bold"
            data-cy="order-button"
            onClick={handleOrder}
            variant="filled">
            Đặt hàng
          </Button>
          <p className="mt-2 text-xs text-gray-500 text-center dark:text-white">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
            <Link
              href="/delivery-and-payment"
              className="text-teal-500 hover:underline dark:text-teal-300">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link
              href="/privacy-policy"
              className="text-teal-500 hover:underline dark:text-teal-300">
              Chính sách bảo mật
            </Link>{" "}
            của CatCorner.
          </p>
        </div>
      </section>
    </div>
  );
}
