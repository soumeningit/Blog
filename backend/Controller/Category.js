const Category = require("../DataBase/Category");

exports.createCategory = async (req, res) => {
    try {
        console.log("INSIDE CREATE CATEGORY");
        console.log("req body : ", req.body);
        console.log("req user : ", req.user);
        const { data } = req.body;
        console.log("data : ", data);
        if (!data || data.length === 0 || !Array.isArray(data)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input"
            });
        }
        const userId = req.user.id;
        console.log("userId : ", userId);

        const categories = await Promise.all(
            data.map(async (item) => {
                try {
                    const category = new Category({
                        name: item.name,
                        description: item.description,
                        createdBy: userId
                    })
                    return category.save();
                } catch (error) {
                    console.log(error);
                    return null;
                }
            })
        );

        if (categories.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }

        console.log("Category Created " + categories);

        return res.status(200).json({
            success: true,
            message: "Category Created"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.getCategories = async (req, res) => {
    try {
        console.log("INSIDE GET CATEGORIES");
        const categories = await Category.find({});
        if (!categories) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }
        console.log("Categories : ", categories);
        return res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}