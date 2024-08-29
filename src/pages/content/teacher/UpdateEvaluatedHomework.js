import React from 'react';
import {Modal, Form, Input, Button, message, InputNumber} from 'antd';
import axios from "axios";
import {serverURL} from "../../../server/consts/serverConsts.js";
import {getToken} from "../../../util/TokenUtil.js";

const UpdateEvaluateHomeworkModal = ({isUpdateEvaluateVisible, onClose, onSuccess,homework,homeworkId}) => {
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 20,
        },
    }

    const handleOk = () => {
        handleCancel()
    };
    const onFinish = (values) => {
        const jsonData = JSON.stringify(values);
        axios.post(serverURL + 'teacher/evaluate/'+homeworkId, jsonData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    message.success('Baho qo\'yildi');
                    form.resetFields();
                    onSuccess();
                    onClose();
                } else {
                    message.error(response.data.message).then(() => () => form.resetFields());
                }
            })
            .catch((error) => {
                message.error('An error occurred while evaluation').then(() => () => form.resetFields());
            });
    };
    const handleCancel = () => {
        message.info("Qayta baholash bekor qilindi");
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Update Evaluation of homework"
            open={isUpdateEvaluateVisible}
            onCancel={handleCancel}
            footer={true}
            onOk={handleOk}
        >
            <Form form={form} onFinish={onFinish} size={"large"} initialValues={homework}>
                <Form.Item label="Ball" name="homeworkBall"
                           rules={[{required: true, message: 'Iltimos baho qo\'ying!'}]} {...formItemLayout}>
                    <InputNumber type={"number"} min={0} max={10} size={2} allowClear/>
                </Form.Item>

                <Form.Item label="Comment" name="description"
                           rules={[{required: true, message: 'Please description about the evaluation!'}]} {...formItemLayout}>
                    <Input.TextArea placeholder='Description about the evaluation' maxLength={100}
                                    allowClear style={{height: '10vh'}}
                    />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{float:"right"}}>
                        Submit
                    </Button>
                    <Button onClick={handleCancel} type="default" htmlType={"button"} style={{float:"right", marginRight:"1vh"}}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateEvaluateHomeworkModal;




// import React from 'react';
// import { Modal, Form, Input, Button, message, InputNumber } from 'antd';
// import axios from "axios";
// import { serverURL } from "../../../server/consts/serverConsts.js";
// import { getToken } from "../../../util/TokenUtil.js";
//
// const UpdateEvaluateHomeworkModal = ({ isUpdateEvaluateVisible, onClose, onSuccess, homework, homeworkId }) => {
//     const [form] = Form.useForm();
//
//     // Layout for form items
//     const formItemLayout = {
//         labelCol: {
//             span: 5,
//         },
//         wrapperCol: {
//             span: 20,
//         },
//     };
//
//     // Handler for OK button, currently just closes the modal
//     const handleOk = () => {
//         handleCancel();
//     };
//
//     // Function to handle form submission
//     const onFinish = (values) => {
//         const jsonData = JSON.stringify(values);
//         axios.post(serverURL + 'teacher/evaluate/' + homeworkId, jsonData, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${getToken()}`
//             }
//         })
//             .then((response) => {
//                 if (response.data.success) {
//                     message.success('Baho qo\'yildi'); // Success message in Uzbek
//                     form.resetFields(); // Reset the form fields after successful submission
//                     onSuccess(); // Call the success handler function
//                     onClose(); // Close the modal
//                 } else {
//                     message.error(response.data.message); // Show error message if submission failed
//                     form.resetFields(); // Reset the form fields in case of error
//                 }
//             })
//             .catch((error) => {
//                 message.error('An error occurred while evaluation'); // Show error message on request failure
//                 form.resetFields(); // Reset the form fields in case of error
//             });
//     };
//
//     // Function to handle modal cancellation
//     const handleCancel = () => {
//         message.info("Qayta baholash bekor qilindi"); // Cancellation message in Uzbek
//         form.resetFields(); // Reset the form fields when modal is closed
//         onClose(); // Close the modal
//     };
//
//     return (
//         <Modal
//             title="Update Evaluation of homework"
//             open={isUpdateEvaluateVisible} // Modal visibility controlled by prop
//             onCancel={handleCancel} // Handle modal close action
//             footer={null} // Remove default footer and use custom footer
//             onOk={handleOk} // Handle OK button action
//         >
//             <Form form={form} onFinish={onFinish} size={"large"} initialValues={homework}>
//                 <Form.Item
//                     label="Ball"
//                     name="homeworkBall"
//                     rules={[{ required: true, message: 'Iltimos baho qo\'ying!' }]}
//                     {...formItemLayout}
//                 >
//                     <InputNumber
//                         type={"number"}
//                         min={0}
//                         max={10}
//                         size={2}
//                         allowClear
//                     />
//                 </Form.Item>
//
//                 <Form.Item
//                     label="Comment"
//                     name="description"
//                     rules={[{ required: true, message: 'Please provide a description about the evaluation!' }]}
//                     {...formItemLayout}
//                 >
//                     <Input.TextArea
//                         placeholder='Description about the evaluation'
//                         maxLength={100}
//                         allowClear
//                         style={{ height: '10vh' }}
//                     />
//                 </Form.Item>
//                 <Form.Item>
//                     <Button
//                         type="primary"
//                         htmlType="submit"
//                         style={{ float: "right" }}
//                     >
//                         Submit
//                     </Button>
//                     <Button
//                         onClick={handleCancel}
//                         type="default"
//                         htmlType={"button"}
//                         style={{ float: "right", marginRight: "1vh" }}
//                     >
//                         Cancel
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };
//
// export default UpdateEvaluateHomeworkModal;
