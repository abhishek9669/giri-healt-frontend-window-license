const {RATIO_RECORD} = require("../Actions/Ratio")
let initialState = {
    ratio:"0"
}
let rootReducer = (state=initialState, action)=>{
    switch(action.type){
        case RATIO_RECORD:
            return{
                ...state,
                ratio:"2"
            }
    }
}