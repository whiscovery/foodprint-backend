const mongoose = require("mongoose");
const autoIdSetter = require('../middleware/auto-id-setter');

const secondfoodSchema = mongoose.Schema({
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
  위치: {
      type: String
  },
  이미지: {
      type: String
  },
  기타: {
      type: String
  },
  순위: {
      type: Number
  }
});
autoIdSetter(secondfoodSchema, mongoose, 'secondfood', 'id');
// 모델 생성
// 여기서 User가 MongoDB에서는 복수, 구분자 삭제등을 통해 users로 저장됨
const Secondfood = mongoose.model("Secondfood", secondfoodSchema);

module.exports = { Secondfood };
