const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const authendpoints = {
    SEND_OTP_API: BASE_URL + '/api/auth/sendOTP',
    REGISTER_API: BASE_URL + '/api/auth/signUp',
    LOGIN_API: BASE_URL + '/api/auth/login',
    FORGOT_PASSWORD_API: BASE_URL + '/api/auth/createresetpasswordtoken',
    NEW_PASSWORD_API: BASE_URL + '/api/auth/resetpassword',
    LOG_OUT_API: BASE_URL + '/api/auth/logout'
};

export const categoryendpoints = {
    CREATE_CATEGORY_API: BASE_URL + '/api/category/create-category',
    GET_CATEGORIES_API: BASE_URL + '/api/category/get-categories',
    GET_ALL_CATEGORIES_API: BASE_URL + '/api/category/all-categories'
};

export const subcategoryendpoints = {
    CREATE_SUB_CATEGORY_API: BASE_URL + '/api/sub-category/create-sub-category',
    GET_SUB_CATEGORIES_BY_CATEGORY_API: BASE_URL + '/api/sub-category/get-sub-categories-by-category'
};

export const blogendpoints = {
    CREATE_BLOG_API: BASE_URL + '/api/blog/create-blog',
    GET_ALL_BLOGS_API: BASE_URL + '/api/blog/get-blogs',
    GET_BLOG_BY_ID_API: BASE_URL + '/api/blog/get-blog-by-id',
    GET_BLOG_BY_USER_ID_API: BASE_URL + '/api/blog/get-blog-by-user-id',
    ADD_LIKE_API: BASE_URL + '/api/blog/add-like',
    REMOVE_LIKE_API: BASE_URL + '/api/blog/remove-like',
    ADD_BOOKMARK_API: BASE_URL + '/api/blog/add-bookmark',
    REMOVE_BOOKMARK_API: BASE_URL + '/api/blog/remove-bookmark',
    THUMBNAIL_UPLOAD_API: BASE_URL + '/api/blog/thumbnailupload',
    DELETE_BLOG_API: BASE_URL + '/api/blog/delete-blog',
    GET_BLOGS_BY_CATEGORY_API: BASE_URL + '/api/blog/get-blogs-by-category'
};

export const searchendpoints = {
    SEARCH_API: BASE_URL + '/api/search/search-item'
};

export const commentendpoints = {
    CREATE_COMMENT_API: BASE_URL + '/api/comment/addComment',
    CREATE_REPLY_API: BASE_URL + '/api/comment/addReply'
};

export const profileendpoints = {
    GET_BOOKMARKED_ITEMS_API: BASE_URL + '/api/profile/get-bookmarked-items',
    UPDATE_IMAGE_API: BASE_URL + '/api/profile/update-image',
    UPDATE_PROFILE_API: BASE_URL + '/api/profile/update-profile',
    UPDATE_SOCIAL_LINKS_API: BASE_URL + '/api/profile/update-social-links'
};