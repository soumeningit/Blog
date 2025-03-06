const Content = require("../DataBase/Content");
const User = require("../DataBase/User");

exports.searchController = async (req, res) => {
    try {
        console.log("Inside SearchController");
        const { query } = req.body;
        console.log("Query", query);
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Query is required"
            });
        }
        // const userFilter = {
        //     $or: [
        //         { firstName: { $regex: query, $options: "i" } },
        //         { lastName: { $regex: query, $options: "i" } },
        //         { email: { $regex: query, $options: "i" } },
        //     ]
        // };
        // const userFilterData = await User.find(userFilter).select(
        //     "firstName lastName email accountType"
        // );

        // let userId = [];
        // if (userFilterData.length > 0) {
        //     userFilterData.forEach((data) => {
        //         if (data.accountType === "author") {
        //             userId.push(data._id);
        //         }
        //     })
        // }

        // console.log("User Filter Data", userFilterData);

        // let content = [];
        // if (userId.length > 0) {
        //     for (let i = 0; i < userId.length; i++) {
        //         const contentData = await Content.find({ userDetail: userId[i] }).select(
        //             "title description thumbnail content"
        //         )
        //         content.push(...contentData);
        //     }
        // }
        // console.log("User Ids", userId);
        // console.log("Content", content);

        // const contentFilter = {
        //     $or: [
        //         { title: { $regex: query, $options: "i" } },
        //         { description: { $regex: query, $options: "i" } },
        //     ]
        // };

        // const contentData = await Content.find(contentFilter).select(
        //     "title description thumbnail content"
        // );
        // console.log("Content Data", contentData);
        // let data = [];
        // if (contentData.length > 0) {
        //     data.push(...contentData);
        // }
        // if (content.length > 0) {
        //     data.push(...content);
        // }
        // console.log("Data", data);

        // if (data.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No data found"
        //     });
        // }

        // Optimized Code

        const userFilter = {
            $and: [
                { accountType: "author" },
                {
                    $or: [
                        { firstName: { $regex: query, $options: "i" } },
                        { lastName: { $regex: query, $options: "i" } },
                        { email: { $regex: query, $options: "i" } }
                    ]
                }
            ]
        };

        const userData = await User.find(userFilter).select(
            "firstName lastName email accountType"
        );

        const contentFilter = {
            $or: [
                { userDetail: { $in: userData.map(data => data._id) } },
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        };

        const contentData = await Content.find(contentFilter).select(
            "title description thumbnail content likes"
        );

        if (!contentData) {
            return res.status(404).json({
                success: false,
                message: "No data found"
            });
        }
        return res.status(200).json({
            success: true,
            data: contentData
        });

    } catch (error) {
        console.log("Error in SearchController", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}