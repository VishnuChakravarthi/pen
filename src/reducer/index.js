export const initialState = {
    token: "",
    commonSearchCourses: [],
    allCoursesStore: [],
    cartLength: 0,
    result: [],
    darkMode: false,
    scroll: 2000,
    footerScroll: 0,
    key: 1,
    wishlistId: [],
};

export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action, "action");
    switch (action.type) {
        case "SET_USER_TOKEN":
            return { ...state, token: action.token };
        case "SET_SEARCH_TERM":
            return { ...state, commonSearchCourses: action.courses };
        case "SET_ALL_COURSES":
            return { ...state, allCoursesStore: action.allCourses };
        case "SET_CART":
            return { ...state, cartLength: action.cartLength };
        case "SET_EXAM_RESULT":
            return { ...state, result: action.result };
        case "SET_DARK_MODE":
            return { ...state, darkMode: action.darkMode };
        case "SET_SCROLL_POSITION":
            return { ...state, scroll: action.scroll };
        case "SET_FOOTER_SCROLLPOS":
            return { ...state, footerScroll: action.footerScroll };
        case "SET_RESUME_POINT":
            return { ...state, key: action.key };
        case "SET_WISHLIST_ITEM":
            return { ...state, wishlistId: action.wishlistId };
        default:
            return state;
    }
};

export default reducer;
