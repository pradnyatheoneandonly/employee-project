import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, DatePickerProps, Select, Space, DatePicker } from 'antd';
import { saveEmployees, getEmployees, updateEmployee } from '../features/employee/employeeApi'
import { useAppDispatch } from "../app/hooks";
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    joinedDate: string;
}

interface FuncProps {
    setAddEmployee: (values: any) => void;
    addEmp: boolean;
    records: any
}


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const Employee: React.FC<FuncProps> = (props: FuncProps) => {

    const [date, setJoinedDate] = useState('')
    const [employee, setEmployee] = useState<Employee>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        joinedDate: ""
    });

    const dispatch = useAppDispatch()
    const { Option } = Select;

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }} defaultValue="+65">
                <Option value="65" selected="selected">+65</Option>
            </Select>
        </Form.Item>
    );


    const onFinish = async (values: any) => {
        values.user.joinedDate = values.user.joinedDate.toISOString().split('T')[0]
        let data = values.user;
        setEmployee(data)

        const editData = { ...data, id: props.records.id }

        const action = props.records.id ? updateEmployee(editData) : saveEmployees(data)
        dispatch(action).then((response) => {
            props.setAddEmployee(false)

            dispatch(getEmployees());
        });


    };
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days after today and today
        return current && current > dayjs().endOf('day');
    };
    const dateFormat = "YYYY/MM/DD";
    return (
        <>
            <Modal
                title="Add Employee"
                centered
                open={props.addEmp}
                onCancel={() => props.setAddEmployee(false)}
                footer={null}

            >
                <Form

                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                //initialValues={{ firstName:'default value' }}
                >
                    <Form.Item name={['user', 'firstName']} label="First Name" initialValue={props.records.firstName} rules={[{ required: true, max: 10 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'lastName']} label="Last Name" initialValue={props.records.lastName} rules={[{ required: true, max: 10 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email" initialValue={props.records.email} rules={[{ type: 'email', required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phone']} label="Phone" initialValue={props.records.phone} rules={[{ required: true, max: 8 }]}>
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name={['user', 'gender']} initialValue={props.records.gender} label="Gender" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="male"> Male </Radio>
                            <Radio value="female"> Female </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name={['user', 'joinedDate']} label="Joined Date" rules={[{ type: 'date', required: true }]}>
                        <DatePicker format={dateFormat} disabledDate={disabledDate} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit" disabled={!(employee.firstName === '' && employee.lastName === '' && employee.gender === '' && employee.email === '' && employee.joinedDate === '')}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>

    );
}
export default Employee

