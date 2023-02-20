
import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { useNavigate} from "react-router-dom";
import { useLoginUserMutation } from '../features/auth/authApi'
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";

interface Props {
}

const LoginForm: React.FC<Props> = ({ }) => {

    const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError }] = useLoginUserMutation()
    let history = useNavigate();
    const dispatch = useAppDispatch();


    const onFinish = async (values: any) => {
        let email = values.username;
        let password = values.password
        const data: any = await loginUser({ email, password })
        if(data && data.error && data.error.data.message){
            alert(data && data.error && data.error.data.message)
        }
        

        dispatch(setUser({ access_token: data.data.access_token, isAdmin: data.data.data.isAdmin, firstName: data.data.data.firstName }))
        history('/dashboard');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: "inline-block", position: "fixed", top: "0", bottom: "0", left: "0", right: "0", width: "600px", height: "100px", margin: "auto" }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )

}

export default LoginForm;