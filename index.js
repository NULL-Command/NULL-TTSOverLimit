const { ttsOpenAIGetBlob, ttsOpenAIGetFile } = require('./module.js');

/* Testing */
// ttsOpenAIGetFile({
//     text: 'Chủ đầu tư gặp khó khăn về tài chính đã khiến hàng loạt dự án ở vị trí đất vàng ven biển và trung tâm thành phố bị bỏ hoang. Sở Kế hoạch và Đầu tư TP Đà Nẵng cho biết, tính đến đầu tháng 6, trên địa bàn đang có 8 dự án được cấp giấy chứng nhận hoặc chủ trương đầu tư từ trước năm 2016 đến nay nhưng chậm triển khai. Trong đó, ven tuyến đường biển nối thành phố Đà Nẵng với phố cổ Hội An có 5 dự án, gồm DAP Việt Nam của Công ty TNHH DAP, DAP 1 Việt Nam của Công ty TNHH DAP 1, DAP 2 Việt Nam của Công ty TNHH DAP 2, Khu du lịch ven biển Hòn Ngọc Á Châu của Công ty Cổ phần Hòn Ngọc Á Châu, Khu du lịch biển I.V.C của Công ty TNHH I.V.C. Ba dự án còn lại nằm ở trục đường Hùng Vương trung tâm thành phố, cách sông Hàn khoảng 300 m, gồm Khu phức hợp Trung tâm thương mại Khách sạn 5 sao và căn hộ cao cấp Da Nang Center của Công ty Cổ phần Địa ốc Vũ Châu Long; Khu phức hợp cao cấp thương mại, văn phòng, khách sạn và chung cư cao cấp Golden Square của Công ty cổ phần Địa ốc Đông Á; Trung tâm thương mại, văn phòng, khách sạn, căn hộ cao cấp Viễn Đông Meridian của Công ty Cổ phần Địa ốc Viễn Đông.',
//     voiceId: 1,
//     voiceSpeed: 1,
//     voiceModel: 'tts-1',
//     duration: 200
// }, "tts.mp3");

module.exports = {
    ttsOpenAIGetBlob,
    ttsOpenAIGetFile
}