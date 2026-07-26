import { ServiceItem, PricePackage, BeforeAfterCase, CustomerReview, CompanyConfig, FaqItem } from '../types';

export const defaultConfig: CompanyConfig = {
  brandName: 'Dịch Vụ Dọn Nhà & Vệ Sinh Nguyễn Duy',
  ownerName: 'Nguyễn Duy',
  hotline: '0987654321',
  hotlineDisplay: '0987.654.321',
  zaloNumber: '0987654321',
  facebookUrl: 'https://facebook.com/donnhanguyenduy',
  email: 'vesinhnguyenduy@gmail.com',
  address: '128 Phạm Văn Đồng, Phường 13, Bằng Tăng, TP. Hồ Chí Minh (Hỗ trợ toàn bộ TPHCM & các tỉnh lân cận)',
  operatingHours: '06:00 - 22:00 (Tất cả các ngày trong tuần & Ngày lễ)',
  areasServed: ['Quận 1', 'Quận 3', 'Quận 7', 'Thủ Đức', 'Bình Thạnh', 'Tân Bình', 'Gò Vấp', 'Bình Tân', 'Bình Chánh', 'Đồng Nai', 'Bình Dương'],
  promoDiscountPercent: 20,
  promoTitle: 'ƯU ĐÃI ĐẶC BIỆT THÁNG NÀY: GIẢM NGAY 20% CHO KHÁCH HÀNG ĐẶT LỊCH HÔM NAY!',
  promoEndsAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
};

