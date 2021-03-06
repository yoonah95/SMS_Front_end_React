import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/manager/managermodal";
import ManagerModal from "../../components/manager/ManagerModal";

const ManagerModalContainer = ({
                                   visible,
                                         getHandleCancel,
                                         handleChangeInput,
                                   managerForm,
                                   confirmLoading,
                                         buttonFlag,
                                         handleOk,
                                         handleUpdateOk
                                     }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({managermodal})=>({formData : managermodal.managerForm}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <ManagerModal
            visible={visible}
            confirmLoading={confirmLoading}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            managerForm={managerForm}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ managermodal }) => ({
        confirmLoading: managermodal.confirmLoading,
        buttonFlag: managermodal.buttonFlag,
        visible: managermodal.visible,
        managerForm: managermodal.managerForm,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ManagerModalContainer);