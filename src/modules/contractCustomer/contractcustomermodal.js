/*
import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_CUSTOMER, GET_CUSTOMER_SUCCESS, GET_CUSTOMER_FAILURE } from './contractcustomertable';

const CUSTOMER_INIT = 'contractcustomermodal/CUSTOMER_INIT';
const BUTTON_CHANGE = 'contractcustomermodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "contractcustomermodal/HANDLE_CANCEL";
const CHANGE_INPUT = "contractcustomermodal/CHANGE_INPUT";

const UPDATE_CUSTOMER = 'contractcustomermodal/UPDATE_CUSTOMER';
const UPDATE_CUSTOMER_SUCCESS = 'contractcustomermodal/UPDATE_CUSTOMER_SUCCESS';
const UPDATE_CUSTOMER_FAILURE = 'contractcustomermodal/UPDATE_CUSTOMER_FAILURE';

const SHOW_MODAL = 'contractcustomermodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contractcustomermodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contractcustomermodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'contractcustomermodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'contractcustomermodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'contractcustomermodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_CUSTOMER = 'contractcustomermodal/POST_CUSTOMER';
const POST_CUSTOMER_SUCCESS = 'contractcustomermodal/POST_CUSTOMER_SUCCESS';
const POST_CUSTOMER_FAILURE = 'contractcustomermodal/POST_CUSTOMER_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(POSSIBLE_CUSTOMER_INIT, form => form);

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        const response = await api.getOrganization();
        const resCd = await api.getcustCD();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                orgList: response.data,
                custCdList: resCd.data,
            }
        })
    } catch (err) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
        })
    }
}

export const getShowUpdateModal = cust => async dispatch => {
    dispatch({ type: SHOW_UPDATE_MODAL });
    try {
        const res = await api.getCust(cust);
        console.log("getShowUpdateModal",res.data)
        const response = await api.getOrganization();
        const resCd = await api.getcustCD();
        dispatch({
            type: SHOW_UPDATE_MODAL_SUCCESS,
            payload: {
                form: res.data,
                orgList: response.data,
                custCdList: resCd.data,
            }
        })
    } catch(e) {
        console.log("error");
        dispatch({
            type: SHOW_UPDATE_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const handleUpdateOk = (formData) => async dispatch => {
    dispatch({ type: UPDATE_POSSIBLE_CUSTOMER });
    try {
        await api.updateCustomer(formData);
        dispatch({
            type: UPDATE_POSSIBLE_CUSTOMER_SUCCESS
        });
        dispatch({
            type: POSSIBLE_CUSTOMER_INIT,
            payload: "possibleCustomerModal"
        });
        dispatch({
            type: GET_POSSIBLE_CUSTOMER
        });
        try {
            const response = await api.getPresaleCustomerList();
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: UPDATE_POSSIBLE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: POSSIBLE_CUSTOMER_INIT, payload: "possibleCustomerModal" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_POSSIBLE_CUSTOMER });
    try {
        await api.postCustomer(formData);
        dispatch({
            type: POST_POSSIBLE_CUSTOMER_SUCCESS
        })
        dispatch({
            type: POSSIBLE_CUSTOMER_INIT,
            payload: "possibleCustomerModal"
        });
        dispatch({
            type: GET_POSSIBLE_CUSTOMER
        });
        try {
            const response = await api.getPresaleCustomerList();
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch(e) {
        dispatch({
            type: POST_POSSIBLE_CUSTOMER_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
}

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
};

const initialState = {
    updateVisible: false,
    buttonFlag: true,
    possibleCustomerModal : {
        orgNm: '',
        custNm: '',
        custRankNm: '',
        email: '',
        telNo: '',
        custTpCd: '',
        custTpCdNm : '',
    },
    orgList: [],
    custCdList: [],
};

const possiblecustomermodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag : false
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_MODAL_SUCCESS]: (state, { payload: { orgList, custCdList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft['custCdList'] = custCdList;
            }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: { form, orgList, custCdList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft["possibleCustomerModal"] = form;
                draft['custCdList'] = custCdList;
            }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            updateVisible: false,
            buttonFlag: true,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [POSSIBLE_CUSTOMER_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_POSSIBLE_CUSTOMER]: state => ({
            ...state,
            updateVisible: true,
        }),
        [POST_POSSIBLE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [POST_POSSIBLE_CUSTOMER_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_POSSIBLE_CUSTOMER]: state => ({
            ...state,
            updateVisible: true,
        }),
        [UPDATE_POSSIBLE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_POSSIBLE_CUSTOMER_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
    },
    initialState,
);

export default possiblecustomermodal*/
