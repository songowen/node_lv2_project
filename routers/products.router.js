const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth.middleware'); // 수정된 미들웨어 import
const { Products } = require('../models');//가져오는 방식차이
const { verifyToken, authenticateUser } = require('../middlewares/auth.middleware');

// 상품 생성 API
// router.post('/create', requireAuth, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const userId = req.user.userId; // 이 부분은 인증된 사용자의 userId를 가져와야 합니다.
// console.log("req.user.userId",req.user.userId)
//     console.log(req.body)
//     const newProduct = new Product({
//       title,
//       content,
//       userId,
//       createdAt:new Date(),
//       updatedAt: new Date(),
//       status: 'FOR_SALE', // 판매 중으로 초기화      
//     });

//     await newProduct.save(); // 상품 저장

//     res.status(201).json({ message: '상품이 성공적으로 생성되었습니다.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: '서버 오류가 발생했습니다.' });
//   }
// });

router.post("/create", requireAuth, async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user.userId
  try {
      await Products.create({
          title,
          content,
          userId,
      });
      res.status(201).json({ message: "판매 상품을 등록하였습니다." });
  } catch (err) {
      console.log(err);
      res.status(404).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});


// 상품 수정 API
router.put('/update/:productId', requireAuth, async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const userId = req.user.userId; // 인증된 사용자의 userId

    // 상품 ID
    const productId = req.params.productId;

    
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
    }

    // 사용자의 ID와 상품을 생성한 사용자의 ID를 비교하여 수정 권한을 확인합니다.
    if (product.createdBy.toString() !== userId) {
      return res.status(401).json({ message: '상품을 수정할 권한이 없습니다.' });
    }

    // 상품 정보 업데이트
    product.title = title;
    product.content = content;
    product.status = status;

    await product.save(); // 상품 정보 저장

    res.json({ message: '상품이 성공적으로 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 삭제 API
router.delete('/delete/:productId', requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId; // 인증된 사용자의 userId

    // 상품 ID
    const productId = req.params.productId;


    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
    }

    // 사용자의 ID와 상품을 생성한 사용자의 ID를 비교하여 삭제 권한을 확인합니다.
    if (product.createdBy.toString() !== userId) {
      return res.status(401).json({ message: '상품을 삭제할 권한이 없습니다.' });
    }

    await product.remove(); // 상품 삭제

    res.json({ message: '상품이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 목록 조회 API
router.get('/list', requireAuth, async (req, res) => {
  try {
    const sortType = req.query.sort ? req.query.sort.toUpperCase() : 'DESC';
    
    const products = await Product.find()
      .sort({ createdAt: sortType === 'ASC' ? 1 : -1 })
      .populate('createdBy', 'name'); // 사용자명을 가져오기 위해 사용자 정보 JOIN

    // 필요한 데이터 필드만 선택하여 반환
    const productList = products.map(product => {
      return {
        productId: product._id,
        productName: product.title,
        description: product.content,
        createdBy: product.createdBy.name,
        status: product.status,
        createdAt: product.createdAt,
      };
    });

    res.json(productList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 상세 조회 API
router.get('/detail/:productId', requireAuth, async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId).populate('createdBy', 'name');

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
    }

    // 필요한 데이터 필드만 선택하여 반환
    const productDetail = {
      productId: product._id,
      productName: product.productName,
      description: product.description,
      createdBy: product.createdBy.name,
      status: product.status,
      createdAt: product.createdAt,
    };

    res.json(productDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