export const servicesList: ServiceItem[] = [
  {
    id: 'don-nha-tron-goi',
    title: 'Dọn Nhà Trọn Gói - Chuyển Nhà',
    shortDesc: 'Dịch vụ tháo dỡ, đóng gói, vận chuyển và sắp xếp toàn bộ đồ đạc nhà ở, chung cư trọn gói.',
    fullDesc: 'Đội ngũ Nguyễn Duy chịu trách nhiệm từ A-Z: phân loại, bọc lót chống trầy xước bằng màng PE, thùng carton, tháo lắp tủ/giường/máy lạnh, vận chuyển an toàn bằng xe tải chuyên dụng.',
    iconName: 'Truck',
    badge: 'Khuyên Dùng',
    startingPrice: '12.000',
    unit: 'đ/m² hoặc gói từ 800.000đ',
    popular: true,
    features: [
      'Khảo sát miễn phí tận nơi sau 15 phút',
      'Đóng gói, bọc lót chuyên nghiệp cẩn thận',
      'Có xe tải chở đồ chuyên dụng mọi tải trọng',
      'Bảo hiểm 100% giá trị đồ đạc nếu hư hỏng',
      'Sắp xếp lại đồ đạc theo yêu cầu gia chủ'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 've-sinh-cong-nghiep',
    title: 'Vệ Sinh Công Nghiệp & Sau Xây Dựng',
    shortDesc: 'Tổng vệ sinh nhà mới xây, nhà sửa chữa, công trình, nhà xưởng sạch bóng từ trần đến sàn.',
    fullDesc: 'Sử dụng máy chà sàn công nghiệp, máy hút bụi công suất lớn, hóa chất tẩy rửa chuyên dụng an toàn tuyệt đối để loại bỏ sơn, xi măng, bụi mịn cứng đầu.',
    iconName: 'Sparkles',
    badge: 'Hot Ads',
    startingPrice: '15.000',
    unit: 'đ/m²',
    popular: true,
    features: [
      'Tẩy sạch vết sơn, xi măng, keo dán công trình',
      'Máy chà sàn, hút bụi công nghiệp hiện đại',
      'Lau kính mặt trong & mặt ngoài chuyên sâu',
      'Tẩy cặn canxi nhà tắm, toilet cực sạch',
      'Nghiệm thu hài lòng mới thu tiền'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'don-nha-theo-gio',
    title: 'Dọn Nhà Theo Giờ & Vệ Sinh Định Kỳ',
    shortDesc: 'Cung cấp nhân viên dọn dẹp nhà cửa, nấu ăn, giặt giũ theo giờ linh hoạt, tin cậy.',
    fullDesc: 'Nhân viên Nguyễn Duy có nhân thân rõ ràng, được đào tạo bài bản, trung thực, mang sẵn dụng cụ vệ sinh đầy đủ.',
    iconName: 'Clock',
    badge: 'Tiết Kiệm',
    startingPrice: '60.000',
    unit: 'đ/giờ',
    popular: false,
    features: [
      'Nhân viên thân thiện, trung thực, lý lịch rõ ràng',
      'Trang bị đầy đủ dụng cụ & hóa chất cơ bản',
      'Lau dọn phòng khách, bếp, phòng ngủ, toilet',
      'Linh hoạt đặt lịch 2h - 8h/ngày',
      'Đổi nhân viên ngay nếu khách chưa vừa ý'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'giat-sofa-nem-ram',
    title: 'Giặt Sofa, Nệm, Thảm & Rèm Cửa',
    shortDesc: 'Giặt diệt khuẩn bằng công nghệ phun hút hơi nước nóng 100°C diệt 99.9% vi khuẩn, nấm mốc.',
    fullDesc: 'Làm sạch sâu vết bẩn lâu ngày, mùi hôi mồ hôi, nước tiểu trẻ em, lông thú cưng trên sofa da/vải, nệm kymdan/bông ép, thảm văn phòng.',
    iconName: 'Armchair',
    badge: 'Diệt Khuẩn 99%',
    startingPrice: '250.000',
    unit: 'đ/bộ sofa hoặc nệm',
    popular: true,
    features: [
      'Công nghệ giặt phun hút hơi nước nóng 100°C',
      'Dung dịch sinh học an toàn cho trẻ nhỏ & thú cưng',
      'Khử mùi hôi, loại bỏ mạt bụi & vi khuẩn',
      'Sấy khô siêu tốc 80% sau khi giặt xong',
      'Tặng kèm xịt thơm thảo mộc cao cấp'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 've-sinh-van-phong',
    title: 'Vệ Sinh Văn Phòng & Cửa Hàng',
    shortDesc: 'Tổng vệ sinh định kỳ hoặc theo quý cho văn phòng công ty, shop thời trang, nhà hàng, cafe.',
    fullDesc: 'Giúp không gian làm việc luôn ngăn nắp, sạch sẽ, thơm tho, tạo môi trường làm việc chuyên nghiệp cho nhân viên và thu hút khách hàng.',
    iconName: 'Building2',
    badge: 'Chuyên Nghiệp',
    startingPrice: '10.000',
    unit: 'đ/m²',
    popular: false,
    features: [
      'Làm việc ca đêm/cuối tuần không tính thêm phí',
      'Tẩy bẩn thảm văn phòng, ghế xoay làm việc',
      'Vệ sinh vách ngăn, kính, bàn ghế làm việc',
      'Xuất hóa đơn VAT cho doanh nghiệp',
      'Hợp đồng định kỳ chiết khấu cao'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lau-kinh-khu-khuan',
    title: 'Lau Kính Tòa Nhà & Khử Khuẩn',
    shortDesc: 'Lau kính mặt tiền, đu dây lau kính cao tầng, phun khử trùng diệt khuẩn toàn diện.',
    fullDesc: 'Trang thiết bị bảo hộ an toàn đạt chuẩn, chứng chỉ đu dây nhà cao tầng, bảo hiểm lao động đầy đủ.',
    iconName: 'ShieldCheck',
    badge: 'An Toàn ISO',
    startingPrice: '20.000',
    unit: 'đ/m²',
    popular: false,
    features: [
      'Đội ngũ đu dây lau kính có chứng chỉ chuyên môn',
      'Trang thiết bị giàn giáo, đu dây đạt chuẩn an toàn',
      'Hóa chất tẩy mốc kính, ố ván nano bóng bẩy',
      'Phun thuốc khử trùng Nano Bạc diệt khuẩn',
      'Bảo hành độ sáng bóng của kính'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80'
  }
];

export const pricePackages: PricePackage[] = [
  {
    id: 'pkg-gio',
    name: 'Gói Dọn Dẹp Theo Giờ',
    price: '60.000đ',
    originalPrice: '80.000đ',
    unit: '/ giờ (Tối thiểu 3 giờ)',
    description: 'Phù hợp căn hộ nhỏ, nhu cầu lau dọn duy trì nhà cửa hằng ngày hoặc hằng tuần.',
    items: [
      'Lau dọn sàn nhà, lau bụi nội thất',
      'Dọn dẹp phòng khách, bếp, toilet',
      'Giặt đồ, gấp quần áo đơn giản',
      'Rửa chén bát, thu gom rác',
      'Trang bị dụng cụ hóa chất cơ bản'
    ],
    ctaText: 'Đặt Lịch Theo Giờ'
  },
  {
    id: 'pkg-tong-ve-sinh',
    name: 'Gói Tổng Vệ Sinh Nhà Cửa',
    price: '12.000đ',
    originalPrice: '16.000đ',
    unit: '/ m² (Khảo sát báo giá chuẩn)',
    popular: true,
    description: 'Phù hợp nhà sau sửa chữa, nhà mới thuê, hoặc dịp Lễ Tết cần dọn sạch sâu toàn bộ.',
    items: [
      'Đội 3 - 5 nhân viên dọn dẹp chuyên nghiệp',
      'Sử dụng máy hút bụi công nghiệp 3000W',
      'Tẩy cặn canxi toilet, mảng bám dầu mỡ bếp',
      'Lau chùi cửa sổ, khung kính, trần nhà',
      'Nghiệm thu hài lòng mới thanh toán'
    ],
    ctaText: 'Đăng Ký Báo Giá Ngay'
  },
  {
    id: 'pkg-sofa-nem',
    name: 'Combo Giặt Sofa + Nệm + Thảm',
    price: '499.000đ',
    originalPrice: '700.000đ',
    unit: '/ Combo trọn gói tại nhà',
    description: 'Giặt hơi nước nóng 100°C diệt sạch vi khuẩn, mạt bụi cho giấc ngủ ngon gia đình.',
    items: [
      'Giặt 01 bộ sofa phòng khách',
      'Giặt 01 nệm ngủ Kymdan/Bông ép',
      'Khử trùng UV & Hơi nước nóng diệt khuẩn',
      'Tặng xịt thơm lưu hương sinh học',
      'Thao tác nhanh 60-90 phút tại nhà'
    ],
    ctaText: 'Giữ Suất Ưu Đãi 499k'
  }
];

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 'case-1',
    title: 'Vệ sinh gian bếp dính dầu mỡ cứng đầu 2 năm',
    category: 'Vệ sinh bếp',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Mảng bám dầu mỡ khoang bếp và máy hút mùi tích tụ lâu ngày được tẩy sạch bằng dung dịch sinh học an toàn.',
    timeTaken: '2.5 Giờ thi công'
  },
  {
    id: 'case-2',
    title: 'Tẩy cặn canxi & ố vàng nhà tắm biệt thự',
    category: 'Vệ sinh toilet',
    beforeImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Cạn canxi bám dày trên kính cường lực và vòi sen inox được phục hồi độ bóng như mới 100%.',
    timeTaken: '1.5 Giờ thi công'
  },
  {
    id: 'case-3',
    title: 'Giặt bộ ghế Sofa nỉ bị dính vết ố cà phê & bụi bẩn',
    category: 'Giặt Sofa',
    beforeImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    description: 'Giặt hơi nước nóng giặt sâu các tầng vải, đánh bay vết cà phê cũ và làm tươi màu vải nguyên bản.',
    timeTaken: '1 Giờ thi công'
  }
];

export const customerReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Chị Minh Thư',
    role: 'Chủ căn hộ chung cư Vinhomes Central Park',
    location: 'Bình Thạnh, TP.HCM',
    rating: 5,
    comment: 'Tôi gọi Nguyễn Duy dọn nhà mới nhận bàn giao sau sửa chữa. Đội ngũ đến rất đúng giờ, mang đầy đủ máy hút bụi công nghiệp. Mấy vết sơn với xi măng dính trên sàn gạch tẩy sạch bong không tì vết. Giá cả rất hợp lý so với chất lượng!',
    date: '2 ngày trước',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    serviceUsed: 'Vệ Sinh Sau Xây Dựng'
  },
  {
    id: 'rev-2',
    name: 'Anh Trần Quốc Bảo',
    role: 'Giám đốc Công ty Truyền Thông SunMedia',
    location: 'Quận 1, TP.HCM',
    rating: 5,
    comment: 'Văn phòng bên mình rộng 350m2, gọi dịch vụ Nguyễn Duy tổng vệ sinh định kỳ cuối tuần. Làm ca đêm cực kỳ trách nhiệm, sáng thứ 2 đi làm bước vô văn phòng thơm phức, thảm sạch tinh tươm. Sẽ ký hợp đồng dài hạn!',
    date: '1 tuần trước',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    serviceUsed: 'Vệ Sinh Văn Phòng'
  },
  {
    id: 'rev-3',
    name: 'Chị Phương Thảo',
    role: 'Nội trợ gia đình',
    location: 'Quận 7, TP.HCM',
    rating: 5,
    comment: 'Nệm cao su nhà mình bị bé đái dầm có mùi hôi lắm, may nhờ chú Duy đến giặt hơi nước nóng. Mùi hôi mất hẳn, nệm khô nhanh mà xịt thơm mùi thảo mộc rất dễ chịu. Thái độ phục vụ 10/10.',
    date: '3 ngày trước',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    serviceUsed: 'Giặt Nệm & Sofa'
  }
];

export const faqsList: FaqItem[] = [
  {
    id: 'faq-1',
    q: 'Dịch vụ dọn nhà Nguyễn Duy có khảo sát và báo giá miễn phí tận nơi không?',
    a: 'Có! Chúng tôi cử kỹ thuật viên đến tận nơi khảo sát khối lượng công việc và báo giá chính xác hoàn toàn miễn phí sau 15-30 phút nhận yêu cầu. Khách hàng không đồng ý làm cũng không tốn bất kỳ chi phí nào.'
  },
  {
    id: 'faq-2',
    q: 'Chi phí dọn nhà có phát sinh thêm trong quá trình làm việc không?',
    a: 'Nguyễn Duy cam kết BÁO GIÁ TRỌN GÓI - KHÔNG PHÁT SINH. Số tiền chốt trên hợp đồng/thỏa thuận là số tiền cuối cùng quý khách thanh toán.'
  },
  {
    id: 'faq-3',
    q: 'Nếu trong quá trình dọn dẹp xảy ra hư hỏng hoặc mất mát tài sản thì sao?',
    a: 'Chúng tôi cam kết BẢO HIỂM 100% TÀI SẢN. Tất cả nhân viên đều có lý lịch rõ ràng, xác minh căn cước. Nếu xảy ra hư hỏng do lỗi kỹ thuật dọn dẹp, chúng tôi đền bù 100% giá trị tài sản thị trường.'
  },
  {
    id: 'faq-4',
    q: 'Dịch vụ có làm việc vào Chủ Nhật hoặc ngày Lễ Tết không?',
    a: 'Dọn nhà Nguyễn Duy phục vụ 24/7 tất cả các ngày trong tuần, kể cả Thứ 7, Chủ Nhật và các ngày Lễ Tết mà KHÔNG TÍNH THÊM PHÍ NGOÀI GIỜ.'
  },
  {
    id: 'faq-5',
    q: 'Tôi nên đăng ký trước bao lâu để giữ được ưu đãi giảm 20%?',
    a: 'Quý khách chỉ cần để lại thông tin số điện thoại hoặc gọi Hotline/Zalo đăng ký trước từ 2-12 tiếng. Chúng tôi sẽ giữ ngay mã ưu đãi giảm 20% cho quý khách.'
  }
];
