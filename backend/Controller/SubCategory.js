const User = require("../DataBase/User");
const Category = require("../DataBase/Category");
const SubCategory = require("../DataBase/SubCategory");

exports.createSubCategory = async (req, res) => {
    try {
        console.log("INSIDE CREATE SUB CATEGORY");
        console.log(req.body);
        const { category, subCategories } = req.body;
        console.log("category : ", category);
        console.log("req.user : ", req.user);
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required"
            });
        }
        if (!subCategories || subCategories.length === 0 || !Array.isArray(subCategories)) {
            return res.status(400).json({
                success: false,
                message: "Sub Category is required"
            });
        }

        const isCategoryExist = await Category.findById({ _id: category });
        if (!isCategoryExist) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }

        console.log("isCategoryExist : " + isCategoryExist);

        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required"
            });
        }

        console.log("userId : " + userId);

        const isUserExist = await User.findById({ _id: userId });
        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("isUserExist : " + isUserExist);

        const subCategoryData = await Promise.all(
            subCategories.map(async (item) => {
                try {
                    const subCategory = new SubCategory({
                        name: item.name,
                        description: item.description,
                        createdBy: userId,
                        category: category
                    });
                    return subCategory.save();
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }));

        if (subCategoryData.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub Category Created"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


exports.getSubCategoriesBycategory = async (req, res) => {
    try {
        console.log("INSIDE GET SUB CATEGORIES BY CATEGORY");
        console.log(req.query);
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required"
            });
        }
        console.log("category : ", category);
        const subCategories = await SubCategory.find({ category: category });
        if (!subCategories) {
            return res.status(400).json({
                success: false,
                message: "Sub Category not found"
            });
        }
        return res.status(200).json({
            success: true,
            subCategories,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};