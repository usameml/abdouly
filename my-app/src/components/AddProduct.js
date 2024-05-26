import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const AddProduct = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productId, setProductId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.product) {
      const { product } = location.state;
      setName(product.name);
      setQuantity(product.quantity);
      setProductId(product._id);
    }
  }, [location]);

  const handleSubmit = async () => {
    try {
      if (productId) {
        await axios.put(`/api/products/${productId}`, { name, quantity });
        message.success('تم تحديث المنتج بنجاح');
      } else {
        await axios.post('/api/products', { name, quantity });
        message.success('تم إضافة المنتج بنجاح');
      }
      setName('');
      setQuantity('');
    } catch (error) {
      console.error('Error saving product', error);
      message.error('حدث خطأ أثناء حفظ المنتج');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', direction: 'rtl' }}>
      <Title level={2}>{productId ? 'تعديل المنتج' : 'إضافة منتج'}</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="اسم المنتج" required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="أدخل اسم المنتج"
          />
        </Form.Item>
        <Form.Item label="الكمية" required>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="أدخل الكمية"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {productId ? 'تحديث المنتج' : 'إضافة المنتج'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
