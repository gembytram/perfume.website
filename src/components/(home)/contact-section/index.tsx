"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SUBSCRIPTION_URL } from "@/utils/constants/urls";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("Vui lòng nhập email hợp lệ.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${SUBSCRIPTION_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.status === 200) {
        setMessage("✅ Đăng ký thành công! Vui lòng kiểm tra email.");
        setEmail("");
      } else if (res.status === 402) {
        setMessage(`❌ ${result.message || "Đăng ký thất bại."}`);
      }
    } catch (error) {
      setMessage("❌ Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12 w-full sm:w-[90%] md:w-[85%] lg:w-[80%]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 dark:text-pri-2 text-pri-1">
        Có câu hỏi nào không? Đừng ngần ngại liên hệ với chúng tôi!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Messages Section */}
        <div>
          <h3 className="text-lg sm:text-lg font-semibold mb-4 sm:mb-6 text-pri-1">
            Địa chỉ
          </h3>
          <p className="text-base sm:text-base text-muted-foreground mb-6 sm:mb-8 dark:text-gray-300">
            Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
          </p>
        </div>

        {/* Call us Section */}
        <div className="w-full mx-auto flex flex-col">
          <h3 className="text-lg sm:text-lg font-semibold mb-4 text-pri-1">
            Gọi cho chúng tôi
          </h3>
          <div className="space-y-2 mb-6 sm:mb-8">
            {["0868-589-371", "0345-421-574"].map((phone) => (
              <div key={phone} className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-neutral-950" />
                <Link
                  href={`tel:${phone}`}
                  className="block text-base sm:text-base text-muted-foreground hover:text-foreground dark:text-gray-300">
                  {phone}
                </Link>
              </div>
            ))}
          </div>
          {/* Subscribe Section */}
          <div>
            <h3 className="text-lg sm:text-lg font-semibold mb-2 sm:mb-4 text-pri-1">
              Đăng ký nhận thông tin qua Email
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ Email của bạn"
                className="flex-1 w-full dark:text-gray-300 dark:bg-black"
              />
              <Button
                variant="filled"
                className="w-full sm:w-auto whitespace-nowrap"
                disabled={loading}
                onClick={handleSubscribe}>
                {loading ? "Đang gửi..." : "Đăng ký ngay"}{" "}
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-lg font-semibold mb-4 text-pri-1">
            Kết nối với chúng tôi trên mạng xã hội
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 dark:text-gray-300">
            Chúng tôi luôn sẵn sàng trả lời mọi thắc mắc trong vòng 5 phút và tổ
            chức các cuộc thi thú vị với những phần quà hấp dẫn mỗi tháng!
          </p>
          <div className="flex gap-4">
            {[
              {
                icon: "fb_icon",
                url: "https://www.facebook.com/profile.php?id=61572381697756",
              },
              {
                icon: "instagam_icon",
                url: "https://www.instagram.com/_fleurs.boutique_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
              },
              {
                icon: "tiktok_icon",
                url: "https://www.tiktok.com/@fleursbouti?_t=ZS-8vjtftZXrc4&_r=1",
              },
              {
                icon: "shoppee_icon",
                url: "http://shopee.vn/nuochoafleurs",
              },
            ].map(({ icon, url }) => (
              <Link
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80">
                <Image
                  src={`/imgs/home/${icon}.svg`}
                  alt={icon.split("_")[0]}
                  width={60}
                  height={60}
                  className="rounded-xl w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
