const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authEndpoints = {
    SEND_OTP_URL: `${BASE_URL}/auth/send-otp`,
    REGISTER_USER_URL: `${BASE_URL}/auth/register-user`,
    LOGIN_USER_URL: `${BASE_URL}/auth/login-user`,
    REQUEST_RESET_PASSWORD_URL: `${BASE_URL}/auth/reset-password-token`,
    RESET_PASSWORD_URL: `${BASE_URL}/auth/reset-password`
}

export const contentEndpoints = {
    CREATE_BLOG_URL: `${BASE_URL}/content/create-blog`,
    SAVE_BLOG_URL: `${BASE_URL}/content/save-blog`,
    CREATE_COMMENT_URL: `${BASE_URL}/content/create-comment`,
    LIKE_POST_URL: `${BASE_URL}/content/like-post`,
    SAVE_POST_URL: `${BASE_URL}/content/save-post`,
    FOLLOW_AUTHOR_URL: `${BASE_URL}/content/follow-author`,
    GET_POSTS_BY_AUTHOR_URL: `${BASE_URL}/content/posts-by-author`,
    GET_SUB_CATEGORIES_URL: `${BASE_URL}/content/sub-categories`,
    EDIT_CONTENT_POST_URL: `${BASE_URL}/content/edit-post`,
    FILE_UPLOAD_URL: `${BASE_URL}/content/upload-file`,
    UPGRADE_ROLE_URL: `${BASE_URL}/content/upgrade-role`
};

export const adminEndpoints = {
    CREATE_CATEGORY_URL: `${BASE_URL}/admin/create-category`,
    DELETE_CATEGORY_URL: `${BASE_URL}/admin/delete-category`,
    CREATE_SUBCATEGORY_URL: `${BASE_URL}/admin/create-subcategory`,
    ADMIN_LOGIN_URL: `${BASE_URL}/admin/admin-login`,
    ADMIN_PROFILE_URL: `${BASE_URL}/admin/admin-profile`,
    ADMIN_POSTS_URL: `${BASE_URL}/admin/admin-posts`,
    ADMIN_USERS_URL: `${BASE_URL}/admin/admin-users`,
    ADMIN_USER_DETAILS_URL: `${BASE_URL}/admin/admin-user`
};

export const profileEndpoints = {
    GET_USER_PROFILE_DETAILS_URL: `${BASE_URL}/profile/user-profile-details`,
    UPDATE_PASSWORD_URL: `${BASE_URL}/profile/update-password`,
    UPDATE_PROFILE_PIC_URL: `${BASE_URL}/profile/update-profile-pic`,
    UPDATE_USER_PROFILE_URL: `${BASE_URL}/profile/update-user-profile`,
    GET_SAVED_POSTS_URL: `${BASE_URL}/profile/get-saved-posts`,
    TOGGLE_SAVE_POST_URL: `${BASE_URL}/profile/toggle-save-post`,
    SEARCH_SAVED_POSTS_URL: `${BASE_URL}/profile/search-saved-posts`
};

export const generalEndpoints = {
    GET_ALL_CATEGORIES_URL: `${BASE_URL}/general/get-all-categories`,
    GET_BLOGS_URL: `${BASE_URL}/general/get-blogs`,
    GET_BLOG_BY_ID_URL: `${BASE_URL}/general/get-blog-by-id`,
    SET_VIEWS_URL: `${BASE_URL}/general/set-views`,
    GET_HOME_PAGE_DATA_URL: `${BASE_URL}/general/get-home-page-data`,
    SEARCH_POSTS_URL: `${BASE_URL}/general/search-posts`,
    SUBSCRIBE_FROM_CTA_URL: `${BASE_URL}/general/subscribe-from-cta`,
    SUBSCRIBE_FROM_CTA_NEXT_URL: `${BASE_URL}/general/subscribe-from-cta-next`
};

export const llmEndpoints = {
    GENERATE_SUMMARY_URL: `${BASE_URL}/llm/generate-summary`,
    ASK_BOT_URL: `${BASE_URL}/llm/ask-bot`
};

export const feedbackEndpoints = {
    CONTACT_US_URL: `${BASE_URL}/feedback/contact-us`
};
