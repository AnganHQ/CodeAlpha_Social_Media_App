const express =
require("express");

const router =
express.Router();

const {
toggleFollow,
getMyProfile,
getUserProfile
}
=
require(
"../controllers/userController"
);

const {
protect
}
=
require(
"../middleware/authMiddleware"
);

router.post(
"/follow/:userId",
protect,
toggleFollow
);

router.get(
"/me",
protect,
getMyProfile
);

router.get(
"/profile/:userId",
getUserProfile
);

module.exports =
router;