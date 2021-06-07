const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  상호: {
      type: String
  },
  분류: {
      type: String
  },
  대표메뉴: {
      type: String
  },
  주소: {
      type: String
  },
  정보: {
      type: String
  },
});

// 모델 생성
// 여기서 User가 MongoDB에서는 복수, 구분자 삭제등을 통해 users로 저장됨
const Food = mongoose.model("Food", foodSchema);

module.exports = { Food };
