import React, { useState, useEffect } from 'react';
import { List, Button, Typography, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);

    const customerData = JSON.parse(localStorage.getItem('customer'));
    if (customerData) {
      console.log('Customer Data:', customerData);
      setCustomer(customerData);
    } else {
      message.error('Customer information is missing.');
    }
  }, []);

  const handleRemove = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleCheckout = async () => {
    try {
      if (!customer || !customer.name || !customer._id) {
        message.error('Customer information is missing.');
        return;
      }

      for (const item of cartItems) {
        const saleData = {
          ...item,
          customerId: customer._id,
          customerName: customer.name,
        };
        console.log('Sending item:', saleData);
        await axios.post('http://localhost:3000/api/sales', saleData);
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
                title={`معرف المنتج: ${item.productId},  اسم المنتج: ${item.productName}`}
                description={`السعر: ${item.price}, الحجم: ${item.size}, الوزن: ${item.weight}, الكمية المباعة: ${item.quantitySold}, المبلغ المدفوع: ${item.paidAmount}, المبلغ المتبقي: ${item.remainingAmount}`}
              />
            </List.Item>
          )}
        />
        <Button type="primary" onClick={handleCheckout}
 style={{ marginTop: '20px' }}>الدفع</Button>
    </Content>
  </Layout>
  );
  };
  
  export default Cart;
  
           
