import { ThumbsUp, AmbulanceIcon as FirstAid, Sprout } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ThumbsUp,
      title: "Chất lượng và an toàn",
      description:
        "Fleurs cam kết sử dụng nguyên liệu an toàn, quy trình sản xuất nghiêm ngặt, mang đến nước hoa chất lượng tốt nhất.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-400",
    },
    {
      icon: FirstAid,
      title: "Hương thơm tinh tế và độc đáo",
      description:
        "Chúng tôi tạo ra những mùi hương mang dấu ấn riêng, kết hợp hài hòa giữa tinh dầu thiên nhiên và công nghệ hiện đại.",
      iconColor: "text-red-400",
      bgColor: "bg-red-50",
    },
    {
      icon: Sprout,
      title: "Bao bì tối giãn và bền vững",
      description:
        "Thiết kế hiện đại, thân thiện với môi trường, giảm thiểu lãng phí nhưng vẫn đảm bảo sự tinh tế khi đến tay bạn.",
      bgColor: "bg-green-50",
      iconColor: "text-green-400",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-bg-dark-1">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-pri-1 mb-16 dark:text-pri-2">
          Điểm nổi bật của Fleurs
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-full ${feature.bgColor} flex items-center justify-center mb-6`}>
                <feature.icon
                  className={`w-10 h-10 ${feature.iconColor}`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-bold mb-4 dark:text-gray-300 text-pri-1">
                {feature.title}
              </h3>
              <p className="text-black dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
