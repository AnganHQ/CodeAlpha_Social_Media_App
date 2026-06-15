const express =
require(
"express"
);

const router =
express.Router();

const {
followUser,
updateProfile,
getUsers,
getUserById
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

router.get(
"/",
protect,
getUsers
);

router.get(
"/:id",
protect,
getUserById
);

router.post(

"/follow/:id",

protect,

followUser

);

router.put(

"/profile",

protect,

updateProfile

);



module.exports =
router;