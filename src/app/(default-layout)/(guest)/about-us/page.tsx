export default function AboutUsPage() {
  return (
    <div className="container mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg">
      {/* Header */}
      <div className="text-justify">
        <h1 className="text-4xl font-bold text-center">Fleurs Perfume</h1>
        <hr className="my-4 w-2/6 mx-auto" />
        <p className="text-xl">  Fleurs tự hào là một trong những thương hiệu nước hoa uy tín và
        được yêu thích nhất tại TP.HCM, nơi thỏa mãn niềm đam mê hương thơm của hàng triệu tín đồ từ Nam ra Bắc. </p>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
          <img
            src="/imgs/test.jpg"
            alt="Chất lượng"
            className="mx-auto mb-4 w-12 h-12"
          />
          <p className="font-bold text-lg">Hương thơm đa dạng</p>
          <p className="text-gray-600 dark:text-gray-400 text-justify">
          Fleurs sở hữu những dòng nước hoa với nhiều tầng hương phong phú, từ thanh mát, dịu dàng đến nồng nàn, quyến rũ, đáp ứng mọi phong cách và sở thích của bạn
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
          <img
            src="/imgs/test.jpg"
            alt="Chăm sóc khách hàng"
            className="mx-auto mb-4 w-12 h-12"
          />
          <p className="font-bold text-lg">Ưu đãi đặc biệt</p>
          <p className="text-gray-600 dark:text-gray-400 text-justify">
          Khi mua sắm tại Fleurs và tích lũy đủ điểm, bạn sẽ có cơ hội nhận được những phần quà giá trị tương xứng, thay lời tri ân từ chúng tôi.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
          <img
            src="/imgs/test.jpg"
            alt="Vận chuyển miễn phí"
            className="mx-auto mb-4 w-12 h-12"
          />
          <p className="font-bold text-lg">Dịch vụ giao hàng tận tâm</p>
          <p className="text-gray-600 dark:text-gray-400 text-justify">
          Fleurs miễn phí vận chuyển nội thành TP. Hồ Chí Minh cho các đơn hàng từ 999.000đ, giúp bạn dễ dàng sở hữu những chai nước hoa yêu thích.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="my-12">
        <h2 className="text-center font-medium">
          Fleurs - Chúng tôi là ai?
        </h2>
        <hr className="my-4 w-2/6 mx-auto" />
        <p className="text-justify text-lg">
          Fleurs là điểm đến lý tưởng cho những người yêu nước hoa, nơi mang đến một thế giới rộng lớn của các hương thơm độc đáo và tinh tế. 
          Với mục tiêu khơi gợi cảm xúc và tôn vinh cá tính của mỗi người, chúng tôi tự hào là điểm đến đáng tin cậy để khám phá những mùi hương từ cổ điển đến hiện đại, từ dịu dàng đến quyến rũ.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/about-us/test.png"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[600px] object-cover"
          />
        </div>
        <p className="text-justify font-light text-lg">
        Chúng tôi hiểu rõ rằng mỗi chai nước hoa là một thế giới hương thơm độc đáo với sở thích và cá tính riêng biệt. 
        Đó là lý do tại Fleurs, chúng tôi không chỉ mang đến những mùi hương quen thuộc mà còn kiến tạo nên những trải nghiệm khứu giác đa dạng, phong phú để bạn có thể tìm thấy hương thơm định danh cho chính mình. 
        Từ những nốt hương tinh tế khơi gợi cảm xúc đến những tầng hương phức tạp thể hiện cá tính, chúng tôi cam kết mang đến hành trình khám phá hương thơm đáng nhớ cho bạn
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/about-us/test2.png"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[530px] object-cover"
          />
        </div>
        <p className="text-justify font-light text-lg">
        Chúng tôi luôn cập nhật xu hướng mới nhất trong cộng đồng yêu 1  nước hoa để đảm bảo bạn luôn có những mùi hương mới nhất và phù hợp nhất với phong cách của bạn. Nếu bạn đang tìm kiếm một nơi đáng tin cậy để khám phá các mùi hương cho bản thân, hãy ghé thăm Fleurs. Chúng tôi cam kết sẽ mang đến cho bạn trải nghiệm mua sắm tốt nhất, đồng thời giúp bạn có một cuộc sống thơm ngát và hạnh phúc hơn.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/about-us/test3.png"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[1140px] object-cover"
          />
        </div>
        <p className="text-justify font-light text-lg">
        Thế mạnh của chúng tôi là sự đa dạng và sáng tạo trong việc cung cấp các dòng nước hoa và dịch vụ trải nghiệm hương thơm. Chúng tôi tự hào về việc có một đội ngũ chuyên gia về hương thơm chuyên nghiệp và đam mê, luôn sẵn lòng tư vấn và hỗ trợ khách hàng trong mọi vấn đề liên quan đến việc lựa chọn và sử dụng nước hoa. Không chỉ là một cửa hàng bán lẻ nước hoa thông thường, chúng tôi còn là một trung tâm nơi mọi người có thể tìm kiếm thông tin và kiến thức về thế giới mùi hương. Ngoài ra, chúng tôi luôn đặt mức giá cạnh tranh và cam kết về chất lượng sản phẩm, giúp khách hàng có được sự hài lòng cao nhất mỗi khi mua sắm tại Fleurs. Sự đa dạng trong sản phẩm cùng với dịch vụ chăm sóc khách hàng tận tình và chuyên nghiệp là những điểm mạnh đặc biệt của chúng tôi, giúp chúng tôi phục vụ và thu hút cộng đồng  yêu nước hoa.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/about-us/test4.png"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[1110px] object-cover"
          />
        </div>
      </div> 
    </div>
  );
}
