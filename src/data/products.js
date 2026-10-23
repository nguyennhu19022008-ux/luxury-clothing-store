export const CATEGORIES = [
  { id: 'all', name: 'Tất cả Bộ sưu tập' },
  { id: 'ao-khoac', name: 'Áo khoác' },
  { id: 'vay-dam', name: 'Váy/Đầm' },
  { id: 'so-mi-lua', name: 'Sơ mi lụa' },
  { id: 'quan-tay', name: 'Quần tây may đo' },
  { id: 'phu-kien', name: 'Phụ kiện tinh tuyển' },
];

export const PRODUCTS = [
  // 1. Áo khoác
  {
    id: 'vg-coat-01',
    sku: 'AT-CSH-001',
    name: 'Măng tô Cashmere May đo Thượng hạng',
    category: 'ao-khoac',
    categoryName: 'Áo khoác',
    price: 18500000,
    originalPrice: 21000000,
    badge: 'Độc bản Atelier',
    tagline: 'Sợi len cashmere Mông Cổ chải thủ công tôn vinh phong thái điềm tĩnh.',
    description: 'Tuyên ngôn thanh lịch vượt thời gian. Thiết kế cổ ve lớn phóng khoáng, hàng khuy kép xà cừ tự nhiên và đai thắt eo may đo tôn vinh tỉ lệ hình thể tự nhiên.',
    details: [
      'Cấu trúc ép phom nửa dựng (Half-Canvas) giữ dáng chuẩn xác sau nhiều năm',
      'Cúc xà cừ đại dương 4 lỗ khâu tay chỉ đính chắc chắn',
      'Túi cơi vát mép kép đối xứng, túi trong bí mật đựng thẻ doanh nhân',
      'Ve áo đỉnh nhọn 11.5cm phong cách Haute Couture Paris'
    ],
    composition: '100% Cashmere nhập khẩu Nội Mông, lớp lót lụa tơ tằm nguyên bản',
    careInstructions: [
      'Chỉ giặt khô chuyên nghiệp (Dry Clean Only)',
      'Bảo quản trên mắc gỗ sồi vai rộng kèm túi chống ẩm',
      'Là hơi nước ở nhiệt độ thấp, không là trực tiếp lên mặt vải'
    ],
    colors: [
      { id: 'camel', name: 'Be Lạc Đà Thượng Hạng', hex: '#C29B72' },
      { id: 'black', name: 'Đen Obsidian', hex: '#141413' },
      { id: 'ivory', name: 'Kem Ngà Cashmere', hex: '#EFECE6' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Ngực 84-88cm, Dài 118cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Ngực 88-92cm, Dài 120cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Ngực 92-96cm, Dài 122cm', inStock: true },
      { id: 'XL', name: 'XL', measurements: 'Ngực 96-102cm, Dài 124cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-coat-02',
    sku: 'AT-WOL-002',
    name: 'Blazer Len Dệt Thủ công Dáng Rũ',
    category: 'ao-khoac',
    categoryName: 'Áo khoác',
    price: 9800000,
    badge: 'Biểu tượng Kinh điển',
    tagline: 'Cầu vai đệm tự nhiên nhẹ như không, phom suông tối giản đương đại.',
    description: 'Bản phối hòa giữa nét phóng khoáng đương đại và độ chỉn chu của kỹ thuật may đo bespoke. Cầu vai đệm tự nhiên nhẹ như không, phom suông tối giản dễ dàng phối cùng sơ mi lụa hoặc đầm suông.',
    details: [
      'Cầu vai đệm mỏng 0.4cm tạo dáng vai thẳng mà không gây cứng nhắc',
      'Ve xuôi cổ điển 8cm cân bằng tỉ lệ người mặc',
      'Xẻ tà đôi phía sau hỗ trợ chuyển động tự nhiên khi ngồi',
      'Được ủi định hình 12 lần bằng máy ép nhiệt công nghiệp Ý'
    ],
    composition: '95% Virgin Wool dệt thoi mộc, 5% Elastane co giãn êm ái',
    careInstructions: [
      'Giặt khô chuyên dụng',
      'Không vắt, không sấy nhiệt',
      'Treo nơi thoáng khí sau mỗi lần mặc'
    ],
    colors: [
      { id: 'charcoal', name: 'Xám Than Đá', hex: '#2B2C2D' },
      { id: 'smoke-brown', name: 'Nâu Khói Trầm', hex: '#4A3F35' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Ngực 82-86cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Ngực 86-90cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Ngực 90-95cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-coat-03',
    sku: 'AT-TRN-003',
    name: 'Áo Khoác Dạ Dài Cổ Đứng Minimalist',
    category: 'ao-khoac',
    categoryName: 'Áo khoác',
    price: 14200000,
    badge: 'Mùa Thu Đông 2026',
    tagline: 'Đường nẹp áo ẩn hàng cúc tạo nên diện mạo liền mạch thanh khiết.',
    description: 'Thiết kế cổ đứng kiến trúc loại bỏ mọi chi tiết thừa, đường nẹp áo ẩn hàng cúc tạo nên diện mạo liền mạch thanh khiết như một tác phẩm điêu khắc nghệ thuật.',
    details: [
      'Cổ đứng cao 6cm bo viền tinh xảo',
      'Nẹp che hàng khuy giấu kín bằng kỹ thuật may lộn mép phẳng',
      'Túi mổ sâu hai bên lót nhung giữ ấm bàn tay',
      'Trọng lượng đầm tay 680gsm cản gió mùa đông tuyệt đối'
    ],
    composition: '100% Dạ Lông Cừu chải mịn bề mặt gợn sóng nước',
    careInstructions: [
      'Chỉ giặt khô tại tiệm uy tín',
      'Chải nhẹ bề mặt dạ bằng bàn chải lông ngựa mềm'
    ],
    colors: [
      { id: 'black', name: 'Đen Tuyệt Đối', hex: '#0F0F10' },
      { id: 'moss', name: 'Rêu Rừng Mờ', hex: '#2E332B' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Ngực 84-88cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Ngực 88-92cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Ngực 92-98cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: false,
    inStock: true,
  },

  // 2. Váy/Đầm
  {
    id: 'vg-dress-01',
    sku: 'AT-SLK-101',
    name: 'Đầm Lụa Tơ Tằm Xếp Nếp Thảo Mộc',
    category: 'vay-dam',
    categoryName: 'Váy/Đầm',
    price: 8600000,
    originalPrice: 10200000,
    badge: 'Chế tác Thủ công',
    tagline: 'Lụa tơ tằm Hà Đông nhuộm thảo mộc tự nhiên, chuyển động như dòng nước.',
    description: 'Dải nếp xếp thủ công quanh eo tạo độ đổ mềm mại như dòng nước khi sải bước. Cảm giác nhẹ bẫng trên làn da, mang lại sự quyến rũ tĩnh lặng và thanh thoát tối thượng.',
    details: [
      'Đường may cuốn mép giấu chỉ kiểu Pháp (French Seam) không cọ xát da',
      'Dây áo mảnh lụa tơ tằm điều chỉnh ẩn tinh vi',
      'Xẻ tà bên hông 35cm khâu lược bằng tay',
      'Nhuộm thủ công bằng dịch chiết vỏ cây và lá bàng tự nhiên'
    ],
    composition: '100% Lụa Tơ Tằm Hà Đông dệt thủ công làng nghề 300 năm',
    careInstructions: [
      'Giặt tay nhẹ nhàng với dầu gội trẻ em hoặc nước giặt lụa chuyên dụng',
      'Phơi trong bóng râm, không vắt xoắn',
      'Ủi mặt trái khi vải còn hơi ẩm'
    ],
    colors: [
      { id: 'champagne', name: 'Vàng Champagne Ánh Trăng', hex: '#E8DFC8' },
      { id: 'silver-blue', name: 'Xanh Xám Sương Nguyệt', hex: '#C4CACE' },
      { id: 'noir', name: 'Đen Huyền Bí', hex: '#1A1A1A' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Ngực 82cm, Eo 64cm, Mông 88cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Ngực 86cm, Eo 68cm, Mông 92cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Ngực 90cm, Eo 72cm, Mông 96cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-dress-02',
    sku: 'AT-GWN-102',
    name: 'Đầm Dạ Hội Tối Giản Lưng Trần',
    category: 'vay-dam',
    categoryName: 'Váy/Đầm',
    price: 15800000,
    badge: 'Phiên bản Giới hạn 20 chiếc',
    tagline: 'Cổ thuyền kín đáo phía trước, mở trọn lưng trần với đường cắt hình học.',
    description: 'Phía trước là dáng cổ thuyền thanh tao kín đáo, phía sau mở trọn tấm lưng thon thả với đường cắt vát hình học bất đối xứng tôn vinh vẻ đẹp kiều diễm trong đêm dạ tiệc.',
    details: [
      'Đường viền lưng gia cố nẹp silicon y tế chống trượt',
      'Đuôi váy quét đất 15cm tạo bước đi quyền quý',
      'Dây kéo giấu YKK mạ vàng 18k sau hông',
      'Lót lụa tơ sống 2 lớp ngăn lộ nội y'
    ],
    composition: 'Lụa Crepe de Chine dệt đôi cao cấp, độ rủ sâu không nhăn',
    careInstructions: [
      'Chỉ giặt khô cao cấp',
      'Bảo quản trong hộp bọc nhung chống ẩm'
    ],
    colors: [
      { id: 'black', name: 'Đen Dạ Tiệc', hex: '#111111' },
      { id: 'burgundy', name: 'Đỏ Rượu Vang Burgundy', hex: '#4B1E24' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Ngực 80-84cm, Eo 62-66cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Ngực 84-88cm, Eo 66-70cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Ngực 88-92cm, Eo 70-74cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-dress-03',
    sku: 'AT-MID-103',
    name: 'Váy Xòe Midi Lụa Satin Cạp Nhuyễn',
    category: 'vay-dam',
    categoryName: 'Váy/Đầm',
    price: 7200000,
    badge: 'Bán chạy nhất',
    tagline: 'Tỉ lệ xòe A-line chuẩn mực lấy cảm hứng từ phong cách New Look kinh điển.',
    description: 'Tỉ lệ xòe A-line chuẩn mực lấy cảm hứng từ phong cách New Look kinh điển nhưng được giản lược tối đa theo tinh thần Quiet Luxury, nhẹ nhàng uyển chuyển trong từng nhịp bước.',
    details: [
      'Cạp váy 3.5cm may định hình giữ phẳng eo bụng',
      'Túi sườn 2 bên ẩn tiện lợi đựng điện thoại son môi',
      'Gấu váy may giấu mũi tay tỉ mỉ không lộ chỉ ngoài',
      'Khóa kéo kim loại chìm sau lưng'
    ],
    composition: '100% Silk Satin định lượng 22 momme bóng mờ tự nhiên',
    careInstructions: [
      'Giặt khô hoặc giặt hấp chuyên dụng',
      'Treo đứng trên móc kẹp có đệm lót nỉ'
    ],
    colors: [
      { id: 'almond', name: 'Trắng Sữa Hạnh Nhân', hex: '#F4EFEA' },
      { id: 'navy', name: 'Xanh Đêm Hải Quân', hex: '#1A2233' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Eo 64-67cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Eo 68-71cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Eo 72-76cm', inStock: true },
      { id: 'XL', name: 'XL', measurements: 'Eo 77-82cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },

  // 3. Sơ mi lụa
  {
    id: 'vg-shirt-01',
    sku: 'AT-SHT-201',
    name: 'Sơ mi Lụa Tơ Tằm Cổ Điển Khuy Xà Cừ',
    category: 'so-mi-lua',
    categoryName: 'Sơ mi lụa',
    price: 5400000,
    originalPrice: 6200000,
    badge: 'Kinh điển Vượt thời gian',
    tagline: 'Lụa Habotai dệt mịn, mướt lạnh tức thì khi chạm vào làn da.',
    description: 'Chiếc sơ mi không thể thiếu trong tủ đồ giới tinh hoa. Cổ áo đứng thanh mảnh, măng sét tay đôi tinh tế, đi kèm cúc xà cừ tự nhiên chạm khắc chìm logo xưởng may.',
    details: [
      'Chân cổ ép lá mỏng chống quăn gãy qua năm tháng',
      'Cúc xà cừ tự nhiên cắt tay từ vỏ ốc biển sâu',
      'Măng sét lật đúp cổ tay phong cách quý tộc Pháp',
      'Đường may 21 mũi chỉ/inch đạt chuẩn may đo cao cấp nhất'
    ],
    composition: '100% Lụa Habotai dệt mịn tự nhiên',
    careInstructions: [
      'Giặt tay nước mát với dung dịch giặt tơ lụa',
      'Ủi hơi nước mặt trái với nhiệt độ nhẹ'
    ],
    colors: [
      { id: 'pearl', name: 'Trắng Ngọc Trai', hex: '#FAF9F6' },
      { id: 'sand', name: 'Nâu Be Cát', hex: '#D5C7B7' },
      { id: 'charcoal', name: 'Đen Nhám Than', hex: '#222120' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Ngực 86-90cm, Dài tay 58cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Ngực 90-94cm, Dài tay 59cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Ngực 94-98cm, Dài tay 60cm', inStock: true },
      { id: 'XL', name: 'XL', measurements: 'Ngực 98-103cm, Dài tay 61cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-shirt-02',
    sku: 'AT-SHT-202',
    name: 'Sơ mi Drape Tối Giản Dáng Rũ',
    category: 'so-mi-lua',
    categoryName: 'Sơ mi lụa',
    price: 4900000,
    badge: 'Mới ra mắt',
    tagline: 'Thiết kế cổ đổ nhẹ không cúc cài, tôn nét thanh thoát của xương quai xanh.',
    description: 'Thiết kế cổ đổ nhẹ không cúc cài, tôn vẻ đẹp thanh thoát của xương quai xanh và tạo cảm giác tự do vô tận khi hòa mình cùng tiết trời thu mát mẻ.',
    details: [
      'Cổ đổ drape tự nhiên theo trọng lượng sợi dệt',
      'Tay lửng cánh dơi thoáng mát, cử động không giới hạn',
      'Vạt sau dài hơn vạt trước 4cm che khéo hông'
    ],
    composition: '100% Silk Georgette cát nhám mờ thoáng khí tối đa',
    careInstructions: [
      'Giặt tay nhẹ với nước lạnh',
      'Phơi ngang trên lưới phơi len'
    ],
    colors: [
      { id: 'herb-cream', name: 'Kem Phấn Thảo Mộc', hex: '#F2EBE5' },
      { id: 'sage-olive', name: 'Xanh Ô liu Nhạt', hex: '#8A9A86' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Phom suông tự do (Ngực 82-88cm)', inStock: true },
      { id: 'M', name: 'M', measurements: 'Phom suông tự do (Ngực 88-94cm)', inStock: true },
      { id: 'L', name: 'L', measurements: 'Phom suông tự do (Ngực 94-100cm)', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: false,
    inStock: true,
  },

  // 4. Quần tây may đo
  {
    id: 'vg-pants-01',
    sku: 'AT-PNT-301',
    name: 'Quần Tây Len Xếp Ly May Đo Cao Cấp',
    category: 'quan-tay',
    categoryName: 'Quần tây may đo',
    price: 6500000,
    badge: 'May đo Bespoke',
    tagline: 'Len lông cừu Merino Super 130s từ Ý, mặt vải mịn màng không nhăn gãy.',
    description: 'Cạp cao cổ điển với thiết kế xếp ly kép (double-pleats) tăng sự thoải mái cho phần hông và tạo độ rủ thẳng đứng xuống gấu quần. Dải đai bên sườn (side-adjusters) bằng đồng nguyên khối thay thế thắt lưng.',
    details: [
      'Khóa tăng đơ sườn hông (Side Adjusters) đúc đồng thau Ý',
      'Đũng quần đệm lụa tơ sống giảm ma sát khi sải bước',
      'Gấu quần may gấp lật mép gấu 4.5cm phong cách quý tộc Milan',
      'Dải xếp ly kép hướng vào trong giữ phom đứng suốt ngày dài'
    ],
    composition: '100% Len Merino Super 130s nhập khẩu Ý',
    careInstructions: [
      'Giặt khô định kỳ 2 tháng/lần',
      'Dùng bàn ủi hơi nước thẳng đứng để là lại nếp ly'
    ],
    colors: [
      { id: 'midnight', name: 'Đen Midnight', hex: '#151618' },
      { id: 'cigar', name: 'Nâu Khói Cigar', hex: '#3E3835' },
      { id: 'sand-es', name: 'Be Cát Tây Ban Nha', hex: '#CDC2B0' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Eo 68-72cm, Ống 22cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Eo 73-77cm, Ống 23cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Eo 78-83cm, Ống 24cm', inStock: true },
      { id: 'XL', name: 'XL', measurements: 'Eo 84-89cm, Ống 25cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-pants-02',
    sku: 'AT-PNT-302',
    name: 'Quần Suông Lụa Pha Len Cạp Cao',
    category: 'quan-tay',
    categoryName: 'Quần tây may đo',
    price: 5800000,
    badge: 'Phong cách Tạp chí',
    tagline: 'Phom ống suông rộng (Wide-leg) quyền lực, bước đi uyển chuyển kéo dài đôi chân.',
    description: 'Phom ống suông rộng (Wide-leg) quyền lực, bước đi uyển chuyển tạo hiệu ứng thị giác kéo dài đôi chân, hoàn hảo khi kết hợp cùng áo blazer hoặc sơ mi lụa đóng thùng.',
    details: [
      'Cạp cao trên rốn 4cm tôn thon gọn vòng hai',
      'Độ rộng gấu quần 28cm chuẩn tỷ lệ sàn diễn Haute Couture',
      'Túi xéo sâu tiện lợi không làm gãy phom suông'
    ],
    composition: '60% Silk Tussah dệt thô mộc, 40% Fine Wool định hình ống đứng',
    careInstructions: [
      'Giặt khô bảo vệ cấu trúc sợi',
      'Treo thẳng bằng móc kẹp gấu quần'
    ],
    colors: [
      { id: 'raw-ivory', name: 'Trắng Ngà Thô Mộc', hex: '#F5F2EB' },
      { id: 'earth-grey', name: 'Xám Đất Trầm', hex: '#4F4D4A' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Eo 65-69cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Eo 70-74cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Eo 75-79cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: false,
    inStock: true,
  },

  // 5. Phụ kiện tinh tuyển
  {
    id: 'vg-acc-01',
    sku: 'AT-ACC-401',
    name: 'Khăn Lụa Vuông In Họa Tiết Chìm Độc Bản',
    category: 'phu-kien',
    categoryName: 'Phụ kiện tinh tuyển',
    price: 3200000,
    badge: 'Phiên bản Kỷ niệm',
    tagline: 'Silk Twill dệt dăm chéo 16 momme, viền cuốn mép tay thủ công từng centimet.',
    description: 'Họa tiết dệt chìm mô phỏng các đường nét kiến trúc tối giản và hoa văn gốm cổ. Có thể thắt quàng cổ, buộc tóc hoặc tạo điểm nhấn quý phái trên quai túi xách.',
    details: [
      'Kích thước chuẩn tạp chí 90cm x 90cm',
      'Viền cuốn mép tay tròn trịa (Hand-rolled hem) khâu từng mũi chỉ giấu kín',
      'Mực in thảo mộc bền màu không độc hại đạt chuẩn Oeko-Tex Standard 100'
    ],
    composition: '100% Silk Twill dệt dăm chéo 16 momme tự nhiên',
    careInstructions: [
      'Giặt nhẹ trong nước ấm với dầu gội',
      'Ủi khi vải còn ẩm ở nhiệt độ vừa'
    ],
    colors: [
      { id: 'mono', name: 'Đen & Ngà Voi Đơn Sắc', hex: '#1A1A1A' },
      { id: 'terracotta', name: 'Nâu Vàng Đất Nung & Be', hex: '#8A6240' },
    ],
    sizes: [
      { id: 'FreeSize', name: 'One Size', measurements: '90 x 90 cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'vg-acc-02',
    sku: 'AT-ACC-402',
    name: 'Thắt Lưng Da Bò Thuộc Thảo Mộc Khóa Đồng',
    category: 'phu-kien',
    categoryName: 'Phụ kiện tinh tuyển',
    price: 2600000,
    badge: 'Da Thuộc Vachetta Ý',
    tagline: 'Da bò nguyên tấm thuộc thảo mộc từ vùng Tuscany, khóa đồng thau đánh mờ.',
    description: 'Càng sử dụng theo năm tháng, lớp da càng bóng màu patina nâu ấm trầm ngâm độc nhất theo phong thái của chủ nhân. Khóa kim đúc đồng nguyên khối tinh tế.',
    details: [
      'Bản rộng 2.8cm phù hợp hoàn hảo với cả quần tây và đầm suông',
      'Cạnh dây được mài nhẵn và quét sáp ong tự nhiên',
      '5 lỗ đục chuẩn xác kèm dịch vụ bấm lỗ may đo riêng'
    ],
    composition: 'Da bò nguyên tấm Full-grain Vachetta nhập khẩu Tuscany (Ý), khóa đồng thau',
    careInstructions: [
      'Dưỡng ẩm da bằng sáp chuyên dụng 6 tháng/lần',
      'Tránh ngâm nước và tiếp xúc hóa chất tẩy rửa mạnh'
    ],
    colors: [
      { id: 'matte-black', name: 'Đen Da Bóng Mờ', hex: '#181818' },
      { id: 'caramel', name: 'Nâu Caramen Đậm', hex: '#5C3A21' },
    ],
    sizes: [
      { id: 'S', name: 'S', measurements: 'Vòng eo 65-75cm', inStock: true },
      { id: 'M', name: 'M', measurements: 'Vòng eo 75-85cm', inStock: true },
      { id: 'L', name: 'L', measurements: 'Vòng eo 85-95cm', inStock: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop',
    ],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },
];
