import {
    SERVER_REQUEST,SERVER_REQUEST_FAILURE,IMPORT_DATA_SUCCESS
} from "./importDataTypes";

const initialState = {
    loading: false,
    import_data: [],
    error: "",
    fileName:"",
    filePath:"",
    hasFinished:false,
};

export const importDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case IMPORT_DATA_SUCCESS:
            
            const { fileName, filePath,CsvDataList,gl_date_key,actual_amount_key } = action.payload;
            

            let result = [...CsvDataList].map((element) => {
                let tmp = {
                  gl_date:element[gl_date_key],
                  abr:element['Abr'],
                  parent_acc_nature_view:element['Parent Account for Nature View'],
                  currency:element['Currency'],
                  actual_amount:element[actual_amount_key]
                }
                // console.log('tmp :>> ', tmp);
                return tmp
              });

            return {
                ...state,
                import_data: result,
                loading: false,
                fileName:fileName,
                filePath:filePath,
                hasFinished:true,
            };
            case SERVER_REQUEST_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    tm_import_data:[]
                };
                case "EDIT_IMPORT_DATA":
                    return {
                        ...state,
                        import_data: action.payload,
                    };
            default:
                return state;
        }
    };
    
export default importDataReducer;