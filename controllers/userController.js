const User = require("../models/User");
const post = require("../models/Post");

const toggleFollow = async (
    req,
    res
) => {
    try {

        const currentUser =
            await User.findById(
                req.user._id
            );

        const targetUser =
            await User.findById(
                req.params.userId
            );

        if (!targetUser) {
            return res.status(404).json({
                message:
                "User not found"
            });
        }

        if (
            currentUser._id.toString()
            ===
            targetUser._id.toString()
        ) {
            return res.status(400).json({
                message:
                "Cannot follow yourself"
            });
        }

        const isFollowing =
            currentUser.following.includes(
                targetUser._id
            );

        if (isFollowing) {

            currentUser.following =
                currentUser.following.filter(
                    id =>
                    id.toString()
                    !==
                    targetUser._id.toString()
                );

            targetUser.followers =
                targetUser.followers.filter(
                    id =>
                    id.toString()
                    !==
                    currentUser._id.toString()
                );

        } else {

            currentUser.following.push(
                targetUser._id
            );

            targetUser.followers.push(
                currentUser._id
            );
        }

        await currentUser.save();

        await targetUser.save();

        res.status(200).json({

            following:
            !isFollowing

        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }
};

const getMyProfile = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.user._id
            )
            .select("-password");

        const posts =
            await Post.find({

                author:
                req.user._id

            })
            .sort({
                createdAt: -1
            });

        res.status(200).json({

            user,

            posts,

            followers:
            user.followers.length,

            following:
            user.following.length

        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

};



const getUserProfile =
async (
req,
res
) => {

try {

const user =
await User.findById(
req.params.userId
)
.select(
"-password"
);

if (!user) {

return res
.status(404)
.json({

message:
"User not found"

});

}

const posts =
await Post.find({

author:
user._id

})
.sort({
createdAt:
-1
});

res
.status(200)
.json({

user,

posts,

followers:
user.followers.length,

following:
user.following.length

});

} catch (error) {

res
.status(500)
.json({

message:
error.message

});

}

};

module.exports = {
    toggleFollow,
    getMyProfile,
    getUserProfile
};