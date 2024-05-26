import React, { useState, useEffect } from 'react';
import { List, Button, Typography, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const response = await axios.post('/api/sales', {
          productId: item.productId,
          price: item.price,
          size: item.size,
          weight: item.weight,
          quantitySold: item.quantitySold
        });
        console.log('Checkout response:', response);
      }
      message.success('تم الدفع بنجاح!');
      localStorage.removeItem('cart');
      navigate('/mainlayout/invoice', { state: { cartItems } });
    } catch (error) {
      console.error('خطأ أثناء الدفع', error);
      message.error('فشل الدفع. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <Layout style={{ direction: 'rtl' }}>
      <Content style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Typography.Title level={2}>سلة التسوق</Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => handleRemove(index)}>حذف</Button>
              ]}
            >
              <List.Item.Meta
                title={`معرف المنتج: ${item.productId}`}
                description={`السعر: ${item.price}, الحجم: ${item.size}, الوزن: ${item.weight}, الكمية المباعة: ${item.quantitySold}`}
              />
            </List.Item>
          )}
        />
        <Button type="primary" onClick={handleCheckout} style={{ marginTop: '20px' }}>الدفع</Button>
      </Content>
    </Layout>
  );
};

export default Cart;
