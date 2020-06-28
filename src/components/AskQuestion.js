import React from 'react';
import { Button, Input, Form , Modal} from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { TextArea } = Input;

const AskQuestion = ({ postQuestionModal, handleQuestionPost, togglePostQuesModal }) => {
    return (
        <div>
            <Modal
                title="Post Question"
                visible={postQuestionModal}
                onCancel={() => {
                    togglePostQuesModal(false);
                }}
                footer={null}
            >
                <Form {...layout} name="post-question" onFinish={(values) => {
                    handleQuestionPost(values);
                }} >
                    <Form.Item name={['question']} label="Question" rules={[{ required: true }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name={['category']} label="Category">
                        <Input />
                    </Form.Item>
                    <Form.Item className="right-align">
                        <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AskQuestion;