import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';

interface FormSearchNameProps {
  readonly currentAddress: string;
  readonly setCurrentAddress: (value: React.SetStateAction<string>) => void;
}

export const FormSearchName: React.FC<FormSearchNameProps> = ({
  currentAddress,
  setCurrentAddress
}) => {
  const [searchText, setSearchText] = useState(currentAddress);
  const { Search } = Input;

  return (
    <Formik
      initialValues={{ address: currentAddress }}
      onSubmit={(values) => {
        setCurrentAddress(searchText);
      }}
    >
      {(formikProps) => (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Search
            addonBefore="address"
            placeholder="Enter address"
            value={searchText}
            onChange={(t) => setSearchText(t.target.value)}
            onSearch={formikProps.submitForm}
          />
          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={formikProps.submitForm}>
              Search
            </Button>
          </div>
        </Space>
      )}
    </Formik>
  );
};
