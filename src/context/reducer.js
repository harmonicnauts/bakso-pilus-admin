export const actionType = {
	SET_USER: "SET_USER",
	SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
	SET_CARTITEMS: "SET_CARTITEMS",
	SET_TRANSACTIONS: 'SET_TRANSACTIONS',
}

const reducer = (state, action) => {
	console.log(action);

	switch (action.type) {
		case actionType.SET_USER:
			return {
				...state,
				user: action.user
			};

		case actionType.SET_FOOD_ITEMS:
			return {
				...state,
				foodItems: action.foodItems
			};

		case actionType.SET_TRANSACTIONS:
			return {
				...state,
				transactions: action.transactions
			};

		case actionType.SET_CARTITEMS:
			return {
				...state,
				cartItems: action.cartItems,
			};

		default:
			return state;
	}
}

export default reducer;